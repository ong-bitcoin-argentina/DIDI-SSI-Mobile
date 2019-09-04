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

export interface EnterPhoneState {
	inputPhoneNumber: string;
}

export abstract class EnterPhoneScreen<Nav> extends NavigationEnabledComponent<
	{},
	EnterPhoneState,
	Nav
> {
	abstract contentImageSource(): ImageSourcePropType;

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
								source={this.tagImageSource()}
							/>
							<Text style={{ marginLeft: 10 }}>Argentina +54</Text>
						</View>
						<View
							style={{
								width: "80%",
								flexDirection: "row",
								alignItems: "center"
							}}
						>
							<Image style={styles.tagImage} source={this.tagImageSource()} />
							<View
								style={{ marginLeft: 30, flex: 1, flexDirection: "column" }}
							>
								<Text>Número de celular</Text>
								<TextInput
									style={styles.textInput}
									placeholder="011 + número sin el 15"
									onChangeText={text =>
										this.setState({ inputPhoneNumber: text })
									}
								/>
								<View style={{ backgroundColor: "#CCC", height: 1 }} />
							</View>
						</View>
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
	textInput: {
		height: 30,
		textDecorationLine: "underline"
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
	},
	tagImage: {
		backgroundColor: themes.secondaryTheme.button,
		width: 25,
		height: 25
	}
});
