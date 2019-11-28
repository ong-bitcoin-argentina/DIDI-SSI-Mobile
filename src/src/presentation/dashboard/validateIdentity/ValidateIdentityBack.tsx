import { TakePictureResponse } from "react-native-camera/types";

import strings from "../../resources/strings";

import { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";
import { ValidateIdentitySelfieProps } from "./ValidateIdentitySelfie";
import {
	ValidateIdentityTakePhotoProps,
	ValidateIdentityTakePhotoScreen,
	ValidateIdentityTakePhotoState
} from "./ValidateIdentityTakePhoto";

export interface ValidateIdentityBackNavigation {
	ValidateIdentitySelfie: ValidateIdentitySelfieProps;
}
export type ValidateIdentityBackProps = ValidateIdentityTakePhotoProps;
type ValidateIdentityBackState = ValidateIdentityTakePhotoState;

export class ValidateIdentityBackScreen extends ValidateIdentityTakePhotoScreen<
	ValidateIdentityBackProps,
	ValidateIdentityBackState,
	ValidateIdentityBackNavigation
> {
	constructor(props: ValidateIdentityBackProps) {
		super(props);
		this.state = {
			isScanning: false
		};
	}

	protected didTakePhoto(data: TakePictureResponse): void {
		this.navigate("ValidateIdentitySelfie", {});
	}

	protected explanationProps(): Omit<ValidateIdentityExplanationProps, "buttonAction"> {
		return {
			title: strings.validateIdentity.explainBack.step,
			header: strings.validateIdentity.explainBack.header,
			description: strings.validateIdentity.explainBack.description,
			image: require("../../resources/images/validateIdentityExplainBack.png")
		};
	}
}
