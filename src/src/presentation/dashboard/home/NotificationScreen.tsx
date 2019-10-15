import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StatusBar, SafeAreaView, View, Text, ScrollView } from "react-native";
import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import { didiConnect } from "../../../model/store";
import { RequestDocument } from "../../../model/data/RequestDocument";

export type NotificationScreenProps = {};
interface NotificationScreenStateProps {
	requests: RequestDocument[];
}
type NotificationScreenInternalProps = NotificationScreenProps & NotificationScreenStateProps;

type NotificationScreenState = {};
export type NotificationScreenNavigation = {};

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
					<ScrollView style={{ width: "100%" }} contentContainerStyle={commonStyles.view.body}>
						{this.props.requests.map(rq => {
							return <Text key={rq.jwt}>{JSON.stringify(rq.content)}</Text>;
						})}
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const connected = didiConnect(
	NotificationScreen,
	(state): NotificationScreenStateProps => {
		return { requests: state.requests };
	}
);

export { connected as NotificationScreen };
