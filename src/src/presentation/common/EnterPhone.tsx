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

export interface EnterPhoneState {
	inputPhoneNumber: string;
}

export abstract class EnterPhoneScreen<Nav> extends NavigationEnabledComponent<
	{},
	EnterPhoneState,
	Nav
> {
	abstract contentImageSource(): ImageSourcePropType;

	abstract countryImageSource(): ImageSourcePropType;

	abstract tagImageSource(): ImageSourcePropType;

	abstract canPressContinueButton(): boolean;

	abstract didPressContinueButton(event: GestureResponderEvent): void;

	render() {
		return (
			<Fragment>
				<StatusBar
					backgroundColor={themes.darkNavigation}
					barStyle="light-content"
				/>
				<SafeAreaView style={styles.area}>
					<View style={styles.body}>
						<Text>Cargá tu número de celular</Text>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Image
								style={styles.countryImage}
								source={this.countryImageSource()}
							/>
							<Text style={{ marginLeft: 10 }}>Argentina +54</Text>
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
		flex: 1
	},
	body: {
		backgroundColor: themes.background,
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
