/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationContainer } from "react-navigation";
import { withMappedNavigationParams } from "react-navigation-props-mapper";
import { createStackNavigator } from "react-navigation-stack";

import NavigationEnabledComponent from "./NavigationEnabledComponent";

export interface NavigationEnabledComponentConstructor<Props, Navigation> {
	new (props: Readonly<Props>): NavigationEnabledComponent<Props, {}, Navigation>;
}

export type NavTree<Nav> = {
	[K in keyof Nav]: NavMap<Nav[K]>;
};

type PropsOf<T> = T extends NavigationEnabledComponentConstructor<infer Props, infer Navigation> ? Props : never;
type NavigationOf<T> = T extends NavigationEnabledComponentConstructor<infer Props, infer Navigation>
	? Navigation
	: never;

type AnyConstructor = any;

export default class NavMap<Props> {
	static from<T>(constructor: T, to: NavTree<NavigationOf<T>>): NavMap<PropsOf<T>> {
		return new NavMap(constructor, false, to ? to : {});
	}

	static placeholder<T>(constructor: T): NavMap<PropsOf<T>> {
		return new NavMap(constructor, true, {});
	}

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

	public stackNavigator(rootName: string): NavigationContainer {
		const spec = this.rest;
		spec[rootName] = this.current;
		return createStackNavigator(spec, {
			initialRouteName: rootName
		});
	}
}
