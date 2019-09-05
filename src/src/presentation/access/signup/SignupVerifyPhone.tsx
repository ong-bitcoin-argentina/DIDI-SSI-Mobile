import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { VerifyPhoneScreen, VerifyPhoneProps } from "../../common/VerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import themes from "../../styles/themes";
import DidiTheme from "../../styles/DidiTheme";
import { SignupEnterEmailProps } from "./SignupEnterEmail";

export type SignupVerifyPhoneProps = VerifyPhoneProps;

export interface SignupVerifyPhoneNavigation {
	SignupEnterEmail: SignupEnterEmailProps;
}

export class SignupVerifyPhoneScreen extends VerifyPhoneScreen<
	SignupVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Registro");

	protected contentImageSource(): ImageSourcePropType {
		return {};
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		this.navigate("SignupEnterEmail", {});
	}

	protected theme(): DidiTheme {
		return themes.primaryTheme;
	}
}
