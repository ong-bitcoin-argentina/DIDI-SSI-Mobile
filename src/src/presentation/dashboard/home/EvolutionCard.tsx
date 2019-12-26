import React from "react";

import CredentialCard from "../common/CredentialCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { SpecialCredentialFlag } from "../../../model/SpecialCredential";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

export interface EvolutionCardProps {
	credentials: CredentialDocument[];
}

export class EvolutionCard extends React.Component<EvolutionCardProps> {
	render() {
		const str = strings.dashboard.evolution;
		const specialValue = (val: SpecialCredentialFlag["type"]): string => {
			return this.props.credentials.find(sp => sp.specialFlag?.type === val)
				? str.validationState.yes
				: str.validationState.no;
		};
		return (
			<CredentialCard
				icon=""
				image={require("../../resources/images/precentageSample.png")}
				category={str.category}
				title={str.title}
				subTitle="16.06.2019"
				color={colors.primary}
				data={[
					{ label: str.validationIntro, value: "" },
					{ label: str.validations.cellPhone, value: specialValue("PhoneNumberData") },
					{ label: str.validations.email, value: specialValue("EmailData") },
					{ label: str.validations.document, value: specialValue("PersonalData") }
				]}
				columns={1}
			/>
		);
	}
}
