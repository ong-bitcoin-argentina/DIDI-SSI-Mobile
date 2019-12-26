import React from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { BarcodeType } from "../common/DidiCamera";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import { ValidateIdentitySelfieProps } from "./ValidateIdentitySelfie";
import { ValidateIdentityTakePhoto } from "./ValidateIdentityTakePhoto";

export interface ValidateIdentityBackNavigation {
	ValidateIdentitySelfie: ValidateIdentitySelfieProps;
}
export interface ValidateIdentityBackProps {
	documentData?: DocumentBarcodeData;
	front: { uri: string };
}

interface ValidateIdentityBackState {
	documentData?: DocumentBarcodeData;
}

export class ValidateIdentityBackScreen extends NavigationEnabledComponent<
	ValidateIdentityBackProps,
	ValidateIdentityBackState,
	ValidateIdentityBackNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	constructor(props: ValidateIdentityBackProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<ValidateIdentityTakePhoto
				photoWidth={1800}
				photoHeight={1200}
				targetWidth={1500}
				targetHeight={1000}
				cameraLandscape={true}
				cameraButtonDisabled={(this.props.documentData ?? this.state.documentData) === undefined}
				header={{
					title: strings.validateIdentity.explainBack.step,
					header: strings.validateIdentity.explainBack.header
				}}
				description={strings.validateIdentity.explainBack.description}
				confirmation={strings.validateIdentity.explainBack.confirmation}
				image={require("../../resources/images/validateIdentityExplainBack.png")}
				onPictureTaken={(data, reset) =>
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
				onBarcodeScanned={(data, type) => this.onBarcodeScanned(data, type)}
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
