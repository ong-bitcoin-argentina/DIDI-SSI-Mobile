import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { VerifyPhoneScreen, VerifyPhoneProps } from "../common/VerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import themes from "../../styles/themes";
import DidiTheme from "../../styles/DidiTheme";

export type RecoveryVerifyPhoneProps = VerifyPhoneProps;

export type RecoveryVerifyPhoneNavigation = {};

export class RecoveryVerifyPhoneScreen extends VerifyPhoneScreen<RecoveryVerifyPhoneNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Recuperar cuenta");

	protected contentImageSource(): ImageSourcePropType {
		return require("../resources/images/phoneRecover.png");
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		// TODO: End login flow
	}

	protected theme(): DidiTheme {
		return themes.primaryTheme;
	}
}
