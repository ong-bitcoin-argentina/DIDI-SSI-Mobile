import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { EnterPhoneScreen, EnterPhoneProps } from "../common/EnterPhone";
import { RecoveryVerifyPhoneProps } from "./RecoveryVerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import themes from "../../styles/themes";
import DidiTheme from "../../styles/DidiTheme";

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

	protected theme(): DidiTheme {
		return themes.primaryTheme;
	}
}
