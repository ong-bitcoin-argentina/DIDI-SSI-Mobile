import { ImageSourcePropType, GestureResponderEvent } from "react-native";

import { VerifyPhoneScreen, VerifyPhoneProps, VerifyPhoneState } from "../common/VerifyPhone";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import themes from "../../styles/themes";
import DidiTheme from "../../styles/DidiTheme";
import { DashboardScreenProps } from "../dashboard/dashboard";

export type RecoveryVerifyPhoneProps = VerifyPhoneProps;

export type RecoveryVerifyPhoneNavigation = {
	Dashboard: DashboardScreenProps;
};

export class RecoveryVerifyPhoneScreen extends VerifyPhoneScreen<
	RecoveryVerifyPhoneProps,
	VerifyPhoneState,
	RecoveryVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Recuperar cuenta");

	protected contentImageSource(): ImageSourcePropType {
		return require("../resources/images/phoneRecover.png");
	}

	protected didPressContinueButton(event: GestureResponderEvent): void {
		// TODO: End login flow
		this.navigate("Dashboard", {});
	}

	protected theme(): DidiTheme {
		return themes.primaryTheme;
	}
}
