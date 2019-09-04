import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { EnterPhoneScreen } from "../../common/EnterPhone";
import { SignupVerifyPhoneProps } from "./SignupVerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";

export type SignupEnterPhoneProps = {};

export interface SignupEnterPhoneNavigation {
	SignupVerifyPhone: SignupVerifyPhoneProps;
}

export class SignupEnterPhoneScreen extends EnterPhoneScreen<
	SignupEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Registro");

	contentImageSource(): ImageSourcePropType {
		return {};
	}

	didPressContinueButton(event: GestureResponderEvent): void {
		this.navigate("SignupVerifyPhone", {});
	}
}
