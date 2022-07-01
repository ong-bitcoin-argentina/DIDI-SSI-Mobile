import { CredentialDocument } from "@proyecto-didi/app-sdk";
import React, { Fragment }  from "react";
import { StatusBar, StyleSheet,ScrollView, View, Modal, Image } from "react-native";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import CoopsolValidationState from "./CoopsolValidationState";
import { validateDniCoopsol } from "../../../services/coopsol/validateDni";

const { Small } = DidiText.Explanation;
const { util } = commonStyles;

const {
	detailBarTitle,
	detailFirst,
	detailSecond,
	detailThird,
} = strings.coopsol;
interface CoopsolScreenStateProps {
	coopsolValidationSuccess: boolean,
	coopsolValidation: string | null,
	haveIdentityCredential: boolean;
	didRequested: boolean;
	credentials: CredentialDocument[];
}


interface CoopsolScreenDispatchProps {
	updateCoopsolStatus:(status: string | null) => void;
}
export interface CoopsolScreenNavigation {
	DashboardHome: {};
	Prestadores: {};
	ValidateID: {};
	ValidateCoopsolID: {};
}

interface CoopsolScreenState {
	dni: string;
	modalVisible: boolean;
	coopsolValidationLoading: boolean;
	pendingCredentials: boolean;
}



type CoopsolScreenInternalProps = CoopsolScreenStateProps & CoopsolScreenDispatchProps;

class CoopsolScreen extends NavigationEnabledComponent<
    CoopsolScreenInternalProps,
	CoopsolScreenState,
	CoopsolScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
	CoopsolScreenNavigation,
		"DashboardHome"
	>(detailBarTitle, "DashboardHome", {});
	
	constructor(props: CoopsolScreenInternalProps) {
		super(props);
		this.state = {
			dni: "",
			modalVisible: false,
			coopsolValidationLoading: false,
			pendingCredentials: false
		};
	}

	async componentDidMount(){
		this.setState((state) => ({
			pendingCredentials:  !state.pendingCredentials, 
		}));
		const { credentials, coopsolValidation } = this.props;
		// We look into the credentials to check if there's an identity credential with DNI
		const credential = credentials.find(
			cred => cred.title === strings.specialCredentials.PersonalData.title && cred.data["Numero de Identidad"]
		);
	
		if (credential && credential.data["Numero de Identidad"]) {
			this.setState({
				dni: credential.data["Numero de Identidad"].toString()
			});

			if( coopsolValidation === null ){
				const result = await validateDniCoopsol(credential.jwt);
				this.props.updateCoopsolStatus(result.status);
			}
		}
		this.setState((state) => ({
			pendingCredentials:  !state.pendingCredentials, 
		}));
		
	}

	toggleModal = () => {
		this.setState({
			modalVisible: !this.state.modalVisible
		});
	};

	goToVuSecurityValidation = () => {
		this.toggleModal();
		this.navigate("ValidateID", {});
	};

	goToCoopsolValidation = () => {
		this.toggleModal();
		this.navigate("ValidateCoopsolID", {});
	};

	openModal = () => {
		this.setState({ modalVisible: true });
	};

	renderButtonWantCredentials() {
		return (
			<DidiServiceButton
				onPress={this.openModal}
				title={strings.coopsol.getCredentials}
				style={styles.button}
				isPending={this.state.pendingCredentials}
			/>
		);
	}

	render() {

		const { coopsolValidationLoading } = this.state;
		return (
			<Fragment>

				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<ScrollView contentContainerStyle={commonStyles.view.scrollCentered}>
					<Image style={styles.logo} source={require("../../resources/images/coopsolPNG.png")} />
					<View style={{ marginBottom: 28 }}>
						<Small style={[util.paragraphMd,{textAlign:'left', marginVertical:'3%'}]}>{detailFirst}</Small>
						<Small style={[util.paragraphMd,{textAlign:'left', marginVertical:'3%'}]}>{detailSecond}</Small>
						<Small style={[util.paragraphMd,{textAlign:'left',marginVertical:'3%'}]}>{detailThird}</Small>
					</View>
					<View style={{ marginBottom: 20 }}>
						{
						this.renderButtonWantCredentials()
						}
					</View>
				</ScrollView>
 			
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={this.toggleModal}
				>
					<CoopsolValidationState
						goToVuSecurityValidation={this.goToVuSecurityValidation}
						goToCoopsolValidation={this.goToCoopsolValidation}
						onCancel={this.toggleModal}
						isLoading={coopsolValidationLoading}
					/>
				</Modal>
			</Fragment>
		);
	}
}

export default didiConnect(
	CoopsolScreen,
	(state): CoopsolScreenStateProps => ({
		coopsolValidationSuccess: state.validateCoopsolDni === 'SUCCESS',
		coopsolValidation: state.validateCoopsolDni,
		credentials: state.credentials,
		didRequested: state.did.didRequested,
		haveIdentityCredential: state.credentials.find(cred =>  cred.title === strings.specialCredentials.PersonalData.title ) !== undefined,
	}),
	(dispatch): CoopsolScreenDispatchProps => ({
		updateCoopsolStatus: (status: string | null) => dispatch({ type: "VALIDATE_COOPSOL_DNI_SET", state: status }),	
	})
);


const styles = StyleSheet.create({
	body: {
		width: "100%"
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
		paddingHorizontal: 30
	},
	buttonText: {
		fontSize: 16
	},
	logo: {
		height: 120,
		marginBottom: 20,
		resizeMode: "contain"

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
