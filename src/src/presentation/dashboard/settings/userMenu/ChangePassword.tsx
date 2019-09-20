import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StyleSheet, StatusBar, SafeAreaView, View, Text } from "react-native";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import strings from "../../../resources/strings";
import { Identity } from "../../../../model/StoreContent";
import { UserDataProps } from "../userData/UserData";
import themes from "../../../resources/themes";
import commonStyles from "../../../access/resources/commonStyles";
import DidiTextInput from "../../../util/DidiTextInput";
import DidiButton from "../../../util/DidiButton";

export interface ChangePasswordProps {
	person: Identity;
}

type ChangePasswordState = {
	oldKey: string;
	key: string;
	keyDup: string;
};
export interface ChangePasswordNavigation {
	UserData: UserDataProps;
}

export default class ChangePasswordScreen extends NavigationEnabledComponent<
	ChangePasswordProps,
	ChangePasswordState,
	ChangePasswordNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndBackButton<ChangePasswordNavigation, "UserData">(
		strings.dashboard.userData.changePassword.barTitle,
		"UserData",
		{}
	);

	private canPressContinueButton(): boolean {
		// TODO validate password !!!
		/*
		if(!this.state || this.state.oldKey != this.props.person.password) {
			return false
		}
		*/

		return this.state && this.state.key ? this.state.key.length > 0 && this.state.keyDup == this.state.key : false;
	}

	changePassword() {
		// TODO change password !!!
		this.navigate("UserData", {});
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<View style={styles.inputs}>
							<DidiTextInput
								description={strings.recovery.passwordChange.oldPassMessage}
								placeholder=""
								tagImage={require("../../../access/resources/images/key.png")}
								textInputProps={{
									secureTextEntry: true,
									onChangeText: text => this.setState({ oldKey: text })
								}}
							/>
							<DidiTextInput
								description={strings.dashboard.userData.changePassword.newPassMessage}
								placeholder=""
								tagImage={require("../../../access/resources/images/key.png")}
								textInputProps={{
									secureTextEntry: true,
									onChangeText: text => this.setState({ key: text })
								}}
							/>

							<DidiTextInput
								description={strings.dashboard.userData.changePassword.repeatNewPassMessage}
								placeholder=""
								tagImage={require("../../../access/resources/images/key.png")}
								textInputProps={{
									secureTextEntry: true,
									onChangeText: text => this.setState({ keyDup: text })
								}}
							/>
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
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

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
