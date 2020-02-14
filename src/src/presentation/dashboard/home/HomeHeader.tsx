import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DidiText } from "../../util/DidiText";

import { ValidatedIdentity } from "../../../store/selector/combinedIdentitySelector";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

export interface HomeHeaderProps {
	person: ValidatedIdentity;
	onPersonPress: () => void;
	onBellPress: () => void;
}

export default class HomeHeader extends React.Component<HomeHeaderProps> {
	render() {
		return (
			<View style={styles.root}>
				<TouchableOpacity style={styles.identityContainer} onPress={this.props.onPersonPress}>
					<Image
						style={styles.image}
						source={
							this.props.person.image !== undefined
								? { uri: `data:${this.props.person.image.mimetype};base64,${this.props.person.image.data}` }
								: require("../../resources/images/defaultProfileImage.png")
						}
					/>
					<View>
						<DidiText.DashboardHeader.Hello>{strings.dashboard.helloMessage}</DidiText.DashboardHeader.Hello>
						<DidiText.DashboardHeader.Name>{this.props.person.id}</DidiText.DashboardHeader.Name>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.bellContainer} onPress={this.props.onBellPress}>
					<DidiText.Icon fontSize={24}></DidiText.Icon>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: themes.navigation,
		flexDirection: "row"
	},
	identityContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		paddingVertical: 25,
		paddingLeft: 20,
		marginRight: 20
	},
	bellContainer: {
		justifyContent: "center",
		paddingVertical: 25,
		paddingHorizontal: 20
	},
	image: {
		marginRight: 10,

		width: 46,
		height: 46,
		borderRadius: 23,

		backgroundColor: colors.darkBackground,
		borderColor: "#FFF",
		borderWidth: 2
	}
});
