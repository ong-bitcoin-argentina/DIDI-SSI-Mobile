import React from "react";
import { Image, ImageSourcePropType, Text } from "react-native";

import commonStyles from "../access/resources/commonStyles";
import { DidiServiceButton } from "../util/DidiServiceButton";
import DidiTextInput from "../util/DidiTextInput";

import Validator from "../access/helpers/validator";
import strings from "../resources/strings";

import { DidiScreen } from "./DidiScreen";

export interface VerifyCodeProps {
	description: string;
	contentImageSource: ImageSourcePropType;
	onPressContinueButton: (inputCode: string) => void;
	isContinuePending: boolean;
}

interface VerifyCodeState {
	inputCode?: string;
}

export class VerifyCodeScreen extends React.PureComponent<VerifyCodeProps, VerifyCodeState> {
	constructor(props: VerifyCodeProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{this.props.description}</Text>

				<DidiTextInput.VerificationCode onChangeText={text => this.setState({ inputCode: text })} />

				<Image style={commonStyles.image.image} source={this.props.contentImageSource} />

				<Text style={commonStyles.text.normal}>{strings.accessCommon.verify.resendCode}</Text>

				<DidiServiceButton
					disabled={!this.canPressContinueButton()}
					onPress={() => this.props.onPressContinueButton(this.state.inputCode!)}
					title={strings.accessCommon.validateButtonText}
					isPending={this.props.isContinuePending || false}
				/>
			</DidiScreen>
		);
	}

	private canPressContinueButton(): boolean {
		return Validator.isValidationCode(this.state.inputCode);
	}
}
