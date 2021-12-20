import React from "react";
import { Alert, TouchableOpacity, StyleSheet } from "react-native";

import { DidiServiceButton } from "../util/DidiServiceButton";
import { DidiText } from "../util/DidiText";
import DidiTextInput from "../util/DidiTextInput";

import { Validations } from "../../model/Validations";
import strings from "../resources/strings";

import { DidiScrollScreen } from "./DidiScreen";
import { ServiceObserver } from "./ServiceObserver";

export interface VerifyCodeProps {
	description: string;
	onResendCodePress: (serviceKey: string) => void;
	continueButtonText?: string;
	isContinueBlocked?: boolean;
	onPressContinueButton: (inputCode: string) => void;
	isContinuePending: boolean;
}

type CustomChildrens = {
	firstChildren?: any;
	secondChildren?: any;
};

type VerifyCodeInternalProps = VerifyCodeProps & CustomChildrens;

interface VerifyCodeState {
	inputCode?: string;
}

export class VerifyCodeComponent extends React.PureComponent<VerifyCodeInternalProps, VerifyCodeState> {
	constructor(props: VerifyCodeProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<DidiScrollScreen>
				<DidiText.Explanation.Emphasis style={styles.description}>
					{this.props.description}
				</DidiText.Explanation.Emphasis>

				<DidiTextInput.VerificationCode onChangeText={text => this.setState({ inputCode: text })} />

				{this.props.children || this.props.firstChildren}

				<TouchableOpacity onPress={this.onResendCodePress}>
					<ServiceObserver serviceKey={serviceKey} onSuccess={this.onCodeResendSuccess} />
					<DidiText.ResendCodeButton>{strings.accessCommon.verify.resendCode}</DidiText.ResendCodeButton>
				</TouchableOpacity>

				{this.props.secondChildren}

				<DidiServiceButton
					disabled={!this.canPressContinueButton()}
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					onPress={() => this.props.onPressContinueButton(this.state.inputCode!)}
					title={this.props.continueButtonText ?? strings.accessCommon.validateButtonText}
					isPending={this.props.isContinuePending || false}
				/>
			</DidiScrollScreen>
		);
	}

	private canPressContinueButton(): boolean {
		return !this.props.isContinueBlocked && Validations.isValidationCode(this.state.inputCode);
	}

	private onResendCodePress = () => {
		this.props.onResendCodePress(serviceKey);
	};

	private onCodeResendSuccess = () => {
		Alert.alert(
			strings.accessCommon.verify.resendCodeSuccess.title,
			strings.accessCommon.verify.resendCodeSuccess.body
		);
	};
}

const serviceKey = "VerifyCode";

const styles = StyleSheet.create({
	description: {
		fontSize: 14
	}
});
