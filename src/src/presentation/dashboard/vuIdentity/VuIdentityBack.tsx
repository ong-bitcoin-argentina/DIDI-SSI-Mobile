import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import { VuIdentityTakePhoto } from './VuIdentityTakePhoto';
import { ValidateIdentitySelfieProps } from '../validateIdentity/ValidateIdentitySelfie';
import { VuDidiCamera } from '../common/VuDidiCamera';

export interface VuIdentityBackNavigation {
	ValidateIdentitySelfie: ValidateIdentitySelfieProps;
}
export interface VuIdentityBackProps {
	documentData?: DocumentBarcodeData;
	front: { uri: string };
}

interface VuIdentityBackState {
	documentData?: DocumentBarcodeData;
}

export class VuIdentityBackScreen extends NavigationEnabledComponent<
	VuIdentityBackProps,
	VuIdentityBackState,
	VuIdentityBackNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.vuIdentity.header);

	constructor(props: VuIdentityBackProps) {
		super(props);
		this.state = {};
	}
	render() {
        const explainBack = strings.vuIdentity.explainBack;
		return (
			<VuIdentityTakePhoto
			photoWidth={1800}
			photoHeight={1200}
			targetWidth={1500}
			targetHeight={1000}
			cameraLandscape={true}
			header={{
				title: explainBack.step,
				header: explainBack.header
			}}
			description={explainBack.description}
			confirmation={`${explainBack.confirmation}`}
				image={require("../../resources/images/validateIdentityExplainBack.png")}
				camera={(onLayout, reticle, onPictureTaken) => (
					<VuDidiCamera
					    VuBack={true}
						onCameraLayout={onLayout}
						cameraLandscape={true} 
						onPictureTaken={onPictureTaken} 
						cameraOutputsBase64Picture={true}
					>
						{reticle}
					</VuDidiCamera>
				)}
				onPictureAccepted={(data, reset) =>{
					if (data.uri !== 'goBack') {
						this.navigate(
							"VuIdentitySelfie",
							{
								front: this.props.front,
								documentData: (this.props.documentData ?? this.state.documentData)!,
								back: data
							},
							reset
						)	
					} else {
						reset()
					}
				}
				}
			/>
		);
	}

	
}
