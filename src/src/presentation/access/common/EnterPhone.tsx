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
import strings from "../resources/strings";

export type EnterPhoneProps = {};

export interface EnterPhoneState {
	inputPhoneNumber?: string;
}

export abstract class EnterPhoneScreen<Nav> extends NavigationEnabledComponent<EnterPhoneProps, EnterPhoneState, Nav> {
	constructor(props: EnterPhoneProps) {
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
						<Text style={commonStyles.text.emphasis}>{strings.accessCommon.enterPhone.messageHead}</Text>
						<View style={style.countryContainer}>
							<Image style={style.countryImage} source={this.countryImageSource()} />
							<Text style={commonStyles.text.normal}>{strings.accessCommon.place}</Text>
						</View>
						<DidiTextInput
							description={strings.accessCommon.enterPhone.cellNumber}
							placeholder={strings.accessCommon.enterPhone.cellPlaceholder}
							tagImage={this.tagImageSource()}
							textInputProps={{
								onChangeText: text => this.setState({ inputPhoneNumber: text })
							}}
							theme={theme}
						/>
						<Image style={style.contentImage} source={this.contentImageSource()} />
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

	private countryImageSource(): ImageSourcePropType {
		return require("../resources/images/arg.png");
	}

	private tagImageSource(): ImageSourcePropType {
		return require("../resources/images/phone.png");
	}

	private canPressContinueButton(): boolean {
		const phone = this.state.inputPhoneNumber;
		return phone ? phone.length > 0 : false;
	}
}

function styles(theme: DidiTheme) {
	return StyleSheet.create({
		contentImage: {
			width: 185,
			height: 160,
			alignSelf: "center"
		},
		countryContainer: {
			alignSelf: "center",
			flexDirection: "row",
			alignItems: "center"
		},
		countryImage: {
			width: 30,
			height: 30,
			marginRight: 10
		}
	});
}
