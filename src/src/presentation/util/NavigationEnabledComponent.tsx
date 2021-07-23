import React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from '@react-native-firebase/analytics';

type NavigationProps<Props> = Props & {
	navigation?: NavigationStackProp;
};

export default abstract class NavigationEnabledComponent<Props, State, Nav> extends React.Component<Props, State> {
	__propTypeReference?: Props;
	__navigationTypeReference?: Nav;

	componentDidCatch(error: any, info: any) {
		crashlytics().log(info.componentStack);
		crashlytics().recordError(error);
	}

	navigation() {
		const navProps: NavigationProps<Props> = this.props;
		return navProps.navigation;
	}

	navigate<Target extends Extract<keyof Nav, string>>(target: Target, props: Nav[Target], onComplete?: () => void) {
		const nav = this.navigation();
		analytics().logScreenView({
			screen_name: target,
			screen_class: target,
		})
		if (nav) {
			onBlur(nav, onComplete);
			nav.navigate(target, props);
		}
	}

	replace<Target extends Extract<keyof Nav, string>>(target: Target, props: Nav[Target], onComplete?: () => void) {
		const nav = this.navigation();
		if (nav) {
			onBlur(nav, onComplete);
			nav.replace(target, props);
		}
	}

	goBack(onComplete?: () => void) {
		const nav = this.navigation();
		if (nav) {
			onBlur(nav, onComplete);
			nav.goBack();
		}
	}

	goToRoot(onComplete?: () => void) {
		const nav = this.navigation();
		if (nav) {
			onBlur(nav, onComplete);
			nav.popToTop();
		}
	}
}

function onBlur<Props, State, Nav>(
	nav: NonNullable<ReturnType<NavigationEnabledComponent<Props, State, Nav>["navigation"]>>,
	onComplete?: () => void
) {
	if (onComplete === undefined) {
		return;
	}
	const listener = nav.addListener("didBlur", () => {
		onComplete?.();
		listener.remove();
	});
}
