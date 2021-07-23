import React, { Component } from "react";
import { View } from "react-native";
import { SemillasIdentityModel } from "../../../model/SemillasIdentity";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { didiConnect } from "../../../store/store";
import { getPhoneNumber, getEmail } from "../../../util/specialCredentialsHelpers";
import strings from "../../resources/strings";
import KeyValueText from "../../util/KeyValueText";
const { nameBeneficiario, birthDate, dniBeneficiario, relationship } = strings.specialCredentials.Semillas.keys;
const { name, phone, dni, birth, character, mail } = strings.semillas.steps.second.labels;

type BeneficiarioGlobalProps = {
	activeSpecialCredentials: SpecialCredentialMap;
};

type BeneficiarioInternalProps = {
	item: SemillasIdentityModel;
};

type BeneficiarioProps = BeneficiarioGlobalProps & BeneficiarioInternalProps;

type BeneficiarioState = {
	phoneNumber: string;
	email: string;
};

class Beneficiario extends Component<BeneficiarioProps, BeneficiarioState> {
	constructor(props: BeneficiarioProps) {
		super(props);
		this.state = {
			phoneNumber: getPhoneNumber(this.props.activeSpecialCredentials),
			email: getEmail(this.props.activeSpecialCredentials)
		};
	}

	render() {
		const { item } = this.props;
		const { phoneNumber, email } = this.state;
		return (
			<View style={{ paddingVertical: 10 }}>
				<KeyValueText name={name} value={item[nameBeneficiario]} />
				<KeyValueText name={dni} value={item[dniBeneficiario]} />
				<KeyValueText name={birth} value={item[birthDate]} />
				<KeyValueText name={character} value={item[relationship]} />
				<KeyValueText name={mail} value={email} />
				<KeyValueText name={phone} value={phoneNumber} />
			</View>
		);
	}
}

export default didiConnect(
	Beneficiario,
	(state): BeneficiarioGlobalProps => ({
		activeSpecialCredentials: state.activeSpecialCredentials
	})
);
