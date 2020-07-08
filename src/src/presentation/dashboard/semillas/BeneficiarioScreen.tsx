import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View, Picker, Modal } from "react-native";

import { didiConnect } from "../../../store/store";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Beneficiario from "./Beneficiario";
import { PrestadorModel } from "./Prestador";
import { getFullName, getDniBeneficiario, getSemillasIdentitiesData } from "../../../util/semillasHelpers";
import { SemillasIdentityModel } from "../../../model/SemillasIdentity";
import { CredentialDocument } from "didi-sdk";
import { RequestFinishedProps } from "./RequestFinishedScreen";
import colors from "../../resources/colors";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";

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
			modalVisible: false
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

	finish = () => {
		const { activePrestador } = this.props;
		this.toggleModal();
		this.navigate("RequestFinished", { activePrestador });
	};

	openModal = () => {
		this.setState({ modalVisible: true });
	};

	render() {
		const { bottomButton, header, view } = commonStyles.benefit;
		const { modal } = commonStyles;
		const { selected, selectedName, modalVisible } = this.state;
		const { activePrestador } = this.props;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<View style={view}>
					<DidiText.Explanation.Small style={header}>{strings.semillas.steps.second.title}</DidiText.Explanation.Small>

					<View style={styles.pickerContainer}>
						<DidiText.Explanation.Small>{strings.semillas.steps.second.detail}</DidiText.Explanation.Small>

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
						<View style={modal.view}>
							<DidiText.Explanation.Small style={{ fontSize: 13 }}>
								{strings.semillas.steps.second.modalTitle}
							</DidiText.Explanation.Small>

							<Beneficiario item={selected} />

							<View style={modal.footer}>
								<DidiServiceButton
									onPress={this.toggleModal}
									title={strings.general.cancel}
									style={modal.smallButton}
									isPending={false}
								/>

								<DidiServiceButton
									onPress={this.finish}
									title={strings.general.share}
									style={modal.smallButton}
									isPending={false}
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
		marginTop: 30,
		marginBottom: 50
	},
	textStyle: {
		color: colors.label.text,
		fontWeight: "bold",
		textAlign: "center"
	}
});
