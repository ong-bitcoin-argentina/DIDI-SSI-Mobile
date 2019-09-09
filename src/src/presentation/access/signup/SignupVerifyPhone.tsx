import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { VerifyPhoneScreen, VerifyPhoneProps, VerifyPhoneState } from "../common/VerifyPhone";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";
import DidiTheme from "../../resources/DidiTheme";
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

	protected theme(): DidiTheme {
		return themes.primaryTheme;
	}
}
