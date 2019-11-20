import React from "react";
import { StyleSheet, Text } from "react-native";
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
			title: strings.validateIdentity.explainSelfie.title,
			header: strings.validateIdentity.explainSelfie.header,
			description: <Text style={styles.description}>{strings.validateIdentity.explainSelfie.description}</Text>,
			image: require("../../resources/images/validateIdentityExplainSelfie.png")
		};
	}
}

const styles = StyleSheet.create({
	description: {
		fontSize: 16,
		textAlign: "center"
	}
});
