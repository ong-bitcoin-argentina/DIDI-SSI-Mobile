import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";
import { DashboardScreenProps } from "../home/Dashboard";
import DidiButton from "../../util/DidiButton";
import colors from "../../resources/colors";
import { DidiText } from "../../util/DidiText";
import RondasLogo from "../../resources/images/rondasSplash.svg";
import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import { AuthModal } from "../common/AuthModal";
import { createToken, successfullyLogged } from "../../util/appRouter";
import { userHasRonda } from "../../../services/user/userHasRonda";


export type RoundsScreenProps = {};
export type RoundsScreenState = {
	showModal: boolean;
};
export interface RoundsScreenNavigation {
	DashboardHome: DashboardScreenProps;
}
const { Small, Emphasis } = DidiText.Explanation;

interface RoundsScreenStateProps {
	did: ActiveDid;
	hasRonda: Boolean
}

interface RoundsScreenDispatchProps {
	setRondaAccount: (hasAccount : Boolean) => void
}

const RoundsScreen = class RoundsScreen extends NavigationEnabledComponent<
	RoundsScreenProps & RoundsScreenStateProps & RoundsScreenDispatchProps,
	RoundsScreenState,
	RoundsScreenNavigation
> {

	constructor(props:RoundsScreenProps & RoundsScreenStateProps ){
		super(props);
		this.state = {
			showModal: false
		};
	}

	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<RoundsScreenNavigation, "DashboardHome">(
		strings.tabNames.rounds,
		"DashboardHome",
		{}
	);
	
	componentDidMount = async () => {
		const { address, hasRonda } = this.props;
		console.log("hasRonda", hasRonda)
		if (!hasRonda){
			const response = await userHasRonda(address);
			const hasAccount = response._tag ? true : false;
			this.props.setRondaAccount(hasAccount);
		} 
	}

	showAuthModal = async () => {
		this.setState({ showModal: true });
	}

	goRonda = async () => {
		const { address } = this.props.did;
	
		createToken(address).then(async (verification:string) => {
			this.setState({ showModal: false }, () => successfullyLogged(verification));
		})
	}

	permissionDenied = async () => this.setState({ showModal: false });

	showConfirmation = () => {
		if (!this.state) return null;
		const { showModal } = this.state;
		return this.state.showModal ? <AuthModal appName="Ronda" onCancel={this.permissionDenied} onOk={this.goRonda} /> : null;
	}

	render() {
		const { width } = Dimensions.get('window');
		const { hasRonda } = this.props;
		const title = hasRonda ? "Ver mis rondas" : "Accedé a Ronda";
		const subTitle = hasRonda ? "Hacé un seguimiento de tus rondas activas y unite o creá nuevas rondas, juntas, vaquitas o pasanakus de forma fácil y segura." : "Organizá y participá de rondas, juntas, vaquitas o pasanakus de forma fácil y segura.";
		const cta = "Ver Rondas";
		const btnAction = hasRonda ? this.goRonda : this.showAuthModal
		return (
			<DidiScreen>
				<View style={styles.centered}>
					<RondasLogo/>
				</View>
				<Emphasis style={styles.modalText}>{title}</Emphasis>
				<Small style={styles.modalText}>{subTitle}</Small>
				<View style={{ marginBottom: 15 }}>
					<DidiButton
						onPress={btnAction}
						title={cta}
					/>
					{this.showConfirmation()}
				</View>
			</DidiScreen>
		);
	}
}

const connect = didiConnect(
	RoundsScreen,
	(state): RoundsScreenStateProps => ({
		did: state.did.activeDid,
		hasRonda: state.authApps.ronda,
	}),
	(dispatch): RoundsScreenDispatchProps => ({
		setRondaAccount: (hasAccount: Boolean) => dispatch({ type: "SET_RONDA_ACCOUNT", value:hasAccount })
	})
	
);

export { connect as RoundsScreen };

const styles = StyleSheet.create({
	centered: {
		alignItems: 'center',
		justifyContent: 'center',
	},
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
	renaperButton: {
		marginTop: 20,
		paddingVertical: 26
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
	},
	smallText: {
		fontSize: 14,
		color: colors.textLight
	},
	modalText: {
		fontSize: 17,
		textAlign: "center"
	}
});
