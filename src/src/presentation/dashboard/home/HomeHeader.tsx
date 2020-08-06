import React from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PushNotification from "react-native-push-notification";

import { DidiText } from "../../util/DidiText";

import { PushNotificationObserver } from "../../../services/PushNotificationObserver";
import { recoverTokens, recoverTokensServiceKey } from "../../../services/trustGraph/recoverTokens";
import { ValidatedIdentity } from "../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

export interface HomeHeaderProps {
	onPersonPress: () => void;
	onBellPress: () => void;
}

interface HomeHeaderStateProps {
	person: ValidatedIdentity;
	isLoadingCredentials: boolean;
	newTokensAvailable: boolean;
}

interface HomeHeaderDispatchProps {
	recoverTokens: () => void;
	resetPrestadores: () => void;
}

class HomeHeader extends React.Component<HomeHeaderProps & HomeHeaderStateProps & HomeHeaderDispatchProps> {
	componentDidMount() {
		this.props.recoverTokens();
		this.props.resetPrestadores();
	}

	render() {
		return (
			<View style={styles.root}>
				<PushNotificationObserver
					onNotificationReceived={notification => {
						if (notification.foreground) {
							PushNotification.localNotification({
								message: notification.message,
								title: notification.title
							});
						}
						this.props.recoverTokens();
						return { didHandle: true };
					}}
				/>
				<TouchableOpacity style={styles.identityContainer} onPress={this.props.onPersonPress}>
					<Image
						style={styles.image}
						source={
							this.props.person.image !== undefined
								? { uri: `data:${this.props.person.image.mimetype};base64,${this.props.person.image.data}` }
								: require("../../resources/images/logo-space.png")
						}
					/>
					<View>
						<DidiText.DashboardHeader.Hello>{strings.dashboard.helloMessage}</DidiText.DashboardHeader.Hello>
						<DidiText.DashboardHeader.Name>{this.props.person.id}</DidiText.DashboardHeader.Name>
					</View>
				</TouchableOpacity>
				<View style={styles.activityIndicatorContainer}>
					{this.props.isLoadingCredentials ? <ActivityIndicator size="large" color={colors.secondary} /> : undefined}
					<TouchableOpacity style={styles.bellContainer} onPress={this.props.onBellPress}>
						<DidiText.Icon color={this.props.newTokensAvailable ? colors.highlight : undefined} fontSize={24}>
							
						</DidiText.Icon>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default didiConnect(
	HomeHeader,
	(state): HomeHeaderStateProps => ({
		person: state.validatedIdentity,
		isLoadingCredentials: state.serviceCalls[recoverTokensServiceKey]?.state === "IN_PROGRESS",
		newTokensAvailable: state.newTokensAvailable
	}),
	(dispatch): HomeHeaderDispatchProps => ({
		recoverTokens: () => dispatch(recoverTokens()),
		resetPrestadores: () => dispatch({ type: "RESET_PRESTADORES" })
	})
);

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
	activityIndicatorContainer: {
		flexDirection: "row"
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
