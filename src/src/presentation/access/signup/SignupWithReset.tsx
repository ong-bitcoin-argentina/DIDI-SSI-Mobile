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

export interface SignupWithResetNavigation {
	SignupEnterPhone: SignupEnterPhoneProps;
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
					<DidiButton
						style={styles.deleteButton}
						title={strings.signup.reset.doDelete}
						onPress={() => {
							this.props.resetStore();
						}}
					/>
					<DidiButton onPress={() => this.goBack()} title={strings.signup.reset.cancel} />
				</View>
			</DidiScreen>
		);
	}
}

const serviceKey = "ResetSignup";

const connected = didiConnect(
	SignupWithResetScreen,
	state => ({
		did: state.did
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
	}
});
