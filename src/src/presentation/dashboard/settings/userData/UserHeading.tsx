import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";

import { DidiText } from "../../../util/DidiText";

import colors from "../../../resources/colors";

interface UserHeadingProps extends ViewProps {
	user: string | undefined;
	profileImage:
		| {
				mimetype: string;
				data: string;
		  }
		| undefined;
	onImageEditTap?: () => void;
}

export class UserHeadingComponent extends React.Component<UserHeadingProps, {}, {}> {
	render() {
		const onImageEditTap = this.props.onImageEditTap;
		return (
			<View>
				<View style={styles.backgroundImageContainer}>
					<Image
						style={styles.backgroundImage}
						source={require("../../../resources/images/defaultBackgroundImage.jpg")}
					/>
				</View>

				<View style={styles.identityImageContainer}>
					<Image
						style={styles.identityImage}
						source={
							this.props.profileImage !== undefined
								? { uri: `data:${this.props.profileImage.mimetype};base64,${this.props.profileImage.data}` }
								: require("../../../resources/images/logo-space.png")
						}
					/>
				</View>

				{onImageEditTap && (
					<TouchableOpacity style={styles.cameraIconContainer} onPress={onImageEditTap}>
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
		alignSelf: 'center',
		justifyContent: 'center',
		top: 90,
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
