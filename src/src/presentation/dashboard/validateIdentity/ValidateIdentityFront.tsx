import React from "react";
import { StyleSheet, Text } from "react-native";
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
			title: strings.validateIdentity.explainFront.title,
			header: strings.validateIdentity.explainFront.header,
			description: <Text style={styles.description}>{strings.validateIdentity.explainFront.description}</Text>,
			image: require("../../resources/images/validateIdentityExplainFront.png")
		};
	}
}

const styles = StyleSheet.create({
	description: {
		fontSize: 16,
		textAlign: "center"
	}
});
