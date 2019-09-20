import React from "react";
import { Text } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import ValidateIdentityExplanation from "./ValidateIdentityExplanation";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import ContentImage from "../resources/images/validateIdentityWhat.svg";

export interface ValidateIdentityExplainWhatNavigation {
	// ValidateIdentityHow: ValidateIdentityExplainHowNavigation;
}
export type ValidateIdentityExplainWhatProps = {};
type ValidateIdentityExplainWhatState = {};

export class ValidateIdentityExplainWhatScreen extends NavigationEnabledComponent<
	ValidateIdentityExplainWhatProps,
	ValidateIdentityExplainWhatState,
	ValidateIdentityExplainWhatNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityExplanation
				title="Bienvenida Lili M."
				header="¿Que es validación de identidad?"
				description={
					<Text>
						Es un simple proceso mediante el cual vas a poder confirmar que vos sos quien decis ser. Y con ello, podrás
						acceder a todos los servicios de la <Text style={{ fontWeight: "bold" }}>APP</Text>.
					</Text>
				}
				image={ContentImage}
				buttonText="Siguiente"
			/>
		);
	}
}
