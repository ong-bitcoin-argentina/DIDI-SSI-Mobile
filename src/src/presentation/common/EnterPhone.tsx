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

export type EnterPhoneProps = {};

export interface EnterPhoneState {
	inputPhoneNumber?: string;
}

export abstract class EnterPhoneScreen<Nav> extends NavigationEnabledComponent<
	EnterPhoneProps,
	EnterPhoneState,
	Nav
> {
	constructor(props: EnterPhoneProps) {
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
						<Text style={{ fontSize: 18, fontWeight: "500" }}>
							Cargá tu número de celular
						</Text>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Image
								style={style.countryImage}
								source={this.countryImageSource()}
							/>
							<Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "400" }}>
								Argentina +54
							</Text>
						</View>
						<DidiTextInput
							description="Número de celular"
							placeholder="011 + número sin el 15"
							tagImage={this.tagImageSource()}
							textInputProps={{
								onChangeText: text => this.setState({ inputPhoneNumber: text })
							}}
							theme={theme}
						/>
						<Image
							style={style.contentImage}
							source={this.contentImageSource()}
						/>
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

	private countryImageSource(): ImageSourcePropType {
		return {};
	}

	private tagImageSource(): ImageSourcePropType {
		return {};
	}

	private canPressContinueButton(): boolean {
		const phone = this.state.inputPhoneNumber;
		return phone ? phone.length > 0 : false;
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
