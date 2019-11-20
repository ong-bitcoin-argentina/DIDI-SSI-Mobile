import React from "react";
import { StyleSheet, Text } from "react-native";
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
			title: strings.validateIdentity.explainBack.title,
			header: strings.validateIdentity.explainBack.header,
			description: <Text style={styles.description}>{strings.validateIdentity.explainBack.description}</Text>,
			image: require("../../resources/images/validateIdentityExplainBack.png")
		};
	}
}

const styles = StyleSheet.create({
	description: {
		fontSize: 16,
		textAlign: "center"
	}
});
