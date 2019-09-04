import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { EnterPhoneScreen } from "../../common/EnterPhone";
import { SignupVerifyPhoneProps } from "./SignupVerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import DidiTheme from "../../styles/DidiTheme";
import themes from "../../styles/themes";

export type SignupEnterPhoneProps = {};

export interface SignupEnterPhoneNavigation {
	SignupVerifyPhone: SignupVerifyPhoneProps;
}

export class SignupEnterPhoneScreen extends EnterPhoneScreen<
	SignupEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Registro");

	protected contentImageSource(): ImageSourcePropType {
		return {};
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		this.navigate("SignupVerifyPhone", {});
	}

	protected theme(): DidiTheme {
		return themes.primaryTheme;
	}
}
