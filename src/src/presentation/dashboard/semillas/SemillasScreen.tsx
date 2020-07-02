import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, ScrollView, View } from "react-native";
import { CredentialDocument } from "didi-sdk";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import Alert from "../../util/Alert";
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
import { PrestadoresProps } from './PrestadoresScreen';
import { SemillasIdentityModel } from '../../../model/SemillasIdentity';

export interface LoginScreenProps {};

interface SemillasScreenStateProps {
	pendingCredentials: boolean;
	didDni: Boolean;
	semillasCredential?: SemillasIdentityModel;
	semillasBeneficiarios?: SemillasIdentityModel[];
}
interface SemillasScreenDispatchProps {
	getCredentials: () => void;
}

type SemillasScreenInternalProps = LoginScreenProps & SemillasScreenStateProps & SemillasScreenDispatchProps;

type SemillasScreenState = {
	haveSemillasCredential: boolean;
}

export interface SemillasScreenNavigation {
	DashboardHome: DashboardScreenProps;
	Prestadores: PrestadoresProps;
}

const serviceKey = "CreateSemillasCredentials";

const { detailBarTitle, detailFirst, detailSecond, detailThird, credentialsSuccess, credetialsPending } = strings.semillas;

class SemillasScreen extends NavigationEnabledComponent<SemillasScreenInternalProps, SemillasScreenState, SemillasScreenNavigation> {
	// navigationOptions makes reference to the topbar navigation, in this case, with a left arrow which function is return to home
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		SemillasScreenNavigation,
		"DashboardHome"
	>(detailBarTitle, "DashboardHome", {});

	constructor(props: SemillasScreenInternalProps) {
		super(props);
		this.state = {
			haveSemillasCredential: !!this.props.semillasCredential
		};
	}

	
	render() {
		const { didDni, getCredentials } = this.props;

		return (
			<Fragment>
				<ServiceObserver serviceKey={serviceKey} onSuccess={this.onCredentialsAdded} />

				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<ScrollView>
					<SafeAreaView style={{ ...commonStyles.view.area, ...styles.scrollContent }}>
						<SemillasLogo viewBox="0 0 128 39" width={192} height={58} style={styles.logo} />
						<DidiText.Explanation.Small style={styles.paragraph}>
							{detailFirst}
						</DidiText.Explanation.Small>
						<DidiText.Explanation.Small style={styles.paragraph}>
							{detailSecond}
						</DidiText.Explanation.Small>
						<DidiText.Explanation.Small style={styles.paragraph}>
							{detailThird}
						</DidiText.Explanation.Small>
						{
							didDni ? 
								(
									this.state.haveSemillasCredential ?
										<DidiServiceButton
											onPress={() => this.navigate("Prestadores", {})}
											title="Ver Beneficios"
											style={styles.button}
											isPending={false}
										/>
										:
										<Alert text={credetialsPending} style={{ marginBottom:50 }} />
								) 
								:
								<DidiServiceButton
									onPress={getCredentials}
									title={strings.semillas.getCredentials}
									style={styles.button}
									isPending={false}
								/>
						}
					</SafeAreaView>
				</ScrollView>
			</Fragment>
		);
	}

	onCredentialsAdded = () => {
		DataAlert.alert(strings.semillas.credentials, credentialsSuccess);
	};

}

export default didiConnect(
	SemillasScreen,
	(state): SemillasScreenStateProps => ({
		pendingCredentials: isPendingService(state.serviceCalls[serviceKey]),
		didDni: state.did.didDni,
		semillasCredential: state.semillasCredential,
		semillasBeneficiarios: state.semillasBeneficiarios
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
	},
	hidden: {
		display: "none"
	}
});
