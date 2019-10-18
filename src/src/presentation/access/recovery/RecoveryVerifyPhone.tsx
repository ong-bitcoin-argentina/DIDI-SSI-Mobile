import { GestureResponderEvent, ImageSourcePropType } from "react-native";

import { VerifyPhoneProps, VerifyPhoneScreen, VerifyPhoneState } from "../common/VerifyPhone";

import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import DidiTheme from "../../resources/DidiTheme";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";

export type RecoveryVerifyPhoneProps = VerifyPhoneProps;

export type RecoveryVerifyPhoneNavigation = {
	Dashboard: DashboardScreenProps;
};

export class RecoveryVerifyPhoneScreen extends VerifyPhoneScreen<
	RecoveryVerifyPhoneProps,
	VerifyPhoneState,
	RecoveryVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Recuperar cuenta");

	protected contentImageSource(): ImageSourcePropType {
		return require("../resources/images/phoneRecover.png");
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		// TODO: End login flow
		this.navigate("Dashboard", {});
	}
}
