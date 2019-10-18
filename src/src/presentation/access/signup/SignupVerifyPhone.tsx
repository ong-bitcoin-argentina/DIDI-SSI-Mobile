import { GestureResponderEvent, ImageSourcePropType } from "react-native";

import { VerifyPhoneProps, VerifyPhoneScreen, VerifyPhoneState } from "../common/VerifyPhone";

import DidiTheme from "../../resources/DidiTheme";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";

import { SignupPhoneVerifiedProps } from "./SignupPhoneVerified";

export interface SignupVerifyPhoneProps extends VerifyPhoneProps {
	phoneNumber: string;
}

export interface SignupVerifyPhoneNavigation {
	SignupPhoneVerified: SignupPhoneVerifiedProps;
}

export class SignupVerifyPhoneScreen extends VerifyPhoneScreen<
	SignupVerifyPhoneProps,
	VerifyPhoneState,
	SignupVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Registro");

	protected contentImageSource(): ImageSourcePropType {
		return require("../resources/images/loginVerify.png");
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		this.navigate("SignupPhoneVerified", { phoneNumber: this.props.phoneNumber });
	}
}
