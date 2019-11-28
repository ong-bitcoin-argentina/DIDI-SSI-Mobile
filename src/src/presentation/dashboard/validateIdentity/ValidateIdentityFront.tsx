import { TakePictureResponse } from "react-native-camera/types";

import strings from "../../resources/strings";

import { ValidateIdentityBackProps } from "./ValidateIdentityBack";
import { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";
import {
	ValidateIdentityTakePhotoProps,
	ValidateIdentityTakePhotoScreen,
	ValidateIdentityTakePhotoState
} from "./ValidateIdentityTakePhoto";

export interface ValidateIdentityFrontNavigation {
	ValidateIdentityBack: ValidateIdentityBackProps;
}
export type ValidateIdentityFrontProps = ValidateIdentityTakePhotoProps;
type ValidateIdentityFrontState = ValidateIdentityTakePhotoState;

export class ValidateIdentityFrontScreen extends ValidateIdentityTakePhotoScreen<
	ValidateIdentityFrontProps,
	ValidateIdentityFrontState,
	ValidateIdentityFrontNavigation
> {
	constructor(props: ValidateIdentityFrontProps) {
		super(props);
		this.state = {
			isScanning: false
		};
	}

	protected didTakePhoto(data: TakePictureResponse): void {
		this.navigate("ValidateIdentityBack", {});
	}

	protected explanationProps(): Omit<ValidateIdentityExplanationProps, "buttonAction"> {
		return {
			title: strings.validateIdentity.explainFront.step,
			header: strings.validateIdentity.explainFront.header,
			description: strings.validateIdentity.explainFront.description,
			image: require("../../resources/images/validateIdentityExplainFront.png")
		};
	}
}
