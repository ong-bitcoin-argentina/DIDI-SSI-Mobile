import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import { ValidateIdentityExplainHowProps } from "./ValidateIdentityExplainHow";
import ValidateIdentityExplanation from "./ValidateIdentityExplanation";
import { DashboardScreenProps } from "../home/Dashboard";
import { store } from '../../../store/normalizedStore';

export interface ValidateIdentityExplainWhatNavigation {
	ValidateIdentityHow: ValidateIdentityExplainHowProps;
	DashboardHome: DashboardScreenProps;
}
export type ValidateIdentityExplainWhatProps = {};
type ValidateIdentityExplainWhatState = {};

export class ValidateIdentityExplainWhatScreen extends NavigationEnabledComponent<
	ValidateIdentityExplainWhatProps,
	ValidateIdentityExplainWhatState,
	ValidateIdentityExplainWhatNavigation
> {

	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<ValidateIdentityExplainWhatNavigation, "DashboardHome">(
        strings.validateIdentity.header,
        "DashboardHome",
        {}
    );
	async componentDidMount() {
		console.log("Verificacion de store ---- desde ValidateIdentityExplainWhat >");
		console.log(await store.getState());
	}

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
