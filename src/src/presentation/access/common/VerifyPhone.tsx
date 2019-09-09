import React, { Fragment } from "react";
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
	Text,
	Image,
	ImageSourcePropType,
	GestureResponderEvent
} from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import DidiTheme from "../../styles/DidiTheme";
import commonStyles from "../resources/commonStyles";
import Validator from "../helpers/validator";
import strings from "../resources/strings";

export type VerifyPhoneProps = {};

export interface VerifyPhoneState {
	inputCode?: string;
}

export abstract class VerifyPhoneScreen<Nav> extends NavigationEnabledComponent<
	VerifyPhoneProps,
	VerifyPhoneState,
	Nav
> {
	constructor(props: VerifyPhoneProps) {
		super(props);
		this.state = {};
	}

	render() {
		const theme = this.theme();
		const style = styles(theme);
		return (
			<Fragment>
				<StatusBar backgroundColor={theme.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text style={commonStyles.text.emphasis}>{strings.accessCommon.verifyPhone.messageHead}</Text>
						<DidiTextInput
							description={strings.accessCommon.verifyPhone.codeTitle}
							placeholder={strings.accessCommon.verifyPhone.codePlaceholder}
							tagImage={this.tagImageSource()}
							textInputProps={{
								onChangeText: text => this.setState({ inputCode: text })
							}}
							theme={theme}
						/>
						<Image style={style.contentImage} source={this.contentImageSource()} />
						<Text style={commonStyles.text.normal}>{strings.accessCommon.verifyPhone.resendCode}</Text>
						<DidiButton
							disabled={!this.canPressContinueButton()}
							onPress={event => this.didPressContinueButton(event)}
							title={strings.accessCommon.validateButtonText}
							theme={theme}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	protected abstract theme(): DidiTheme;

	protected abstract contentImageSource(): ImageSourcePropType;

	protected abstract didPressContinueButton(event: GestureResponderEvent): void;

	private tagImageSource(): ImageSourcePropType {
		return require("../resources/images/phone.png");
	}

	private canPressContinueButton(): boolean {
		return this.state ? Validator.isPhoneNumber(this.state.inputCode) : false;
	}
}

function styles(theme: DidiTheme) {
	return StyleSheet.create({
		contentImage: {
			width: 185,
			height: 160,
			alignSelf: "center"
		}
	});
}
