import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import { ValidateIdentityBackProps } from "./ValidateIdentityBack";
import ValidateIdentityExplanation from "./ValidateIdentityExplanation";
import { ValidateIdentityTakePhoto } from "./ValidateIdentityTakePhoto";

export interface ValidateIdentityFrontNavigation {
	ValidateIdentityBack: ValidateIdentityBackProps;
}
export interface ValidateIdentityFrontProps {}

export class ValidateIdentityFrontScreen extends NavigationEnabledComponent<
	ValidateIdentityFrontProps,
	{},
	ValidateIdentityFrontNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityTakePhoto
				onPictureTaken={data =>
					this.navigate("ValidateIdentityBack", {
						front: data
					})
				}
				explanation={startCamera => (
					<ValidateIdentityExplanation
						title={strings.validateIdentity.explainFront.step}
						header={strings.validateIdentity.explainFront.header}
						description={strings.validateIdentity.explainFront.description}
						image={require("../../resources/images/validateIdentityExplainFront.png")}
						buttonAction={startCamera}
					/>
				)}
			/>
		);
	}
}
