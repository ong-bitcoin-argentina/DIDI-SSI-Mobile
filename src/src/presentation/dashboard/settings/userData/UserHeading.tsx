import { View, StyleSheet, ViewProps, Image, Text, TouchableOpacity, ImageSourcePropType } from "react-native";
import React from "react";
import colors from "../../../resources/colors";
import commonStyles from "../../../access/resources/commonStyles";

interface UserHeadingProps extends ViewProps {
	user: string;
	profileImage: ImageSourcePropType;
	backgroundImage: ImageSourcePropType;
	cameraIcon: ImageSourcePropType;
}

export default class UserHeadingComponent extends React.Component<UserHeadingProps, {}, {}> {
	openBgImagePicker() {
		// TODO
	}

	render() {
		return (
			<View>
				<View style={styles.backgroundImageContainer}>
					<Image style={styles.backgroundImage} source={this.props.backgroundImage} />
				</View>

				<View style={styles.identityImageContainer}>
					<Image style={styles.identityImage} source={this.props.profileImage} />
				</View>

				<TouchableOpacity
					style={styles.cameraIconContainer}
					onPress={() => {
						this.openBgImagePicker();
					}}
				>
					<Image style={styles.cameraIcon} source={this.props.cameraIcon} />
				</TouchableOpacity>

				<Text style={[commonStyles.text.emphasis, styles.userLabel]}>{this.props.user}</Text>
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
		width: 30,
		height: 30
	},
	cameraIcon: {
		width: 30,
		height: 30
	},
	userLabel: {
		marginTop: 40,
		marginRight: 10,
		color: colors.primary
	},
	identityImage: {
		margin: 5,
		width: 140,
		height: 140
	}
});
