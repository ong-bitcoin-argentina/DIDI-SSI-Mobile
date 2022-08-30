import React from "react";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PushNotification from "react-native-push-notification";

import { DidiText } from "../../util/DidiText";

import { PushNotificationObserver } from "../../../services/PushNotificationObserver";
import { recoverTokens, recoverTokensServiceKey } from "../../../services/trustGraph/recoverTokens";
import { ValidatedIdentity } from "../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { ActiveDid } from "../../../store/reducers/didReducer";
import Icon from "react-native-vector-icons/AntDesign";

export interface HomeHeaderProps {
	onPersonPress: () => void;
	onBellPress: () => void;
	onMarkPress: () => void;
}

interface HomeHeaderStateProps {
	did: ActiveDid;
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
						<DidiText.DashboardHeader.Hello>{
							this.props.did && this.props.did.did ? 
								this.props.did.did().slice(0,15) + '...' + this.props.did.did().slice(-4) 
						: 'Falta el did'}
							</DidiText.DashboardHeader.Hello>
					</View>
				</TouchableOpacity>
				<View style={styles.activityIndicatorContainer}>
					{this.props.isLoadingCredentials ? <ActivityIndicator size="large" color={colors.secondary} /> : undefined}
					<TouchableOpacity style={[styles.bellContainer, {paddingRight: 0}]} onPress={this.props.onMarkPress}>
						<Icon  name="question" color={colors.primaryText} size={28}  />
					</TouchableOpacity>
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
		did: state.did.activeDid,
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
		backgroundColor: themes.header,
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
		paddingRight: 20
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