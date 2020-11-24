import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View, Picker, Modal, Alert, ScrollView } from "react-native";
import { didiConnect } from "../../../store/store";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Beneficiario from "./Beneficiario";
import {
	getFullName,
	getDniBeneficiario,
	getSemillasIdentitiesData,
	getSemillasBenefitCredential,
	getSemillasIdentitiesCredentials
} from "../../../util/semillasHelpers";
import { SemillasIdentityModel } from "../../../model/SemillasIdentity";
import { CredentialDocument, ClaimData } from "didi-sdk";
import { RequestFinishedProps } from "./RequestFinishedScreen";
import CustomPicker from "../../common/CustomPicker";
import colors from "../../resources/colors";
import { PrestadorModel } from "../../../model/Prestador";
import { getEmail, getPhoneNumber } from "../../../util/specialCredentialsHelpers";
import { getClient } from "../../../services/internal/withDidiServerClient";
import SemillasLogo from "../../resources/images/sem-logo.svg";
import CustomPicker from "../../common/CustomPicker";

const { title, description, modalTitle } = strings.semillas.steps.second;
const { keys } = strings.specialCredentials.Semillas;

const { Small, Tiny } = DidiText.Explanation;

export type BeneficiarioProps = {
	activePrestador?: PrestadorModel;
	customEmail?: string;
};

interface BeneficiarioScreenStateProps {
	// activeSemillasCredentials?: CredentialDocument[];
	benefitCredential: CredentialDocument;
	email: string;
	identitiesCredentials: CredentialDocument[];
	identitiesData: SemillasIdentityModel[];
	phoneNumber: string;
	sharePrefix: string;
	did: string;
}

type BeneficiarioScreenState = {
	identityCredential?: CredentialDocument;
	modalVisible: boolean;
	selected?: ClaimData;
	selectedValue?: string;
	shareInProgress: boolean;
};

type BeneficiarioScreenInternalProps = BeneficiarioScreenStateProps & BeneficiarioProps;

export interface BeneficiarioScreenNavigation {
	RequestFinished: RequestFinishedProps;
}

class BeneficiarioScreen extends NavigationEnabledComponent<
	BeneficiarioScreenInternalProps,
	BeneficiarioScreenState,
	BeneficiarioScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.detailBarTitle);

	constructor(props: BeneficiarioScreenInternalProps) {
		super(props);
		const firstHolder = props.identitiesCredentials.find(item => item.data[keys.relationship] === "titular");
		const identityCredential = firstHolder ?? props.identitiesCredentials[0];
		const selected = identityCredential.data;
		this.state = {
			identityCredential,
			selected,
			selectedValue: getDniBeneficiario(selected),
			modalVisible: false,
			shareInProgress: false
		};
	}

	handleChangePicker = (selectedValue: string, index: number) => {
		const identityCredential = this.props.identitiesCredentials[index];
		const selected = identityCredential.data;
		this.setState({
			selectedValue,
			selected,
			identityCredential
		});
	};

	toggleModal = () => {
		const { modalVisible } = this.state;
		this.setState({ modalVisible: !modalVisible });
	};

	getLinkJWT = () => {
		const { benefitCredential, sharePrefix } = this.props;
		const { identityCredential } = this.state;
		return `${sharePrefix}/${identityCredential?.jwt},${benefitCredential.jwt}`;
	};

	shareData = async () => {
		this.setState({ shareInProgress: true });
		const { email, phoneNumber, activePrestador, did } = this.props;
		const { selected } = this.state;
		const data = {
			did,
			email,
			phone: phoneNumber,
			providerId: activePrestador?.id,
			customProviderEmail: this.props.customEmail,
			dni: selected && selected[keys.dniBeneficiario],
			viewerJWT: this.getLinkJWT()
		};
		try {
			await getClient().shareData(data);
			this.finish();
		} catch (e) {
			Alert.alert("Error", e.message);
		}
		this.setState({ shareInProgress: false });
	};

	finish = () => {
		const { activePrestador, customEmail } = this.props;
		const propToPass = customEmail ? { customEmail } : { activePrestador };
		this.toggleModal();
		this.navigate("RequestFinished", propToPass);
	};

	openModal = () => {
		this.setState({ modalVisible: true });
	};

	render() {
		const { header, view } = commonStyles.benefit;
		const { modal } = commonStyles;
		const { selected, selectedValue, modalVisible, shareInProgress } = this.state;
		const { email, phoneNumber, identitiesData, activePrestador, customEmail } = this.props;
		const prestadorName = customEmail ? customEmail : activePrestador?.name;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<View style={view}>
					<Small style={header} adjustsFontSizeToFit>
						{title}
					</Small>

					<CustomPicker selectedValue={selectedValue} onValueChange={this.handleChangePicker} style={{ flex: 0.25 }}>
						{identitiesData.map((credentialData, index) => (
							<Picker.Item label={getFullName(credentialData)} value={getDniBeneficiario(credentialData)} key={index} />
						))}
					</CustomPicker>

					<Tiny style={styles.description}>{description}</Tiny>

					<DidiServiceButton onPress={this.openModal} title={strings.general.next.toUpperCase()} isPending={false} />
				</View>

				<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={this.toggleModal}>
					<View style={modal.centeredView}>
						<View style={[modal.view, styles.modalView]}>
							<ScrollView>
								<View style={styles.modalImage}>
									<SemillasLogo viewBox="0 0 128 39" width={100} height={58} style={styles.logo} />
								</View>
								<Small style={styles.modalTitle}>{modalTitle(prestadorName)}:</Small>

								<Beneficiario item={selected} email={email} phoneNumber={phoneNumber} />

								<Small style={{ color: colors.greenSemillas, alignSelf: "flex-start" }}>
									{strings.semillas.benefitCredentialActive}
								</Small>

								<View style={modal.footer}>
									<DidiServiceButton
										onPress={this.toggleModal}
										title={strings.general.cancel}
										style={modal.smallButton}
										isPending={false}
									/>

									<DidiServiceButton
										onPress={this.shareData}
										title={strings.general.share}
										style={[modal.smallButton, { backgroundColor: colors.greenSemillas }]}
										isPending={shareInProgress}
									/>
								</View>
							</ScrollView>
						</View>
					</View>
				</Modal>
			</Fragment>
		);
	}
}

export default didiConnect(
	BeneficiarioScreen,
	(state): BeneficiarioScreenStateProps => ({
		benefitCredential: getSemillasBenefitCredential(state.activeSemillasCredentials),
		did: state.did.activeDid?.did(),
		email: getEmail(state.activeSpecialCredentials),
		identitiesCredentials: getSemillasIdentitiesCredentials(state.activeSemillasCredentials),
		identitiesData: getSemillasIdentitiesData(state.activeSemillasCredentials),
		phoneNumber: getPhoneNumber(state.activeSpecialCredentials),
		sharePrefix: state.serviceSettings.sharePrefix
	})
);

const styles = StyleSheet.create({
	textStyle: {
		color: colors.label.text,
		fontWeight: "bold",
		textAlign: "center"
	},
	description: {
		textAlign: "center",
		fontSize: 16,
		marginBottom: 80
	},
	logo: {
		height: 50,
		alignSelf: "flex-end"
	},
	modalImage: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "center",
		alignItems: "center",
		width: "100%"
	},
	modalView: {
		height: 380
	},
	modalTitle: {
		fontSize: 17,
		textAlign: "left"
	}
});
