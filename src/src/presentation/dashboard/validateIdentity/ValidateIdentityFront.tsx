import React from "react";
import { Text, StyleSheet } from "react-native";
import { TakePictureResponse } from "react-native-camera/types";

import { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";
import { ValidateIdentityBackProps } from "./ValidateIdentityBack";
import {
	ValidateIdentityTakePhotoProps,
	ValidateIdentityTakePhotoState,
	ValidateIdentityTakePhotoScreen
} from "./ValidateIdentityTakePhoto";

import strings from "../../resources/strings";

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
			title: strings.validateIdentity.explainFront.title,
			header: strings.validateIdentity.explainFront.header,
			description: <Text style={styles.description}>{strings.validateIdentity.explainFront.description}</Text>,
			image: require("../resources/images/validateIdentityExplainFront.png")
		};
	}
}

const styles = StyleSheet.create({
	description: {
		fontSize: 16,
		textAlign: "center"
	}
});
