import { TakePictureResponse } from "react-native-camera/types";

import strings from "../../resources/strings";

import { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";
import { ValidateIdentityLivenessProps } from "./ValidateIdentityLiveness";
import {
	ValidateIdentityTakePhotoProps,
	ValidateIdentityTakePhotoScreen,
	ValidateIdentityTakePhotoState
} from "./ValidateIdentityTakePhoto";

export interface ValidateIdentitySelfieNavigation {
	ValidateIdentityLiveness: ValidateIdentityLivenessProps;
}
export type ValidateIdentitySelfieProps = ValidateIdentityTakePhotoProps;
type ValidateIdentitySelfieState = ValidateIdentityTakePhotoState;

export class ValidateIdentitySelfieScreen extends ValidateIdentityTakePhotoScreen<
	ValidateIdentitySelfieProps,
	ValidateIdentitySelfieState,
	ValidateIdentitySelfieNavigation
> {
	constructor(props: ValidateIdentitySelfieProps) {
		super(props);
		this.state = {
			isScanning: false
		};
	}

	protected didTakePhoto(data: TakePictureResponse): void {
		this.navigate("ValidateIdentityLiveness", {});
	}

	protected explanationProps(): Omit<ValidateIdentityExplanationProps, "buttonAction"> {
		return {
			title: strings.validateIdentity.explainSelfie.step,
			header: strings.validateIdentity.explainSelfie.header,
			description: strings.validateIdentity.explainSelfie.description,
			image: require("../../resources/images/validateIdentityExplainSelfie.png")
		};
	}
}
