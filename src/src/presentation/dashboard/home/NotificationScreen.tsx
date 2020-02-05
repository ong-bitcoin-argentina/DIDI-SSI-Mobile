import { SelectiveDisclosureRequest } from "didi-sdk";
import React, { Fragment } from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { RequestCard } from "../common/RequestCard";

import { recoverTokens } from "../../../services/trustGraph/recoverTokens";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { ScanDisclosureRequestProps } from "../credentials/ScanDisclosureRequest";

export type NotificationScreenProps = {};
interface NotificationScreenStateProps {
	requests: SelectiveDisclosureRequest[];
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
					<FlatList
						style={styles.body}
						contentContainerStyle={styles.scrollContent}
						data={this.props.requests.filter(rq => this.state.showExpired || SelectiveDisclosureRequest.isValidNow(rq))}
						keyExtractor={req => req.jwt}
						renderItem={item => this.renderRequest(item.item)}
						ListHeaderComponent={
							<DidiButton
								title={this.state.showExpired ? strings.notifications.hideExpired : strings.notifications.showExpired}
								onPress={() => this.setState({ showExpired: !this.state.showExpired })}
							/>
						}
						ListEmptyComponent={
							<View style={styles.empty}>
								<DidiText.Explanation.Normal>{strings.notifications.noRequestsAvailable}</DidiText.Explanation.Normal>
							</View>
						}
					/>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderRequest(request: SelectiveDisclosureRequest) {
		const now = Math.floor(Date.now() / 1000);
		const isActive = request.expireAt ? now < request.expireAt : true;
		return (
			<RequestCard key={request.jwt} request={request}>
				<View style={{ marginTop: 10 }}>
					{isActive ? (
						<DidiButton
							title={strings.notifications.sendResponse}
							style={{ width: 100, height: 30, backgroundColor: colors.secondary }}
							onPress={() => this.onSendResponse(request)}
						/>
					) : (
						<Text>{strings.notifications.requestExpired}</Text>
					)}
				</View>
			</RequestCard>
		);
	}

	private onSendResponse(request: SelectiveDisclosureRequest) {
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
	},
	empty: {
		marginVertical: 20
	}
});
