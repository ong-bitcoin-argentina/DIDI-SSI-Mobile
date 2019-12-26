import React, { Fragment, ReactElement } from "react";
import { Image, ImageSourcePropType, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import { DidiCamera } from "../common/DidiCamera";

import colors from "../../resources/colors";
import themes from "../../resources/themes";

import {
	ValidateIdentityExplanationHeader,
	ValidateIdentityExplanationHeaderProps
} from "./ValidateIdentityExplanationHeader";

export interface ValidateIdentityExplanationProps {
	header: ValidateIdentityExplanationHeaderProps;
	description: string | ReactElement;
	image: ImageSourcePropType;
	buttonText?: string;
	buttonAction: () => void;
}

export default class ValidateIdentityExplanation extends React.Component<ValidateIdentityExplanationProps> {
	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={styles.body}>
						<ValidateIdentityExplanationHeader {...this.props.header} />
						{this.renderDescription()}
						<Image style={commonStyles.image.image} source={this.props.image} />
						{this.renderImageAndButton()}
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderDescription() {
		if (typeof this.props.description === "string") {
			return <DidiText.ValidateIdentity.Normal>{this.props.description}</DidiText.ValidateIdentity.Normal>;
		} else {
			return this.props.description;
		}
	}

	private renderImageAndButton() {
		if (this.props.buttonText) {
			return <DidiButton title={this.props.buttonText} onPress={this.props.buttonAction} />;
		} else {
			return DidiCamera.cameraButton(this.props.buttonAction);
		}
	}
}

const styles = StyleSheet.create({
	body: {
		marginHorizontal: 20,
		marginTop: 40,
		marginBottom: 30,
		alignSelf: "stretch",
		alignItems: "stretch",
		justifyContent: "space-between",
		flex: 1
	},
	header: {
		paddingVertical: 10,
		backgroundColor: colors.backgroundSeparator
	},
	image: {
		alignSelf: "center"
	}
});
