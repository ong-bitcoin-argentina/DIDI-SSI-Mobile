import React from "react";
import { NavigationStackProp } from "react-navigation-stack";

type NavigationProps<Props> = Props & {
	navigation?: NavigationStackProp;
};

export default abstract class NavigationEnabledComponent<Props, State, Nav> extends React.Component<Props, State> {
	// tslint:disable-next-line: variable-name
	__propTypeReference?: Props;
	// tslint:disable-next-line: variable-name
	__navigationTypeReference?: Nav;

	navigation() {
		const navProps: NavigationProps<Props> = this.props;
		return navProps.navigation;
	}

	navigate<Target extends Extract<keyof Nav, string>>(target: Target, props: Nav[Target]) {
		const nav = this.navigation();
		if (nav) {
			nav.navigate(target, props);
		}
	}

	replace<Target extends Extract<keyof Nav, string>>(target: Target, props: Nav[Target]) {
		const nav = this.navigation();
		if (nav) {
			nav.replace(target, props);
		}
	}

	goBack() {
		const nav = this.navigation();
		if (nav) {
			nav.goBack();
		}
	}

	goToRoot() {
		const nav = this.navigation();
		if (nav) {
			nav.popToTop();
		}
	}
}
