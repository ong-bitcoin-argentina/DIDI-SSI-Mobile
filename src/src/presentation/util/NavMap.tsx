import { NavigationContainer, createStackNavigator } from "react-navigation";
import { withMappedNavigationParams } from "react-navigation-props-mapper";

import NavigationEnabledComponent from "./NavigationEnabledComponent";

export interface NavigationEnabledComponentConstructor<Props, Navigation> {
	new (props: Readonly<Props>): NavigationEnabledComponent<Props, {}, Navigation>;
}

type NavTree<Nav> = {
	[K in Extract<keyof Nav, string>]: NavMap<Nav[K]>;
};

type AnyConstructor = any;

export default class NavMap<Props> {
	static from<Prop, Nav>(
		constructor: NavigationEnabledComponentConstructor<Prop, Nav>,
		to?: NavTree<Nav>
	): NavMap<Prop> {
		return new NavMap(constructor, to ? to : {});
	}

	// Prevent assignments with incompatible props
	private unassignable?: Props;

	private current: AnyConstructor;
	private rest: { [name: string]: AnyConstructor };

	private constructor(ctor: AnyConstructor, to: { [name: string]: NavMap<{}> }) {
		this.current = withMappedNavigationParams()(ctor);

		const rest: { [name: string]: AnyConstructor } = {};
		Object.entries(to).forEach(([name, nav]) => {
			rest[name] = nav.current;
			Object.assign(rest, nav.rest);
		});
		this.rest = rest;
	}

	public navigator(): NavigationContainer {
		const spec = this.rest;
		spec.root = this.current;
		return createStackNavigator(spec, {
			initialRouteName: "root"
		});
	}
}
