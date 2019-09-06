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
						<Text style={commonStyles.text.emphasis}>Ingresá el código de 6 digitos para verificar tu celular</Text>
						<DidiTextInput
							description="Código de validacion"
							placeholder="6 digitos"
							tagImage={this.tagImageSource()}
							textInputProps={{
								onChangeText: text => this.setState({ inputCode: text })
							}}
							theme={theme}
						/>
						<Image style={style.contentImage} source={this.contentImageSource()} />
						<Text style={commonStyles.text.normal}>¿No recibiste el código?</Text>
						<DidiButton
							disabled={!this.canPressContinueButton()}
							onPress={event => this.didPressContinueButton(event)}
							title="Validar"
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
