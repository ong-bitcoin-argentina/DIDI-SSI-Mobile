import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { BarcodeType, DidiCamera } from "../common/DidiCamera";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import { VuIdentityTakePhoto } from './VuIdentityTakePhoto';
import { ValidateIdentitySelfieProps } from '../validateIdentity/ValidateIdentitySelfie';

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
        
		return (
			<VuIdentityTakePhoto
				photoWidth={1800}
				photoHeight={1200}
				targetWidth={1500}
				targetHeight={1000}
				cameraLandscape={true}
				header={{
					title: strings.validateIdentity.explainBack.step,
					header: strings.validateIdentity.explainBack.header
				}}
				description={strings.validateIdentity.explainBack.description}
				confirmation={strings.validateIdentity.explainBack.confirmation}
				image={require("../../resources/images/validateIdentityExplainBack.png")}
				camera={(onLayout, reticle, onPictureTaken) => (
					<DidiCamera
						onCameraLayout={onLayout}
						cameraLandscape={true}
						cameraButtonDisabled={
							(this.props.documentData ?? this.state.documentData) === undefined
								? strings.validateIdentity.explainBack.blocked
								: false
						}
						onPictureTaken={onPictureTaken}
						onBarcodeScanned={(data, type) => this.onBarcodeScanned(data, type)}
					>
						{reticle}
					</DidiCamera>
				)}
				onPictureAccepted={(data, reset) =>
					this.navigate(
						"ValidateIdentitySelfie",
						{
							front: this.props.front,
							documentData: (this.props.documentData ?? this.state.documentData)!,
							back: data
						},
						reset
					)
				}
			/>
		);
	}

	private onBarcodeScanned(data: string, type: BarcodeType) {
		if (type !== "pdf417") {
			return;
		}
		const documentData = DocumentBarcodeData.fromPDF417(data);
		if (documentData) {
			this.setState({ documentData });
		}
	}
}
