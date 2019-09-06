import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import strings from "../resources/strings";
import React, { Fragment } from "react";
import { StatusBar, View, Text, Image, StyleSheet } from "react-native";
import themes from "../../styles/themes";
import { SafeAreaView } from "react-navigation";
import commonStyles from "../resources/commonStyles";
import DidiTextInput from "../../util/DidiTextInput";
import DidiButton from "../../util/DidiButton";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";

export type ForgotPasswordConfirmEmailProps = {};

export interface ForgotPasswordConfirmEmailNavigation {}

interface ForgotPasswordConfirmEmailState {
	code: string;
}

export class ForgotPasswordConfirmEmailScreen extends NavigationEnabledComponent<
	ForgotPasswordConfirmEmailProps,
	ForgotPasswordConfirmEmailState,
	ForgotPasswordConfirmEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	private canPressContinueButton(): boolean {
		// TODO validar codigo!!!
		return this.state ? this.state.code.length > 0 : false;
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text style={[commonStyles.text.emphasis, styles.messageHead]}>
							{strings.recovery.passwordRecoverConfirmationCode.messageHead}
						</Text>

						<Image source={require("../resources/images/phoneRecover.png")} style={commonStyles.image.image} />

						<DidiTextInput
							description={strings.recovery.passwordRecoverConfirmationCode.codeTitle}
							placeholder=""
							tagImage={require("../resources/images/phone.png")}
							textInputProps={{
								onChangeText: text => this.setState({ code: text })
							}}
						/>

						<Text>{""}</Text>

						<DidiButton
							onPress={() => {}}
							disabled={!this.canPressContinueButton()}
							title={strings.recovery.passwordRecoverConfirmationCode.buttonText}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	messageHead: {
		fontSize: 19
	}
});
