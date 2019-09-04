import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { VerifyPhoneScreen } from "../../common/VerifyPhone";
import { LoginVerifyPhoneProps } from "./LoginVerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import themes from "../../styles/themes";
import DidiTheme from "../../styles/DidiTheme";

export type LoginVerifyPhoneProps = {};

export type LoginVerifyPhoneNavigation = {};

export class LoginVerifyPhoneScreen extends VerifyPhoneScreen<
	LoginVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(
		"Ingresar",
		themes.secondaryTheme
	);

	protected contentImageSource(): ImageSourcePropType {
		return {};
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		// End login flow
	}

	protected theme(): DidiTheme {
		return themes.secondaryTheme;
	}
}
