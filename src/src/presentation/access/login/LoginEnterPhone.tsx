import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { EnterPhoneScreen, EnterPhoneProps } from "../common/EnterPhone";
import { LoginVerifyPhoneProps } from "./LoginVerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import themes from "../../styles/themes";
import DidiTheme from "../../styles/DidiTheme";

export type LoginEnterPhoneProps = EnterPhoneProps;

export interface LoginEnterPhoneNavigation {
	LoginVerifyPhone: LoginVerifyPhoneProps;
}

export class LoginEnterPhoneScreen extends EnterPhoneScreen<LoginEnterPhoneNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar", themes.secondaryTheme);

	protected contentImageSource(): ImageSourcePropType {
		return require("../resources/images/login.png");
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		this.navigate("LoginVerifyPhone", {});
	}

	protected theme(): DidiTheme {
		return themes.secondaryTheme;
	}
}
