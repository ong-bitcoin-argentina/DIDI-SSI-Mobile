import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, ScrollView } from "react-native";

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
import { mustHavePrestadoresEnabled } from "../../../util/semillasHelpers";
import { PRESTADORES_FEATURE } from '../../../AppConfig';
import { CredentialDocument } from "didi-sdk";
import { PrestadoresProps } from "./PrestadoresScreen";

export interface LoginScreenProps {}

interface SemillasScreenStateProps {
	pendingCredentials: boolean;
	didDni: Boolean;
	allSemillasCredentials?: CredentialDocument[];
	credentials: CredentialDocument[];
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

const { detailBarTitle, detailFirst, detailSecond, detailThird, credentialsSuccess, credetialsPending } = strings.semillas;

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
			prestadoresEnabled: mustHavePrestadoresEnabled(this.props.allSemillasCredentials),
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
		const { getCredentials, didDni, pendingCredentials } = this.props;
		const { dni, prestadoresEnabled } = this.state;

		const showButtonStyle = { ...styles.button, ...(didDni || !dni ? styles.hidden : {}) };

		if (!dni) {
			return (
				<DidiText.Explanation.Emphasis style={styles.warningMessage}>
					{strings.semillas.noDni}
				</DidiText.Explanation.Emphasis>
			);
		}

		return didDni ? (
			prestadoresEnabled ? (
				<DidiServiceButton
					onPress={() => this.navigate("Prestadores", {})}
					title="Ver Beneficios"
					style={styles.button}
					isPending={false}
				/>
				) : (
					<Alert text={credetialsPending} style={{ marginBottom:50 }} />
				)
		) : (
			<DidiServiceButton
				onPress={() => getCredentials(dni)}
				title={strings.semillas.getCredentials}
				style={showButtonStyle}
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
							PRESTADORES_FEATURE &&
							this.renderButton()
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
		allSemillasCredentials: state.allSemillasCredentials,
		credentials: state.credentials
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
