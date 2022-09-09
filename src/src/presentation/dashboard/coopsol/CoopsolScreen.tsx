import React, { Fragment } from "react";
import { StatusBar, StyleSheet, ScrollView, View, Modal, Image } from "react-native";
import colors from "../../resources/colors";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import CoopsolValidationState from "./CoopsolValidationState";
import { didiConnect } from "../../../store/store";
import { CredentialDocument } from "@proyecto-didi/app-sdk";

const { Small } = DidiText.Explanation;
const { util } = commonStyles;

const {
	detailBarTitle,
	detailFirst,
	detailSecond,
	detailThird,
} = strings.coopsol;


export interface CoopsolScreenNavigation {
	DashboardHome: {};
	Prestadores: {};
	ValidateIdentity: {};
	ValidateCoopsolID: {};
}

interface CoopsolScreenState {
	modalVisible: boolean;
}

interface StoreProps {
	credentials:  CredentialDocument[];
}
interface DispatchProps {
	updateCoopsolStatus: (status: string | null) => void;
}

type Props = StoreProps & DispatchProps;
 class CoopsolScreen extends NavigationEnabledComponent<
 	Props,
	CoopsolScreenState,
	CoopsolScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		CoopsolScreenNavigation,
		"DashboardHome"
	>(detailBarTitle, "DashboardHome", {});

	constructor(props: {}) {
		super(props);
		this.state = {
			modalVisible: false
		};
	}


	toggleModal = () => {
		this.setState({
			modalVisible: !this.state.modalVisible
		});
	};

	goToVuSecurityValidation = () => {
		this.toggleModal();
		this.navigate("ValidateIdentity", {});
	};

	goToCoopsolValidation = () => {
		const {credentials}= this.props;
		const coopsolCredential = credentials.find(
			cred => cred.title === 'Identitaria coopsol'
		);
		if(coopsolCredential)this.props.updateCoopsolStatus('SUCCESS');
		this.toggleModal();
		this.navigate("ValidateCoopsolID", {});
	};

	openModal = () => {
		this.setState({ modalVisible: true });
	};

	render() {
		return (
			<Fragment>

				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<ScrollView contentContainerStyle={commonStyles.view.scrollCentered}>
					<Image style={styles.logo} source={require("../../resources/images/coopsolPNG.png")} />
					<View style={{ marginBottom: 28 }}>
						<Small style={[util.paragraphMd, { textAlign: 'left', marginVertical: '3%' }]}>{detailFirst}</Small>
						<Small style={[util.paragraphMd, { textAlign: 'left', marginVertical: '3%' }]}>{detailSecond}</Small>
						<Small style={[util.paragraphMd, { textAlign: 'left', marginVertical: '3%' }]}>{detailThird}</Small>
					</View>
					<View style={{ marginBottom: 20 }}>
						<DidiServiceButton
							onPress={this.openModal}
							title={strings.coopsol.getCredentials}
							style={styles.button}
							isPending={false}
						/>
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
						isLoading={false}
					/>
				</Modal>
			</Fragment>
		);
	}
}

export default didiConnect(
	CoopsolScreen,
	(state): StoreProps => ({
		credentials: state.credentials,
		
	}),
	(dispatch): DispatchProps => ({
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
