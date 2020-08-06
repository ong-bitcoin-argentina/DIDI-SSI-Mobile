import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { SemillasIdentityModel } from "../../../model/SemillasIdentity";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { didiConnect } from "../../../store/store";
import { getPhoneNumber, getEmail } from "../../../util/specialCredentialsHelpers";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../resources/colors";
import { DidiText } from "../../util/DidiText";
import strings from "../../resources/strings";
const { nameBeneficiario, birthdate, dniBeneficiario, relationship, cert } = strings.specialCredentials.Semillas.keys;
const { Small } = DidiText;

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
		const { value } = styles;
		return (
			<ScrollView>
				<View style={{ paddingVertical: 10 }}>
					<View>
						<Small style={value}>{item[cert]}</Small>
						<Small style={value}>{item[nameBeneficiario]}</Small>
						<Small style={value}>{item[dniBeneficiario]}</Small>
						<Small style={value}>{item[birthdate]}</Small>
						<Small style={value}>{item[relationship]}</Small>
						<Small style={value}>{email}</Small>
						<Small style={value}>{phoneNumber}</Small>
					</View>
				</View>
			</ScrollView>
		);
	}
}

export default didiConnect(
	Beneficiario,
	(state): BeneficiarioGlobalProps => ({
		activeSpecialCredentials: state.activeSpecialCredentials
	})
);

const styles = StyleSheet.create({
	value: {
		marginTop: 4,
		fontSize: 17,
		color: colors.darkText
	}
});
