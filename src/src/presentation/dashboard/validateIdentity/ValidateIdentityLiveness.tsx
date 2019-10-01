import React from "react";
import { Text, StyleSheet } from "react-native";
import { TakePictureResponse } from "react-native-camera/types";

import { ValidateIdentityExplanationProps } from "./ValidateIdentityExplanation";
import {
	ValidateIdentityTakePhotoProps,
	ValidateIdentityTakePhotoState,
	ValidateIdentityTakePhotoScreen
} from "./ValidateIdentityTakePhoto";

import strings from "../../resources/strings";

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
			title: strings.validateIdentity.explainLiveness.title,
			header: strings.validateIdentity.explainLiveness.header,
			description: <Text style={styles.description}>{strings.validateIdentity.explainLiveness.description}</Text>,
			image: require("../resources/images/validateIdentityExplainLiveness.png")
		};
	}
}

const styles = StyleSheet.create({
	description: {
		fontSize: 16,
		textAlign: "center"
	}
});
