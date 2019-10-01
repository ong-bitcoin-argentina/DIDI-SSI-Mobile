import React from "react";
import { Text, StyleSheet } from "react-native";
import { TakePictureResponse } from "react-native-camera/types";

import { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";
import { ValidateIdentitySelfieProps } from "./ValidateIdentitySelfie";
import {
	ValidateIdentityTakePhotoProps,
	ValidateIdentityTakePhotoState,
	ValidateIdentityTakePhotoScreen
} from "./ValidateIdentityTakePhoto";

import strings from "../../resources/strings";

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
			image: require("../resources/images/validateIdentityExplainBack.png")
		};
	}
}

const styles = StyleSheet.create({
	description: {
		fontSize: 16,
		textAlign: "center"
	}
});
