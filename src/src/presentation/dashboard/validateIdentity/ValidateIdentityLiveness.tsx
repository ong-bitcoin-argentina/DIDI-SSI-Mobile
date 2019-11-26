import { TakePictureResponse } from "react-native-camera/types";

import strings from "../../resources/strings";

import { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";
import {
	ValidateIdentityTakePhotoProps,
	ValidateIdentityTakePhotoScreen,
	ValidateIdentityTakePhotoState
} from "./ValidateIdentityTakePhoto";

export interface ValidateIdentityLivenessNavigation {
	DashboardRoot: {};
}
export type ValidateIdentityLivenessProps = ValidateIdentityTakePhotoProps;
type ValidateIdentityLivenessState = ValidateIdentityTakePhotoState;

export class ValidateIdentityLivenessScreen extends ValidateIdentityTakePhotoScreen<
	ValidateIdentityLivenessProps,
	ValidateIdentityLivenessState,
	ValidateIdentityLivenessNavigation
> {
	constructor(props: ValidateIdentityLivenessProps) {
		super(props);
		this.state = {
			isScanning: false
		};
	}

	protected didTakePhoto(data: TakePictureResponse): void {
		this.navigate("DashboardRoot", {});
	}

	protected explanationProps(): Omit<ValidateIdentityExplanationProps, "buttonAction"> {
		return {
			title: strings.validateIdentity.explainLiveness.step,
			header: strings.validateIdentity.explainLiveness.header,
			description: strings.validateIdentity.explainLiveness.description,
			image: require("../../resources/images/validateIdentityExplainLiveness.png")
		};
	}
}
