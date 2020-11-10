import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { DidiText } from "../../../util/DidiText";
import colors from "../../../resources/colors";
import commonStyles from "../../../resources/commonStyles";
import { didiConnect } from "../../../../store/store";
import { ValidatedIdentity } from "../../../../store/selector/combinedIdentitySelector";

interface UserHeadingInternalProps extends ViewProps {
	user: string | undefined;
	onImageEditTap?: () => void;
}

type UserHeadingGlobalProps = {
	identity: ValidatedIdentity;
};

type UserHeadingProps = UserHeadingInternalProps & UserHeadingGlobalProps;

export class UserHeadingComponent extends React.Component<UserHeadingProps, {}, {}> {
	render() {
		const { onImageEditTap, identity } = this.props;
		return (
			<View style={styles.container}>
				<View style={[styles.imageContainer, commonStyles.util.shadow]}>
					<Image
						style={styles.image}
						source={
							identity && identity.image
								? { uri: `data:${identity.image.mimetype};base64,${identity.image.data}` }
								: require("../../../resources/images/logo-space.png")
						}
					/>
					{onImageEditTap && (
						<TouchableOpacity style={styles.cameraIconContainer} onPress={onImageEditTap}>
							<DidiText.Icon color={colors.primary} fontSize={20}>
								
							</DidiText.Icon>
						</TouchableOpacity>
					)}
				</View>
				<DidiText.UserData.HeaderName style={styles.userLabel}>@{this.props.user}</DidiText.UserData.HeaderName>
			</View>
		);
	}
}

const connected = didiConnect(
	UserHeadingComponent,
	(state): UserHeadingGlobalProps => ({
		identity: state.validatedIdentity
	}),
	dispatch => ({})
);

export { connected as UserHeading };

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		paddingTop: 32,
		paddingBottom: 20
	},
	imageContainer: {
		alignSelf: "center",
		justifyContent: "center",
		backgroundColor: colors.lightBackground,
		borderRadius: 80
	},
	cameraIconContainer: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.white,
		borderRadius: 20,
		...commonStyles.util.shadow
	},
	userLabel: {
		marginTop: 26,
		fontSize: 25,
		color: colors.white
	},
	image: {
		width: 154,
		height: 154,
		borderRadius: 90,
		backgroundColor: colors.darkBackground,
		borderColor: "#FFF",
		borderWidth: 2
	}
});
