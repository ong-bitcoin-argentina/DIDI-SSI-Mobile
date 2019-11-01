import { createStackNavigator, NavigationContainer, StackNavigatorConfig } from "react-navigation";
import { withMappedNavigationParams } from "react-navigation-props-mapper";
import { ConnectedComponent } from "react-redux";

import NavigationEnabledComponent from "./NavigationEnabledComponent";

export interface NavigationEnabledComponentConstructor<Props, Navigation> {
	new (props: Readonly<Props>): NavigationEnabledComponent<Props, {}, Navigation>;
}

type NavMapComponentConstructor<Props, Navigation, InnerProps> =
	| NavigationEnabledComponentConstructor<Props, Navigation>
	| ConnectedComponent<NavigationEnabledComponentConstructor<InnerProps, Navigation>, Props>;

export type NavTree<Nav> = {
	[K in Extract<keyof Nav, string>]: NavMap<Nav[K]>;
};

type AnyConstructor = any;

export default class NavMap<Props> {
	static from<Prop, Nav, InnerProp = Prop>(
		constructor: NavMapComponentConstructor<Prop, Nav, InnerProp>,
		to: NavTree<Nav>
	): NavMap<Prop> {
		return new NavMap(constructor, false, to ? to : {});
	}

	static placeholder<Prop, Nav, InnerProp = Prop>(
		constructor: NavMapComponentConstructor<Prop, Nav, InnerProp>
	): NavMap<Prop> {
		return new NavMap(constructor, true, {});
	}

	/*static switchNavigator<Nav>(
		from: { [K in Extract<keyof Nav, string>]: (impl: NavTree<Nav>) => NavMap<Nav[K]> }
	): NavigationContainer {
		return new NavMap({}, {});
	}*/

	// Prevent assignments with incompatible props
	private unassignable?: Props;

	private placeholder: boolean;
	private current: AnyConstructor;
	private rest: { [name: string]: AnyConstructor };

	private constructor(ctor: AnyConstructor, placeholder: boolean, to: { [name: string]: NavMap<{}> }) {
		this.current = withMappedNavigationParams()(ctor);
		this.placeholder = placeholder;

		const rest: { [name: string]: AnyConstructor } = {};
		Object.entries(to).forEach(([name, nav]) => {
			if (!nav.placeholder) {
				rest[name] = nav.current;
				Object.assign(rest, nav.rest);
			}
		});
		this.rest = rest;
	}

	public stackNavigator(rootName: string, stackConfig?: StackNavigatorConfig): NavigationContainer {
		const spec = this.rest;
		spec[rootName] = this.current;
		return createStackNavigator(spec, {
			initialRouteName: rootName,
			...stackConfig
		});
	}
}
