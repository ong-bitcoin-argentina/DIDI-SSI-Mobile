import React from "react";
import { GestureResponderEvent, Image, ImageSourcePropType, Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import strings from "../../resources/strings";
import Validator from "../helpers/validator";

export type VerifyPhoneProps = {};

export interface VerifyPhoneState {
	inputCode?: string;
}

export abstract class VerifyPhoneScreen<
	Props extends VerifyPhoneProps,
	State extends VerifyPhoneState,
	Nav
> extends NavigationEnabledComponent<Props, State, Nav> {
	constructor(props: Props) {
		super(props);
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
				<Image style={commonStyles.image.image} source={this.contentImageSource()} />
				<Text style={commonStyles.text.normal}>{strings.accessCommon.verifyPhone.resendCode}</Text>
				<DidiButton
					disabled={!this.canPressContinueButton()}
					onPress={event => this.didPressContinueButton(event)}
					title={strings.accessCommon.validateButtonText}
				/>
			</DidiScreen>
		);
	}

	protected abstract contentImageSource(): ImageSourcePropType;

	protected abstract didPressContinueButton(event: GestureResponderEvent): void;

	private tagImageSource(): ImageSourcePropType {
		return require("../resources/images/phone.png");
	}

	private canPressContinueButton(): boolean {
		return this.state ? Validator.isPhoneNumber(this.state.inputCode) : false;
	}
}
