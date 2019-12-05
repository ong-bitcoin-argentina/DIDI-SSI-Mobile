import React from "react";
import { TakePictureResponse } from "react-native-camera/types";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import ValidateIdentityExplanation from "./ValidateIdentityExplanation";
import { ValidateIdentityTakePhoto } from "./ValidateIdentityTakePhoto";

export interface ValidateIdentityLivenessNavigation {
	ValidateIdentitySubmit: ValidateIdentitySubmitProps;
}
export interface ValidateIdentityLivenessProps {
	front: TakePictureResponse;
	back: TakePictureResponse;
	selfie: TakePictureResponse;
}

export class ValidateIdentityLivenessScreen extends NavigationEnabledComponent<
	ValidateIdentityLivenessProps,
	{},
	ValidateIdentityLivenessNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityTakePhoto
				cameraLocation="front"
				onPictureTaken={data => this.navigate("ValidateIdentitySubmit", this.props)}
				explanation={startCamera => (
					<ValidateIdentityExplanation
						title={strings.validateIdentity.explainLiveness.step}
						header={strings.validateIdentity.explainLiveness.header}
						description={strings.validateIdentity.explainLiveness.description}
						image={require("../../resources/images/validateIdentityExplainLiveness.png")}
						buttonAction={startCamera}
					/>
				)}
			/>
		);
	}
}
