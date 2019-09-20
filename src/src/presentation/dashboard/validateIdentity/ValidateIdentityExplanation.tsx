import { StatusBar, SafeAreaView, View, Text, ViewProps, StyleSheet } from "react-native";
import React, { Fragment, ReactNode } from "react";

import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import { SvgProps } from "react-native-svg";
import DidiButton from "../../util/DidiButton";
import colors from "../../resources/colors";

export interface ValidateIdentityExplanationProps {
	title: ReactNode;
	header: ReactNode;
	description: ReactNode;
	image: React.FunctionComponent<SvgProps>;
	buttonText?: string;
}

export default class ValidateIdentityExplanation extends React.Component<ValidateIdentityExplanationProps> {
	render() {
		const ContentImage = this.props.image;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={styles.body}>
						<Text style={styles.title}>{this.props.title}</Text>
						<Text style={styles.header}>{this.props.header}</Text>
						<Text style={styles.description}>{this.props.description}</Text>
						<ContentImage style={styles.image} />
						{this.props.buttonText ? this.renderTextButton(this.props.buttonText) : this.renderPhotoButton()}
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderPhotoButton() {}

	private renderTextButton(title: string) {
		return <DidiButton title={title} />;
	}
}

const styles = StyleSheet.create({
	body: {
		marginHorizontal: 20,
		alignItems: "stretch",
		justifyContent: "space-evenly",
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
