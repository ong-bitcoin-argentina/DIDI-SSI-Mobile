import { GestureResponderEvent, ImageSourcePropType } from "react-native";

import { EnterPhoneProps, EnterPhoneScreen } from "../common/EnterPhone";

import DidiTheme from "../../resources/DidiTheme";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";

import { LoginVerifyPhoneProps } from "./LoginVerifyPhone";

export type LoginEnterPhoneProps = EnterPhoneProps;

export interface LoginEnterPhoneNavigation {
	LoginVerifyPhone: LoginVerifyPhoneProps;
}

export class LoginEnterPhoneScreen extends EnterPhoneScreen<LoginEnterPhoneNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar");

	protected contentImageSource(): ImageSourcePropType {
		return require("../resources/images/login.png");
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		this.navigate("LoginVerifyPhone", {});
	}
}
