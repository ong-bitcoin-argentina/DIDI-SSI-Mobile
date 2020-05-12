import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { RNUportHDSigner } from "react-native-uport-signer";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

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
					<DidiButton style={styles.deleteButton} onPress={this.doDelete} title={strings.signup.reset.doDelete} />
					<DidiButton onPress={() => this.goBack()} title={strings.signup.reset.cancel} />
				</View>
			</DidiScreen>
		);
	}

	private doDelete = async () => {
		const seeds = await RNUportHDSigner.listSeedAddresses();
		await Promise.all(seeds.map(seed => RNUportHDSigner.deleteSeed(seed)));
		this.props.resetStore();
		this.replace("SignupEnterPhone", {});
	};
}

const connected = didiConnect(
	SignupWithResetScreen,
	state => ({
		did: state.did
	}),
	dispatch => ({
		resetStore: () => dispatch({ type: "RESET_PERSISTED_STORE" })
	})
);

export { connected as SignupWithResetScreen };

const styles = StyleSheet.create({
	deleteButton: {
		marginBottom: 32,
		backgroundColor: colors.dangerous
	}
});
