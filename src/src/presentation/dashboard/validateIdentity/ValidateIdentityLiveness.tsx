import React from "react";
import { TakePictureResponse } from "react-native-camera/types";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import ValidateIdentityExplanation from "./ValidateIdentityExplanation";
import { ValidateIdentitySubmitProps } from "./ValidateIdentitySubmit";
import { ValidateIdentityTakePhoto } from "./ValidateIdentityTakePhoto";

export interface ValidateIdentityLivenessNavigation {
	ValidateIdentitySubmit: ValidateIdentitySubmitProps;
}
export interface ValidateIdentityLivenessProps {
	documentData: DocumentBarcodeData;
	front: { uri: string };
	back: { uri: string };
	selfie: { uri: string };
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
				photoWidth={600}
				photoHeight={720}
				targetWidth={600}
				targetHeight={720}
				cameraLocation="front"
				header={{
					title: strings.validateIdentity.explainLiveness.step,
					header: strings.validateIdentity.explainLiveness.header
				}}
				description={strings.validateIdentity.explainLiveness.description}
				confirmation={strings.validateIdentity.explainLiveness.confirmation}
				image={require("../../resources/images/validateIdentityExplainLiveness.png")}
				onPictureTaken={(data, reset) => this.navigate("ValidateIdentitySubmit", this.props, reset)}
			/>
		);
	}
}
