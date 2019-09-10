import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { VerifyPhoneScreen, VerifyPhoneProps, VerifyPhoneState } from "../common/VerifyPhone";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";
import DidiTheme from "../../resources/DidiTheme";
import { DashboardScreenProps } from "../../dashboard/Dashboard";

export type LoginVerifyPhoneProps = VerifyPhoneProps;

export type LoginVerifyPhoneNavigation = {
	Dashboard: DashboardScreenProps;
};

export class LoginVerifyPhoneScreen extends VerifyPhoneScreen<
	LoginVerifyPhoneProps,
	VerifyPhoneState,
	LoginVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar", themes.secondaryTheme);

	protected contentImageSource(): ImageSourcePropType {
		return require("../resources/images/loginVerify.png");
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		// TODO: End login flow
		this.navigate("Dashboard", {});
	}

	protected theme(): DidiTheme {
		return themes.secondaryTheme;
	}
}
