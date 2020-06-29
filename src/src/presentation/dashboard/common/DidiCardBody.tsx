import React, { Component } from "react";
import { StyleSheet, View, ViewProps, ImageBackground } from "react-native";

import { DidiText } from "../../util/DidiText";

export interface DidiCardBodyProps extends ViewProps {
	icon: string;
	color: string;
	hollow?: boolean;
	decoration?: JSX.Element;
	backgroundUrl?: string;
}

export default class DidiCardBody extends Component<DidiCardBodyProps> {
	render() {
		const { backgroundUrl, decoration, hollow, color, icon, children, style } = this.props;
		const bodyStyle = hollow
			? { borderColor: color, backgroundColor: "#FFF", borderWidth: 2 }
			: { backgroundColor: color };

		const content = (
			<React.Fragment>
				<View style={styles.headerContainer}>
					<View style={styles.headerIconContainer}>
						<DidiText.Icon fontSize={30} color={hollow ? color : undefined}>
							{icon}
						</DidiText.Icon>
					</View>
					<View style={styles.textContainer}>{children}</View>
				</View>
				{decoration && <View style={styles.imageContainer}>{decoration}</View>}
			</React.Fragment>
		);

		const bodyProps = {
			...this.props,
			style: [styles.bodyDefaults, bodyStyle, style]
		};

		return backgroundUrl ? (
			<ImageBackground {...bodyProps} source={{ uri: backgroundUrl }}>
				{content}
			</ImageBackground>
		) : (
			<View {...bodyProps}>{content}</View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		marginHorizontal: 25,
		marginVertical: 25,
		alignItems: "stretch",
		justifyContent: "flex-start",
		flexGrow: 1
	},
	textContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "stretch"
	},
	bodyDefaults: {
		borderRadius: 10,
		flex: 0,
		minHeight: 180,
		marginVertical: 8,
		width: "auto"
	},

	headerIconContainer: {
		justifyContent: "flex-start",
		marginRight: 25
	},

	imageContainer: {
		position: "absolute",
		top: 10,
		right: 10
	}
});
