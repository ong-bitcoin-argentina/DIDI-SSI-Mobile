import React, { Fragment, ReactElement } from "react";
import { Image, ImageSourcePropType, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

import commonStyles from "../../access/resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import DidiCamera from "../common/DidiCamera";

import colors from "../../resources/colors";
import themes from "../../resources/themes";

export interface ValidateIdentityExplanationProps {
	title: string;
	header: string;
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
						<Text style={styles.title}>{this.props.title}</Text>
						<Text style={styles.header}>{this.props.header}</Text>
						{this.renderDescription()}
						<Image style={commonStyles.image.image} source={this.props.image} />
						{this.renderButton()}
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderDescription() {
		if (typeof this.props.description === "string") {
			return <Text style={styles.description}>{this.props.description}</Text>;
		} else {
			return this.props.description;
		}
	}

	private renderButton() {
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
		alignItems: "stretch",
		justifyContent: "space-between",
		flex: 1
	},
	title: {
		fontWeight: "bold",
		fontSize: 22,
		textAlign: "center"
	},
	header: {
		fontSize: 18,
		textAlign: "center",
		paddingVertical: 10,
		backgroundColor: colors.backgroundSeparator
	},
	description: {
		fontSize: 16,
		textAlign: "center"
	},
	image: {
		alignSelf: "center"
	}
});
