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
import { TextInput } from "react-native-gesture-handler";

import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import themes from "../styles/themes";
import DidiButton from "../util/DidiButton";
import DidiTextInput from "../util/DidiTextInput";

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

	abstract contentImageSource(): ImageSourcePropType;

	abstract didPressContinueButton(event: GestureResponderEvent): void;

	countryImageSource(): ImageSourcePropType {
		return {};
	}

	tagImageSource(): ImageSourcePropType {
		return {};
	}

	canPressContinueButton(): boolean {
		const phone = this.state.inputPhoneNumber;
		return phone ? phone.length > 0 : false;
	}

	render() {
		return (
			<Fragment>
				<StatusBar
					backgroundColor={themes.darkNavigation}
					barStyle="light-content"
				/>
				<SafeAreaView style={styles.area}>
					<View style={styles.body}>
						<Text style={{ fontSize: 18, fontWeight: "500" }}>
							Cargá tu número de celular
						</Text>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Image
								style={styles.countryImage}
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
						/>
						<Image
							style={styles.contentImage}
							source={this.contentImageSource()}
						/>
						<DidiButton
							disabled={!this.canPressContinueButton()}
							onPress={event => this.didPressContinueButton(event)}
							title="Validar"
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	area: {
		backgroundColor: themes.background,
		flex: 1
	},
	body: {
		alignItems: "center",
		justifyContent: "space-evenly",
		flex: 1
	},
	contentImage: {
		backgroundColor: themes.secondaryTheme.button,
		width: 185,
		height: 160
	},
	countryImage: {
		backgroundColor: themes.secondaryTheme.button,
		width: 30,
		height: 30
	}
});
