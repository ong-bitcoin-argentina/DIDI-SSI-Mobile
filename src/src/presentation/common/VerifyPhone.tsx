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

import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import DidiButton from "../util/DidiButton";
import DidiTextInput from "../util/DidiTextInput";
import DidiTheme from "../styles/DidiTheme";

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
				<StatusBar
					backgroundColor={theme.darkNavigation}
					barStyle="light-content"
				/>
				<SafeAreaView style={style.area}>
					<View style={style.body}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "500",
								width: "80%",
								textAlign: "center"
							}}
						>
							Ingresá el código de 6 digitos para verificar tu celular
						</Text>
						<DidiTextInput
							description="Código de validacion"
							placeholder="6 digitos"
							tagImage={this.tagImageSource()}
							textInputProps={{
								onChangeText: text => this.setState({ inputCode: text })
							}}
							theme={theme}
						/>
						<Image
							style={style.contentImage}
							source={this.contentImageSource()}
						/>
						<Text style={{ fontSize: 18, fontWeight: "400" }}>
							¿No recibiste el código?
						</Text>
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
		return {};
	}

	private canPressContinueButton(): boolean {
		const code = this.state.inputCode;
		if (code) {
			const match = code.match("^[0-9]{6}$");
			if (match) {
				return match.length > 0;
			}
		}
		return false;
	}
}

function styles(theme: DidiTheme) {
	return StyleSheet.create({
		area: {
			backgroundColor: theme.background,
			flex: 1
		},
		body: {
			alignItems: "center",
			justifyContent: "space-evenly",
			flex: 1
		},
		contentImage: {
			backgroundColor: theme.opposite().button,
			width: 185,
			height: 160
		},
		countryImage: {
			backgroundColor: theme.opposite().button,
			width: 30,
			height: 30
		}
	});
}
