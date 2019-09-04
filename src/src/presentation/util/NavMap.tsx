import { NavigationContainer, createStackNavigator } from "react-navigation";

import NavigationEnabledComponent from "./NavigationEnabledComponent";

export interface NavigationEnabledComponentConstructor<Props, Navigation> {
	new (props: Readonly<Props>): NavigationEnabledComponent<
		Props,
		{},
		Navigation
	>;
}

type NavTree<Nav> = {
	[K in Extract<keyof Nav, string>]: NavMap<Nav[K]>;
};

type AnyConstructor = NavigationEnabledComponentConstructor<{}, {}>;

export default class NavMap<Props> {
	static from<T extends AnyConstructor>(
		constructor: T,
		to?: NavTree<NonNullable<InstanceType<T>["__navigationTypeReference"]>>
	): NavMap<NonNullable<InstanceType<T>["__propTypeReference"]>> {
		return new NavMap(constructor, to ? to : {});
	}

	private current: AnyConstructor;
	private rest: { [name: string]: AnyConstructor };

	private constructor(
		ctor: AnyConstructor,
		to: { [name: string]: NavMap<{}> }
	) {
		this.current = ctor;

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
