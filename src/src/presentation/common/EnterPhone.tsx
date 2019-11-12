import React from "react";
import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

import commonStyles from "../access/resources/commonStyles";
import { DidiServiceButton } from "../util/DidiServiceButton";
import DidiTextInput from "../util/DidiTextInput";

import Validator from "../access/helpers/validator";
import strings from "../resources/strings";

import { DidiScreen } from "./DidiScreen";

export interface EnterPhoneProps {
	contentImageSource: ImageSourcePropType;
	isPasswordRequired: boolean;
	onPressContinueButton(inputPhoneNumber: string, password: string | null): void;
	isContinuePending: boolean;
}

export interface EnterPhoneState {
	inputPhoneNumber?: string;
	inputPassword?: string;
}

export class EnterPhoneScreen extends React.PureComponent<EnterPhoneProps, EnterPhoneState> {
	constructor(props: EnterPhoneProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.accessCommon.enterPhone.messageHead}</Text>

				<View style={styles.countryContainer}>
					<Image style={styles.countryImage} source={this.countryImageSource()} />
					<Text style={commonStyles.text.normal}>{strings.accessCommon.place}</Text>
				</View>

				<DidiTextInput.PhoneNumber onChangeText={text => this.setState({ inputPhoneNumber: text })} />

				{this.props.isPasswordRequired && (
					<DidiTextInput.Password
						descriptionType="BASIC"
						onChangeText={text => this.setState({ inputPassword: text })}
					/>
				)}

				<Image style={commonStyles.image.image} source={this.props.contentImageSource} />

				<DidiServiceButton
					isPending={this.props.isContinuePending || false}
					disabled={!this.canPressContinueButton()}
					onPress={() => this.onPressContinueButton()}
					title={strings.accessCommon.validateButtonText}
				/>
			</DidiScreen>
		);
	}

	private canPressContinueButton(): boolean {
		return (
			Validator.isNumber(this.state.inputPhoneNumber) &&
			(!this.props.isPasswordRequired || Validator.isPassword(this.state.inputPassword))
		);
	}

	private onPressContinueButton() {
		this.props.onPressContinueButton(this.state.inputPhoneNumber!, this.state.inputPassword || null);
	}

	private countryImageSource(): ImageSourcePropType {
		return require("../resources/images/arg.png");
	}
}

const styles = StyleSheet.create({
	countryContainer: {
		alignSelf: "center",
		flexDirection: "row",
		alignItems: "center"
	},
	countryImage: {
		width: 30,
		height: 30,
		marginRight: 10
	}
});
