import { GestureResponderEvent, ImageSourcePropType } from "react-native";

import { EnterPhoneProps, EnterPhoneScreen } from "../common/EnterPhone";

import DidiTheme from "../../resources/DidiTheme";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";

import { RecoveryVerifyPhoneProps } from "./RecoveryVerifyPhone";

export type RecoveryEnterPhoneProps = EnterPhoneProps;

export interface RecoveryEnterPhoneNavigation {
	RecoveryVerifyPhone: RecoveryVerifyPhoneProps;
}

export class RecoveryEnterPhoneScreen extends EnterPhoneScreen<RecoveryEnterPhoneNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Recuperar Cuenta");

	protected contentImageSource(): ImageSourcePropType {
		return require("../resources/images/phoneRecover.png");
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		this.navigate("RecoveryVerifyPhone", {});
	}
}
