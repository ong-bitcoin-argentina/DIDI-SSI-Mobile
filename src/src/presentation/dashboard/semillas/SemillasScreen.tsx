import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, ScrollView, View } from "react-native";

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
import { haveValidIdentityAndBenefit } from "../../../util/semillasHelpers";
import { PRESTADORES_FEATURE } from "../../../AppConfig";
import { CredentialDocument } from "didi-sdk";
import { PrestadoresProps } from "./PrestadoresScreen";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { haveEmailAndPhone } from "../../../util/specialCredentialsHelpers";

export interface LoginScreenProps {}

interface SemillasScreenStateProps {
	pendingCredentials: boolean;
	didDni: Boolean;
	allSemillasCredentials?: CredentialDocument[];
	credentials: CredentialDocument[];
	activeSpecialCredentials: SpecialCredentialMap;
}
interface SemillasScreenState {
	dni: string;
	prestadoresEnabled: boolean;
}

interface SemillasScreenDispatchProps {
	getCredentials: (dni: string) => void;
}

type SemillasScreenInternalProps = LoginScreenProps & SemillasScreenStateProps & SemillasScreenDispatchProps;

export interface SemillasScreenNavigation {
	DashboardHome: DashboardScreenProps;
	Prestadores: PrestadoresProps;
}

const serviceKey = "CreateSemillasCredentials";

const {
	detailBarTitle,
	detailFirst,
	detailSecond,
	detailThird,
	credentialsSuccess,
	credetialsPending
} = strings.semillas;

class SemillasScreen extends NavigationEnabledComponent<
	SemillasScreenInternalProps,
	SemillasScreenState,
	SemillasScreenNavigation
> {
	// navigationOptions makes reference to the topbar navigation, in this case, with a left arrow which function is return to home
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		SemillasScreenNavigation,
		"DashboardHome"
	>(detailBarTitle, "DashboardHome", {});

	constructor(props: SemillasScreenInternalProps) {
		super(props);
		this.state = {
			prestadoresEnabled:
				haveValidIdentityAndBenefit(this.props.allSemillasCredentials) &&
				haveEmailAndPhone(this.props.activeSpecialCredentials),
			dni: ""
		};
	}

	componentDidMount() {
		const { credentials } = this.props;
		// We look into the credentials to check if there's an identity credential with DNI
		const cred = credentials.find(
			cred => cred.title === strings.specialCredentials.PersonalData.title && cred.data.dni
		);

		if (cred && cred.data.dni) {
			this.setState({
				dni: cred.data.dni.toString()
			});
		}
	}

	renderButton() {
		const { didDni, pendingCredentials } = this.props;
		const { prestadoresEnabled } = this.state;

		return didDni ? (
			PRESTADORES_FEATURE ??
				(prestadoresEnabled ? (
					<DidiServiceButton
						onPress={() => this.navigate("Prestadores", {})}
						title="Ver Beneficios"
						style={styles.button}
						isPending={false}
					/>
				) : (
					<Alert text={credetialsPending} style={{ marginBottom: 50 }} />
				))
		) : (
			<DidiServiceButton
				onPress={this.onGetCredentials}
				title={strings.semillas.getCredentials}
				style={styles.button}
				isPending={pendingCredentials}
			/>
		);
	}

	render() {
		return (
			<Fragment>
				<ServiceObserver serviceKey={serviceKey} onSuccess={this.onCredentialsAdded} />

				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<ScrollView>
					<SafeAreaView style={{ ...commonStyles.view.area, ...styles.scrollContent }}>
						<SemillasLogo viewBox="0 0 128 39" width={192} height={58} style={styles.logo} />
						<View style={{ paddingHorizontal: 15 }}>
							<DidiText.Explanation.Small style={styles.paragraph}>{detailFirst}</DidiText.Explanation.Small>
							<DidiText.Explanation.Small style={styles.paragraph}>{detailSecond}</DidiText.Explanation.Small>
							<DidiText.Explanation.Small style={styles.paragraph}>{detailThird}</DidiText.Explanation.Small>
						</View>
						{this.renderButton()}
					</SafeAreaView>
				</ScrollView>
			</Fragment>
		);
	}

	onGetCredentials = () => {
		const { dni } = this.state;

		if (!dni) {
			DataAlert.alert(strings.semillas.credentials, strings.semillas.noDni);
		} else {
			this.showCredentialConfirmation();
		}
	};

	onCredentialsAdded = () => {
		DataAlert.alert(strings.semillas.program, credentialsSuccess);
	};

	showCredentialConfirmation = () => {
		const { getCredentials } = this.props;
		const { dni } = this.state;

		DataAlert.alert(
			strings.semillas.credentials,
			strings.semillas.shareMessage,
			() => {},
			() => getCredentials(dni)
		);
	};
}

export default didiConnect(
	SemillasScreen,
	(state): SemillasScreenStateProps => ({
		pendingCredentials: isPendingService(state.serviceCalls[serviceKey]),
		didDni: state.did.didDni,
		allSemillasCredentials: state.allSemillasCredentials,
		credentials: state.credentials,
		activeSpecialCredentials: state.activeSpecialCredentials
	}),
	(dispatch): SemillasScreenDispatchProps => ({
		getCredentials: dni => dispatch(getUserCredentials(serviceKey, dni))
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
	warningMessage: {
		fontSize: 18,
		marginTop: 20
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
