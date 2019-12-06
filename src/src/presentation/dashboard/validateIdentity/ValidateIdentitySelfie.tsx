import React from "react";
import { TakePictureResponse } from "react-native-camera/types";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import ValidateIdentityExplanation from "./ValidateIdentityExplanation";
import { ValidateIdentityLivenessProps } from "./ValidateIdentityLiveness";
import { ValidateIdentityTakePhoto } from "./ValidateIdentityTakePhoto";

export interface ValidateIdentitySelfieNavigation {
	ValidateIdentityLiveness: ValidateIdentityLivenessProps;
}
export interface ValidateIdentitySelfieProps {
	documentData: DocumentBarcodeData;
	front: TakePictureResponse;
	back: TakePictureResponse;
}

export class ValidateIdentitySelfieScreen extends NavigationEnabledComponent<
	ValidateIdentitySelfieProps,
	{},
	ValidateIdentitySelfieNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityTakePhoto
				cameraLocation="front"
				onPictureTaken={data =>
					this.navigate("ValidateIdentityLiveness", {
						...this.props,
						selfie: data
					})
				}
				explanation={startCamera => (
					<ValidateIdentityExplanation
						title={strings.validateIdentity.explainSelfie.step}
						header={strings.validateIdentity.explainSelfie.header}
						description={strings.validateIdentity.explainSelfie.description}
						image={require("../../resources/images/validateIdentityExplainSelfie.png")}
						buttonAction={startCamera}
					/>
				)}
			/>
		);
	}
}
