import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar } from "react-native";
import React, { Fragment } from "react";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import DidiButton from "../../util/DidiButton";
import strings from "../resources/strings";
import themes from "../../styles/themes";
import DidiTextInput from "../../util/DidiTextInput";
import { SignupEnterPhoneProps } from "../signup/SignupEnterPhone";
import commonStyles from "../resources/commonStyles";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";
import { SignupVerifyPhoneProps } from "./SignupVerifyPhone";

export type SignupEnterPhoneProps = {};

export interface SignupEnterPhoneNavigation {
	SignupVerifyPhone: SignupVerifyPhoneProps;
}

interface SignupEnterPhoneState {
	inputPhoneNumber: string;
}

export class SignupEnterPhoneScreen extends NavigationEnabledComponent<
	SignupEnterPhoneProps,
	SignupEnterPhoneState,
	SignupEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	private canPressContinueButton(): boolean {
		return this.state && this.state.inputPhoneNumber ? this.state.inputPhoneNumber.length > 0 : false;
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text style={[commonStyles.text.emphasis, styles.messageHead]}>
							{strings.signup.enterPhone.messageHead}
						</Text>
						<Image source={require("../resources/images/loginVerify.png")} style={styles.image} />

						<View style={styles.placeContainer}>
							<Image style={styles.countryImage} source={require("../resources/images/arg.png")} />
							<Text style={{ ...commonStyles.text.normal, ...styles.placeText }}>
								{strings.signup.enterPhone.place}
							</Text>
						</View>

						<DidiTextInput
							description={strings.signup.enterPhone.cellNumber}
							placeholder={strings.signup.enterPhone.cellPlaceholder}
							tagImage={require("../resources/images/phone.png")}
							textInputProps={{
								onChangeText: text => this.setState({ inputPhoneNumber: text })
							}}
						/>

						<DidiButton
							onPress={() => this.navigate("SignupVerifyPhone", {})}
							disabled={!this.canPressContinueButton()}
							title={strings.signup.enterPhone.recoverButtonText}
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
	},
	forgotPassword: {
		flexDirection: "row",
		marginLeft: "auto",
		alignSelf: "flex-end"
	},
	placeContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	placeText: {
		marginLeft: 5,
		fontSize: 19
	},
	image: {
		width: 185,
		height: 160,
		alignSelf: "center"
	},
	countryImage: {
		width: 30,
		height: 30,
		marginRight: 10
	}
});
