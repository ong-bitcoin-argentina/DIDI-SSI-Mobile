import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import { ValidateIdentitySubmitProps } from "./ValidateIdentitySubmit";
import { ValidateIdentityTakePhoto } from "./ValidateIdentityTakePhoto";

export interface ValidateIdentitySelfieNavigation {
	ValidateIdentitySubmit: ValidateIdentitySubmitProps;
}
export interface ValidateIdentitySelfieProps {
	documentData: DocumentBarcodeData;
	front: { uri: string };
	back: { uri: string };
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
				photoWidth={600}
				photoHeight={720}
				targetWidth={600}
				targetHeight={720}
				cameraLocation="front"
				header={{
					title: strings.validateIdentity.explainSelfie.step,
					header: strings.validateIdentity.explainSelfie.header
				}}
				description={strings.validateIdentity.explainSelfie.description}
				confirmation={strings.validateIdentity.explainSelfie.confirmation}
				image={require("../../resources/images/validateIdentityExplainSelfie.png")}
				onPictureTaken={(data, reset) =>
					this.navigate(
						"ValidateIdentitySubmit",
						{
							...this.props,
							selfie: data
						},
						reset
					)
				}
			/>
		);
	}
}
