import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import { ValidateIdentityExplainHowProps } from "./ValidateIdentityExplainHow";
import ValidateIdentityExplanation from "./ValidateIdentityExplanation";

export interface ValidateIdentityExplainWhatNavigation {
	ValidateIdentityHow: ValidateIdentityExplainHowProps;
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
				header={{
					title: strings.validateIdentity.welcome,
					header: strings.validateIdentity.what.header
				}}
				description={strings.validateIdentity.what.description}
				image={require("../../resources/images/validateIdentityWhat.png")}
				buttonText={strings.validateIdentity.what.buttonText}
				buttonAction={() => this.navigate("ValidateIdentityHow", {})}
			/>
		);
	}
}
