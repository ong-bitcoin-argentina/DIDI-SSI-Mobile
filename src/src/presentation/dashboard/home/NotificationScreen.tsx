import React, { Fragment } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { RequestCard } from "../common/RequestCard";

import { RequestDocument } from "../../../model/RequestDocument";
import { recoverTokens } from "../../../services/trustGraph/recoverTokens";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { ScanDisclosureRequestProps } from "../credentials/ScanDisclosureRequest";

export type NotificationScreenProps = {};
interface NotificationScreenStateProps {
	requests: RequestDocument[];
}
interface NotificationScreenDispatchProps {
	recoverTokens: () => void;
}
type NotificationScreenInternalProps = NotificationScreenProps &
	NotificationScreenStateProps &
	NotificationScreenDispatchProps;

type NotificationScreenState = {
	showExpired: boolean;
};
export interface NotificationScreenNavigation {
	ScanDisclosureRequest: ScanDisclosureRequestProps;
}

class NotificationScreen extends NavigationEnabledComponent<
	NotificationScreenInternalProps,
	NotificationScreenState,
	NotificationScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Notificationes");

	constructor(props: NotificationScreenInternalProps) {
		super(props);
		this.state = {
			showExpired: false
		};
	}

	componentDidMount() {
		this.props.recoverTokens();
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
						<DidiButton
							title={
								this.state.showExpired
									? strings.dashboard.notifications.hideExpired
									: strings.dashboard.notifications.showExpired
							}
							onPress={() => this.setState({ showExpired: !this.state.showExpired })}
						/>
						{this.props.requests
							.filter(rq => this.state.showExpired || RequestDocument.isValidNow(rq))
							.map(rq => this.renderRequest(rq))}
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderRequest(request: RequestDocument) {
		const now = Math.floor(Date.now() / 1000);
		const isActive = request.content.expireAt ? now < request.content.expireAt : true;
		return (
			<RequestCard key={request.jwt} request={request}>
				<View style={{ marginTop: 10 }}>
					{isActive ? (
						<DidiButton
							title="Enviar"
							style={{ width: 100, height: 30, backgroundColor: colors.secondary }}
							onPress={() => this.onSendResponse(request)}
						/>
					) : (
						<Text>Fecha límite superada.</Text>
					)}
				</View>
			</RequestCard>
		);
	}

	private onSendResponse(request: RequestDocument) {
		this.navigate("ScanDisclosureRequest", {
			request,
			onGoBack: screen => screen.goBack()
		});
	}
}

const connected = didiConnect(
	NotificationScreen,
	(state): NotificationScreenStateProps => ({
		requests: state.requests
	}),
	(dispatch): NotificationScreenDispatchProps => ({
		recoverTokens: () => dispatch(recoverTokens())
	})
);

export { connected as NotificationScreen };

const styles = StyleSheet.create({
	body: {
		width: "100%"
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingVertical: 8
	}
});
