import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { RNUportHDSigner } from "react-native-uport-signer";

import { serviceCallSuccess } from "../../../services/common/componentServiceCall";
import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { deleteDid } from "../../../services/internal/uportSigner";
import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

import { SignupEnterPhoneProps } from "./SignupEnterPhone";
import themes from "../../resources/themes";
import { RecoveryExplanationProps } from "../recovery/RecoveryExplanation";

export interface SignupWithResetNavigation {
	SignupEnterPhone: SignupEnterPhoneProps;
	RecoveryExplanation: RecoveryExplanationProps;
}

export type SignupWithResetProps = {};

interface SignupWithResetInternalProps extends SignupWithResetProps {
	did: ActiveDid;
	resetStore: () => void;
}

class SignupWithResetScreen extends NavigationEnabledComponent<
	SignupWithResetInternalProps,
	{},
	SignupWithResetNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	render() {
		return (
			<DidiScreen>
				<DidiText.Explanation.Normal>{strings.signup.reset.message}</DidiText.Explanation.Normal>
				<Image source={require("../../resources/images/emailConfirmed.png")} style={commonStyles.image.image} />
				<View>
					<ServiceObserver
						serviceKey={serviceKey}
						onSuccess={() => {
							this.replace("SignupEnterPhone", {});
						}}
					/>
					<DidiButton onPress={() => this.props.resetStore()} title={strings.signup.reset.register} />
				</View>
				<DidiText.Explanation.Normal>{strings.signup.reset.messageRecover}</DidiText.Explanation.Normal>
				<DidiButton
					onPress={() => this.navigate("RecoveryExplanation", {})}
					style={styles.transparentButton}
					titleStyle={styles.transparentButtonText}
					title={strings.recovery.startAccess.recoveryButton + " >"}
				/>
			</DidiScreen>
		);
	}
}

const serviceKey = "ResetSignup";

const connected = didiConnect(
	SignupWithResetScreen,
	state => ({
		did: state.did.activeDid
	}),
	dispatch => ({
		resetStore: () => {
			dispatch(deleteDid(serviceKey));
			dispatch({ type: "RESET_PERSISTED_STORE" });
		}
	})
);

export { connected as SignupWithResetScreen };

const styles = StyleSheet.create({
	deleteButton: {
		marginBottom: 32,
		backgroundColor: colors.dangerous
	},
	transparentButton: {
		backgroundColor: "transparent"
	},
	transparentButtonText: {
		color: themes.foreground
	}
});
