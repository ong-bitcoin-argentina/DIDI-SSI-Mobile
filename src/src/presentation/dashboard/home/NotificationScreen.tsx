import React, { Fragment } from "react";
import { StatusBar, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import { didiConnect } from "../../../model/store";
import { RequestDocument } from "../../../model/data/RequestDocument";
import { RequestCard } from "../common/RequestCard";
import DidiButton from "../../util/DidiButton";
import colors from "../../resources/colors";
import { ScanDisclosureRequestProps } from "../credentials/ScanDisclosureRequest";

export type NotificationScreenProps = {};
interface NotificationScreenStateProps {
	requests: RequestDocument[];
}
type NotificationScreenInternalProps = NotificationScreenProps & NotificationScreenStateProps;

type NotificationScreenState = {};
export interface NotificationScreenNavigation {
	ScanDisclosureRequest: ScanDisclosureRequestProps;
}

class NotificationScreen extends NavigationEnabledComponent<
	NotificationScreenInternalProps,
	NotificationScreenState,
	NotificationScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Notificationes");

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
						{this.props.requests.map(rq => {
							return (
								<RequestCard key={rq.jwt} request={rq}>
									<DidiButton
										title="Enviar"
										style={{ width: 100, height: 30, backgroundColor: colors.secondary }}
										onPress={() => this.onSendResponse(rq)}
									/>
								</RequestCard>
							);
						})}
					</ScrollView>
				</SafeAreaView>
			</Fragment>
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
	(state): NotificationScreenStateProps => {
		return { requests: state.requests };
	}
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
