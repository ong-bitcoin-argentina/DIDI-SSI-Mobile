import React, { Fragment, ReactElement } from "react";
import { Image, ImageSourcePropType, SafeAreaView, StatusBar, StyleSheet, Text, View, ViewProps } from "react-native";

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
import { ScrollView } from "react-native-gesture-handler";

export interface ValidateIdentityExplanationProps {
	header: ValidateIdentityExplanationHeaderProps;
	description: string | ReactElement;
	image: ImageSourcePropType;
	buttonText?: string;
	buttonAction: () => void;
	viewProps?: ViewProps;
}

export default class ValidateIdentityExplanation extends React.Component<ValidateIdentityExplanationProps> {
	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled>
				<Fragment>
					<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
					<SafeAreaView style={commonStyles.view.area}>
						<View {...this.props.viewProps} style={[styles.body, this.props.viewProps?.style]}>
							<ValidateIdentityExplanationHeader {...this.props.header} />
							{this.renderDescription()}
							<Image style={styles.image} source={this.props.image} />
							{this.renderImageAndButton()}
						</View>
					</SafeAreaView>
				</Fragment>
			</ScrollView>
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
		marginTop: 10,
		marginBottom: 15,
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
		alignSelf: "center",
		width: 166,
		height: 144
	}
});
