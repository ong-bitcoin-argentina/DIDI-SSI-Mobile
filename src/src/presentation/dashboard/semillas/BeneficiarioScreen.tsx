import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View, Picker, Modal, Alert } from "react-native";

import { didiConnect } from "../../../store/store";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Beneficiario from "./Beneficiario";
import { getFullName, getDniBeneficiario, getSemillasIdentitiesData } from "../../../util/semillasHelpers";
import { SemillasIdentityModel } from "../../../model/SemillasIdentity";
import { CredentialDocument } from "didi-sdk";
import { RequestFinishedProps } from "./RequestFinishedScreen";
import colors from "../../resources/colors";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { PrestadorModel } from "../../../model/Prestador";
import { getEmail, getPhoneNumber } from "../../../util/specialCredentialsHelpers";
import { getClient } from "../../../services/internal/withDidiServerClient";
import SemillasLogo from "../../resources/images/sem-logo.svg";
const { title, description, detail, modalTitle } = strings.semillas.steps.second;

const { Small, Tiny, Normal } = DidiText.Explanation;

export type BeneficiarioProps = {
	activePrestador?: PrestadorModel;
	customEmail?: string;
};

interface BeneficiarioScreenStateProps {
	allSemillasCredentials?: CredentialDocument[];
	activeSpecialCredentials: SpecialCredentialMap;
}

type BeneficiarioScreenState = {
	identityCredentials: SemillasIdentityModel[];
	selected: SemillasIdentityModel;
	selectedName?: string;
	modalVisible: boolean;
	shareInProgress: boolean;
	email: string;
	phoneNumber: string;
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
		const identityCredentials = getSemillasIdentitiesData(props.allSemillasCredentials);
		const selected = identityCredentials[0];
		this.state = {
			identityCredentials,
			selected,
			selectedName: getFullName(selected),
			modalVisible: false,
			shareInProgress: false,
			email: getEmail(props.activeSpecialCredentials),
			phoneNumber: getPhoneNumber(props.activeSpecialCredentials)
		};
	}

	handleChangePicker = (selectedName: string, index: number) => {
		const selected = this.state.identityCredentials[index];
		this.setState({
			selectedName,
			selected
		});
	};

	toggleModal = () => {
		const { modalVisible } = this.state;
		this.setState({ modalVisible: !modalVisible });
	};

	getShareableData() {
		const { dniBeneficiario, nameBeneficiario, birthDate, cert } = strings.specialCredentials.Semillas.keys;
		const { selected } = this.state;
		return {
			[cert]: selected[cert],
			[dniBeneficiario]: selected[dniBeneficiario],
			[nameBeneficiario]: selected[nameBeneficiario],
			[birthDate]: selected[birthDate]
		};
	}

	shareData = () => {
		this.setState({ shareInProgress: true });
		const { email, phoneNumber } = this.state;
		const data = {
			email,
			phoneNumber,
			...this.getShareableData()
		};
		getClient()
			.shareData(data)
			.then(result => {
				this.setState({ shareInProgress: false });
				this.finish();
			})
			.catch(err => {
				console.log(err);
				Alert.alert(strings.semillas.errorShareData);
			});
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
		const { bottomButton, header, view } = commonStyles.benefit;
		const { modal } = commonStyles;
		const { selected, selectedName, modalVisible, email, phoneNumber } = this.state;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<View style={view}>
					<Small style={header}>{title}</Small>
					<Tiny style={styles.description}>{description}</Tiny>

					<View style={styles.pickerContainer}>
						<Small>{detail}</Small>

						<Picker
							selectedValue={selectedName}
							style={{ height: 50 }}
							itemStyle={{ textAlign: "center" }}
							onValueChange={(value, index) => this.handleChangePicker(value, index)}
							mode="dialog"
						>
							{this.state.identityCredentials.map(credentialData => (
								<Picker.Item
									label={getFullName(credentialData)}
									value={getDniBeneficiario(credentialData)}
									key={getDniBeneficiario(credentialData)}
								/>
							))}
						</Picker>
					</View>

					<DidiServiceButton
						onPress={this.openModal}
						title={strings.general.next.toUpperCase()}
						style={bottomButton}
						isPending={false}
					/>
				</View>

				<Modal animationType="fade" transparent={true} visible={modalVisible}>
					<View style={modal.centeredView}>
						<View style={[modal.view, styles.modalView]}>
							<View style={styles.modalImage}>
								<Small style={{ alignSelf: "center", fontWeight: "bold", fontSize: 18 }}>
									{selected["Nombre Beneficiario"]}
								</Small>
								<SemillasLogo viewBox="0 0 128 39" width={100} height={58} style={styles.logo} />
							</View>
							<Small style={styles.modalTitle}>{modalTitle}:</Small>

							<Beneficiario item={selected} email={email} phoneNumber={phoneNumber} />

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
									isPending={this.state.shareInProgress}
								/>
							</View>
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
		allSemillasCredentials: state.allSemillasCredentials,
		activeSpecialCredentials: state.activeSpecialCredentials
	})
);

const styles = StyleSheet.create({
	pickerContainer: {
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: colors.border.light,
		borderRadius: 6,
		marginTop: 20,
		marginBottom: 40
	},
	textStyle: {
		color: colors.label.text,
		fontWeight: "bold",
		textAlign: "center"
	},
	description: {
		textAlign: "left",
		marginTop: 12
	},
	logo: {
		height: 40,
		// marginVertical: 10,
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
		fontSize: 16,
		textAlign: "left"
	}
});
