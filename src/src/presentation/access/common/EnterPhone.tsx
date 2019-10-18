import React from "react";
import { GestureResponderEvent, Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import strings from "../../resources/strings";

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
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.accessCommon.enterPhone.messageHead}</Text>
				<View style={styles.countryContainer}>
					<Image style={styles.countryImage} source={this.countryImageSource()} />
					<Text style={commonStyles.text.normal}>{strings.accessCommon.place}</Text>
				</View>
				<DidiTextInput
					description={strings.accessCommon.enterPhone.cellNumber}
					placeholder={strings.accessCommon.enterPhone.cellPlaceholder}
					tagImage={this.tagImageSource()}
					textInputProps={{
						keyboardType: "phone-pad",
						onChangeText: text => this.setState({ inputPhoneNumber: text })
					}}
				/>
				<Image style={commonStyles.image.image} source={this.contentImageSource()} />
				<DidiButton
					disabled={!this.canPressContinueButton()}
					onPress={event => this.didPressContinueButton(event)}
					title={strings.accessCommon.validateButtonText}
				/>
			</DidiScreen>
		);
	}

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

const styles = StyleSheet.create({
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
