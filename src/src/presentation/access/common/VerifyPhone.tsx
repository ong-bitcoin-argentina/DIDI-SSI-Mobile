import React from "react";
import { Image, ImageSourcePropType, Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import commonStyles from "../resources/commonStyles";

import strings from "../../resources/strings";
import Validator from "../helpers/validator";

export interface VerifyPhoneProps {
	contentImageSource: ImageSourcePropType;
	onPressContinueButton(): void;
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
				<DidiButton
					disabled={!this.canPressContinueButton()}
					onPress={() => this.props.onPressContinueButton()}
					title={strings.accessCommon.validateButtonText}
				/>
			</DidiScreen>
		);
	}

	private tagImageSource(): ImageSourcePropType {
		return require("../resources/images/phone.png");
	}

	private canPressContinueButton(): boolean {
		return Validator.isPhoneNumber(this.state.inputCode);
	}
}
