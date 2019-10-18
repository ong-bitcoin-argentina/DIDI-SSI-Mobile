import { GestureResponderEvent, ImageSourcePropType } from "react-native";

import { VerifyPhoneProps, VerifyPhoneScreen, VerifyPhoneState } from "../common/VerifyPhone";

import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import DidiTheme from "../../resources/DidiTheme";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";

export type LoginVerifyPhoneProps = VerifyPhoneProps;

export type LoginVerifyPhoneNavigation = {
	Dashboard: DashboardScreenProps;
};

export class LoginVerifyPhoneScreen extends VerifyPhoneScreen<
	LoginVerifyPhoneProps,
	VerifyPhoneState,
	LoginVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar");

	protected contentImageSource(): ImageSourcePropType {
		return require("../resources/images/loginVerify.png");
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		// TODO: End login flow
		this.navigate("Dashboard", {});
	}
}
