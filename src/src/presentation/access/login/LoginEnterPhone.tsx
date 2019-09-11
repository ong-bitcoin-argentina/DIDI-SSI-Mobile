import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { EnterPhoneScreen, EnterPhoneProps } from "../common/EnterPhone";
import { LoginVerifyPhoneProps } from "./LoginVerifyPhone";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";
import DidiTheme from "../../resources/DidiTheme";

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
