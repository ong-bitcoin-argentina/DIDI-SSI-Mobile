import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { BarcodeType, DidiCamera } from "../common/DidiCamera";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import { ValidateIdentityBackProps } from "./ValidateIdentityBack";
import { ValidateIdentityTakePhoto } from "./ValidateIdentityTakePhoto";

export interface ValidateIdentityFrontNavigation {
	ValidateIdentityBack: ValidateIdentityBackProps;
}
export interface ValidateIdentityFrontProps {}

interface ValidateIdentityFrontState {
	documentData?: DocumentBarcodeData;
}

export class ValidateIdentityFrontScreen extends NavigationEnabledComponent<
	ValidateIdentityFrontProps,
	ValidateIdentityFrontState,
	ValidateIdentityFrontNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	constructor(props: ValidateIdentityFrontProps) {
		super(props);
		this.state = {};
	}

	render() {
		const explainFront = strings.validateIdentity.explainFront;
		return (
			<ValidateIdentityTakePhoto
				photoWidth={1800}
				photoHeight={1200}
				targetWidth={1500}
				targetHeight={1000}
				cameraLandscape={true}
				header={{
					title: explainFront.step,
					header: explainFront.header
				}}
				description={explainFront.description}
				confirmation={`${explainFront.confirmation}\n\n${
					this.state.documentData ? explainFront.barcodeConfirmation.found : explainFront.barcodeConfirmation.notFound
				}`}
				image={require("../../resources/images/validateIdentityExplainFront.png")}
				camera={(onLayout, reticle, onPictureTaken) => (
					<DidiCamera
						onCameraLayout={onLayout}
						cameraLandscape={true}
						onPictureTaken={onPictureTaken}
						onBarcodeScanned={(data, type) => this.onBarcodeScanned(data, type)}
					>
						{reticle}
					</DidiCamera>
				)}
				onPictureAccepted={(data, reset) =>
					this.navigate(
						"ValidateIdentityBack",
						{
							documentData: this.state.documentData!,
							front: data
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
