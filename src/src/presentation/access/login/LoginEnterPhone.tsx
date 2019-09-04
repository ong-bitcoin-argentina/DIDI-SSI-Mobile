import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { EnterPhoneScreen } from "../../common/EnterPhone";
import { LoginVerifyPhoneProps } from "./LoginVerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";

export type LoginEnterPhoneProps = {};

export interface LoginEnterPhoneNavigation {
	LoginVerifyPhone: LoginVerifyPhoneProps;
}

export class LoginEnterPhoneScreen extends EnterPhoneScreen<
	LoginEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar");

	contentImageSource(): ImageSourcePropType {
		return {};
	}

	countryImageSource(): ImageSourcePropType {
		return {};
	}

	tagImageSource(): ImageSourcePropType {
		return {};
	}

	canPressContinueButton(): boolean {
		return true;
	}

	didPressContinueButton(event: GestureResponderEvent): void {
		this.navigate("LoginVerifyPhone", {});
	}
}
