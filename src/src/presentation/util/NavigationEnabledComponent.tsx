import React from "react";
import { NavigationScreenProp, NavigationState } from "react-navigation";

type NavigationProps<Props> = Props & {
	navigation?: NavigationScreenProp<NavigationState>;
};

export default abstract class NavigationEnabledComponent<Props, State, Nav> extends React.Component<Props, State> {
	// tslint:disable-next-line: variable-name
	__propTypeReference?: Props;
	// tslint:disable-next-line: variable-name
	__navigationTypeReference?: Nav;

	navigate<Target extends Extract<keyof Nav, string>>(target: Target, props: Nav[Target]) {
		const navProps: NavigationProps<Props> = this.props;
		if (navProps.navigation) {
			navProps.navigation.navigate(target, props);
		}
	}
}
