import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { EnterPhoneScreen } from "../../common/EnterPhone";
import { RecoveryVerifyPhoneProps } from "./RecoveryVerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";

export type RecoveryEnterPhoneProps = {};

export interface RecoveryEnterPhoneNavigation {
	RecoveryVerifyPhone: RecoveryVerifyPhoneProps;
}

export class RecoveryEnterPhoneScreen extends EnterPhoneScreen<
	RecoveryEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(
		"Recuperar Cuenta"
	);

	contentImageSource(): ImageSourcePropType {
		return {};
	}

	didPressContinueButton(event: GestureResponderEvent): void {
		this.navigate("RecoveryVerifyPhone", {});
	}
}
