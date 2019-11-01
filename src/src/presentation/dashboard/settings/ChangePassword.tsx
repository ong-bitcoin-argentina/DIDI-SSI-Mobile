import React from "react";
import { StyleSheet, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { Identity } from "../../../model/Identity";
import { didiConnect } from "../../../store/store";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

export type ChangePasswordProps = {};
interface ChangePasswordInternalProps extends ChangePasswordProps {
	person: Identity;
}

type ChangePasswordState = {
	oldKey: string;
	key: string;
	keyDup: string;
};
export interface ChangePasswordNavigation {}

class ChangePasswordScreen extends NavigationEnabledComponent<
	ChangePasswordInternalProps,
	ChangePasswordState,
	ChangePasswordNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.dashboard.userData.changePassword.barTitle);

	private canPressContinueButton(): boolean {
		// TODO validate password !!!
		/*
		if(!this.state || this.state.oldKey != this.props.person.password) {
			return false
		}
		*/

		return this.state && this.state.key ? this.state.key.length > 0 && this.state.keyDup === this.state.key : false;
	}

	changePassword() {
		// TODO change password !!!
		this.goBack();
	}

	render() {
		return (
			<DidiScreen>
				<View style={styles.inputs}>
					<DidiTextInput.Password onChangeText={text => this.setState({ oldKey: text })} descriptionType="OLD" />

					<DidiTextInput.Password onChangeText={text => this.setState({ key: text })} descriptionType="NEW" />

					<DidiTextInput.Password onChangeText={text => this.setState({ keyDup: text })} descriptionType="REPEAT" />
				</View>

				<View style={styles.button}>
					<DidiButton
						onPress={() => {
							this.changePassword();
						}}
						disabled={!this.canPressContinueButton()}
						title={strings.dashboard.userData.changePassword.changePassword}
					/>
				</View>
			</DidiScreen>
		);
	}
}

export default didiConnect(
	ChangePasswordScreen,
	(state): ChangePasswordInternalProps => {
		return {
			person: state.identity
		};
	}
);

const styles = StyleSheet.create({
	inputs: {
		marginTop: 30,
		flex: 1
	},
	button: {
		marginBottom: 30,
		flex: 0
	}
});
