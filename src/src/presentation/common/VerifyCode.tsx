import React from "react";
import { Image, ImageSourcePropType } from "react-native";

import commonStyles from "../resources/commonStyles";
import { DidiServiceButton } from "../util/DidiServiceButton";
import { DidiText } from "../util/DidiText";
import DidiTextInput from "../util/DidiTextInput";

import { Validations } from "../../model/Validations";
import strings from "../resources/strings";

import { DidiScreen } from "./DidiScreen";

export interface VerifyCodeProps {
	description: string;
	isContinueBlocked?: boolean;
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
				<DidiText.Explanation.Emphasis>{this.props.description}</DidiText.Explanation.Emphasis>

				<DidiTextInput.VerificationCode onChangeText={text => this.setState({ inputCode: text })} />

				{this.props.children}

				<DidiText.Explanation.Normal>{strings.accessCommon.verify.resendCode}</DidiText.Explanation.Normal>

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
		return !this.props.isContinueBlocked && Validations.isValidationCode(this.state.inputCode);
	}
}
