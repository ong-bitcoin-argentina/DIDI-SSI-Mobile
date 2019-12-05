import React from "react";
import { TakePictureResponse } from "react-native-camera/types";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import ValidateIdentityExplanation from "./ValidateIdentityExplanation";
import { ValidateIdentitySelfieProps } from "./ValidateIdentitySelfie";
import { ValidateIdentityTakePhoto } from "./ValidateIdentityTakePhoto";

export interface ValidateIdentityBackNavigation {
	ValidateIdentitySelfie: ValidateIdentitySelfieProps;
}
export interface ValidateIdentityBackProps {
	front: TakePictureResponse;
}

export class ValidateIdentityBackScreen extends NavigationEnabledComponent<
	ValidateIdentityBackProps,
	{},
	ValidateIdentityBackNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityTakePhoto
				onPictureTaken={data =>
					this.navigate("ValidateIdentitySelfie", {
						front: this.props.front,
						back: data
					})
				}
				explanation={startCamera => (
					<ValidateIdentityExplanation
						title={strings.validateIdentity.explainBack.step}
						header={strings.validateIdentity.explainBack.header}
						description={strings.validateIdentity.explainBack.description}
						image={require("../../resources/images/validateIdentityExplainBack.png")}
						buttonAction={startCamera}
					/>
				)}
			/>
		);
	}
}
