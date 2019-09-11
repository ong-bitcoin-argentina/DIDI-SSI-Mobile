import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, View, Text, Image, ImageSourcePropType, GestureResponderEvent } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import commonStyles from "../resources/commonStyles";
import Validator from "../helpers/validator";
import strings from "../resources/strings";
import themes from "../../resources/themes";

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
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
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
					</View>
				</SafeAreaView>
			</Fragment>
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
