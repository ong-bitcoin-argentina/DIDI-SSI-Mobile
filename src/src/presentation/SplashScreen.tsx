import { View, SafeAreaView, StatusBar, Image } from "react-native";
import React, { Fragment } from "react";

import themes from "./resources/themes";
import commonStyles from "./access/resources/commonStyles";
import NavigationEnabledComponent from "./util/NavigationEnabledComponent";
import NavigationHeaderStyle from "./resources/NavigationHeaderStyle";
import { StartAccessProps, StartAccessScreen } from "./access/StartAccess";
import { DashboardScreenProps } from "./dashboard/Dashboard";

export interface SplashScreenNavigation {
	Access: StartAccessProps;
	Dashboard: DashboardScreenProps;
}

export class SplashScreen extends NavigationEnabledComponent<{}, {}, SplashScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.gone;

	componentDidMount() {
		setTimeout(() => {
			this.navigate("DashboardSettings" as "Dashboard", {});
		}, 100);
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="dark-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Image
							style={{ width: "50%", resizeMode: "center", alignSelf: "center" }}
							source={require("./resources/images/didiLogo.png")}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}
