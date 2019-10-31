import React from "react";
import { Image, ImageSourcePropType, Text } from "react-native";

import commonStyles from "../access/resources/commonStyles";
import { DidiServiceButton } from "../util/DidiServiceButton";
import DidiTextInput from "../util/DidiTextInput";

import Validator from "../access/helpers/validator";
import strings from "../resources/strings";

import { DidiScreen } from "./DidiScreen";

export interface VerifyPhoneProps {
	contentImageSource: ImageSourcePropType;
	onPressContinueButton(inputCode: string): void;
	isContinuePending?: boolean;
}

interface VerifyPhoneState {
	inputCode?: string;
}

export class VerifyPhoneScreen extends React.PureComponent<VerifyPhoneProps, VerifyPhoneState> {
	constructor(props: VerifyPhoneProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.accessCommon.verifyPhone.messageHead}</Text>
				<DidiTextInput
					description={strings.accessCommon.verifyPhone.codeTitle}
					placeholder={strings.accessCommon.verifyPhone.codePlaceholder}
					tagImage={this.tagImageSource()}
					textInputProps={{
						keyboardType: "number-pad",
						onChangeText: text => this.setState({ inputCode: text })
					}}
				/>
				<Image style={commonStyles.image.image} source={this.props.contentImageSource} />
				<Text style={commonStyles.text.normal}>{strings.accessCommon.verifyPhone.resendCode}</Text>
				<DidiServiceButton
					disabled={!this.canPressContinueButton()}
					onPress={() => this.props.onPressContinueButton(this.state.inputCode!)}
					title={strings.accessCommon.validateButtonText}
					isPending={this.props.isContinuePending || false}
				/>
			</DidiScreen>
		);
	}

	private tagImageSource(): ImageSourcePropType {
		return require("../access/resources/images/phone.png");
	}

	private canPressContinueButton(): boolean {
		return Validator.isValidationCode(this.state.inputCode);
	}
}
