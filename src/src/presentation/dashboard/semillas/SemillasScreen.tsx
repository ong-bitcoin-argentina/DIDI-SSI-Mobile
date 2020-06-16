import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, ScrollView } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DashboardScreenProps } from "../home/Dashboard";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import SemillasLogo from "../../resources/images/sem-logo.svg";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DataAlert } from "../../common/DataAlert";
import { isPendingService } from "../../../services/ServiceStateStore";
import { getUserCredentials } from "../../../services/user/getCredentials";

export interface LoginScreenProps {}

interface SemillasScreenStateProps {
	pendingCredentials: boolean;
}
interface SemillasScreenDispatchProps {
	getCredentials: () => void;
}

type SemillasScreenInternalProps = LoginScreenProps & SemillasScreenStateProps & SemillasScreenDispatchProps;

export interface SemillasScreenNavigation {
	DashboardHome: DashboardScreenProps;
}

const serviceKey = "CreateSemillasCredentials";

class SemillasScreen extends NavigationEnabledComponent<SemillasScreenInternalProps, {}, {}> {
	// navigationOptions makes reference to the topbar navigation, in this case, with a left arrow which function is return to home
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		SemillasScreenNavigation,
		"DashboardHome"
	>(strings.semillas.detailBarTitle, "DashboardHome", {});

	render() {
		const { getCredentials } = this.props;

		return (
			<Fragment>
				<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.onCredentialsAdded()} />

				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<ScrollView>
					<SafeAreaView style={{ ...commonStyles.view.area, ...styles.scrollContent }}>
						<SemillasLogo viewBox="0 0 128 39" width={192} height={58} style={styles.logo} />
						<DidiText.Explanation.Small style={styles.paragraph}>
							{strings.semillas.detailFirst}
						</DidiText.Explanation.Small>
						<DidiText.Explanation.Small style={styles.paragraph}>
							{strings.semillas.detailSecond}
						</DidiText.Explanation.Small>
						<DidiText.Explanation.Small style={styles.paragraph}>
							{strings.semillas.detailThird}
						</DidiText.Explanation.Small>
						<DidiServiceButton
							onPress={getCredentials}
							title={strings.semillas.getCredentials}
							style={styles.button}
							isPending={false}
						/>
					</SafeAreaView>
				</ScrollView>
			</Fragment>
		);
	}

	onCredentialsAdded = () => {
		DataAlert.alert(strings.semillas.credentials, strings.semillas.credentialsSuccess);
	};
}

export default didiConnect(
	SemillasScreen,
	(state): SemillasScreenStateProps => ({
		pendingCredentials: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): SemillasScreenDispatchProps => ({
		getCredentials: () => dispatch(getUserCredentials(serviceKey))
	})
);

const styles = StyleSheet.create({
	body: {
		width: "100%"
	},
	scrollContent: {
		backgroundColor: "white",
		paddingHorizontal: 20,
		paddingVertical: 8
	},
	paragraph: {
		marginVertical: 10,
		fontSize: 18
	},
	button: {
		marginTop: 30,
		paddingHorizontal: 20
	},
	buttonText: {
		fontSize: 16
	},
	logo: {
		height: 50,
		width: 50,
		marginVertical: 25
	}
});
