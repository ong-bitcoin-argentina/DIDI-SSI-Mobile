import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";

import { DidiText } from "../../../util/DidiText";

import colors from "../../../resources/colors";

interface UserHeadingProps extends ViewProps {
	user: string | undefined;
	profileImage: ImageSourcePropType | undefined;
	backgroundImage: ImageSourcePropType | undefined;
	allowEdit?: boolean;
}

export class UserHeadingComponent extends React.Component<UserHeadingProps, {}, {}> {
	openBgImagePicker() {
		// TODO
	}

	render() {
		return (
			<View>
				<View style={styles.backgroundImageContainer}>
					<Image
						style={styles.backgroundImage}
						source={
							this.props.backgroundImage !== undefined
								? this.props.backgroundImage
								: require("../../../resources/images/defaultBackgroundImage.jpg")
						}
					/>
				</View>

				<View style={styles.identityImageContainer}>
					<Image
						style={styles.identityImage}
						source={
							this.props.profileImage !== undefined
								? this.props.profileImage
								: require("../../../resources/images/defaultProfileImage.png")
						}
					/>
				</View>

				{this.props.allowEdit && (
					<TouchableOpacity
						style={styles.cameraIconContainer}
						onPress={() => {
							this.openBgImagePicker();
						}}
					>
						<DidiText.Icon fontSize={20}></DidiText.Icon>
					</TouchableOpacity>
				)}

				<DidiText.UserData.HeaderName style={styles.userLabel}>{this.props.user}</DidiText.UserData.HeaderName>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	backgroundImage: {
		width: "auto",
		height: 200
	},
	backgroundImageContainer: {},
	identityImageContainer: {
		position: "absolute",
		top: 90,
		left: 125,

		backgroundColor: colors.lightBackground,
		borderRadius: 80,
		width: 150,
		height: 150
	},
	cameraIconContainer: {
		position: "absolute",
		top: 170,
		right: 20,
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primary,
		borderRadius: 20
	},
	userLabel: {
		marginTop: 40
	},
	identityImage: {
		margin: 5,

		width: 140,
		height: 140,
		borderRadius: 70,

		backgroundColor: colors.darkBackground,
		borderColor: "#FFF",
		borderWidth: 2
	}
});
