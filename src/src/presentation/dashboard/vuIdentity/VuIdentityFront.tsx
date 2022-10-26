import React, { Fragment } from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { BarcodeType } from "../common/DidiCamera";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import strings from "../../resources/strings";

import { VuIdentityBackProps } from "./VuIdentityBack";
import { VuDidiCamera } from "../common/VuDidiCamera";
import { VuIdentityTakePhoto } from './VuIdentityTakePhoto';
import { didiConnect } from '../../../store/store';
import { createVerificationVU } from '../../../services/vuSecurity/createVerification';
import { ActiveDid } from '../../../store/reducers/didReducer';
import { DataAlert } from "../../common/DataAlert";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export interface VuIdentityFrontNavigation {
	VuIdentityBack: VuIdentityBackProps;
	ValidateID: {}
}

interface VuIdentityFrontState {
	documentData?: DocumentBarcodeData;
	loading: false,
}

interface IdentityProps {
	did: ActiveDid,
}
interface IdentityScreenDispatchProps {
	vuSecurityData: (operationId: number, userName: string) => void;
}


export type VuIdentityFrontProps = IdentityProps & IdentityScreenDispatchProps;
class VuIdentityFrontScreen extends NavigationEnabledComponent<
	VuIdentityFrontProps,
	VuIdentityFrontState,
	VuIdentityFrontNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.vuIdentity.header);

	constructor(props: VuIdentityFrontProps) {
		super(props);
		this.state = {
			loading: false
		};
	}

	async componentDidMount() {
		const { did } = this.props;
		const result = await createVerificationVU(did);
		if (result.status === "error") {
			DataAlert.alert(strings.vuIdentity.failure.retryButton + ' Nuevamente',
				'El Proceso para la validación de su identidad. \n\nSe encuentra fuera de servicio momentáneamente');
			this.navigate("DashboardHome", {});
		} else {
			this.props.vuSecurityData(result.data.operationId, result.data.userName);
			this.setState({ loading: true })
		}
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

	render() {
		const explainFront = strings.validateIdentity.explainFront;
		const confirmationText = this.state.documentData ? explainFront.barcodeConfirmation.found : explainFront.barcodeConfirmation.notFound
		return (
			<Fragment>
				{this.state.loading ?
					<VuIdentityTakePhoto
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
						confirmation={`${explainFront.confirmation}\n\n${confirmationText}`}
						image={require("../../resources/images/validateIdentityExplainFront.png")}
						camera={(onLayout, reticle, onPictureTaken) => (
							<VuDidiCamera
								VuFront={true}
								onCameraLayout={onLayout}
								cameraLandscape={true}
								onPictureTaken={onPictureTaken}
								onBarcodeScanned={(data, type) => this.onBarcodeScanned(data, type)}
								cameraButtonDisabled={
									this.state.documentData === undefined ? strings.vuIdentity.explainFront.blocked : false
								}
								cameraOutputsBase64Picture={true}
							>
								{reticle}
							</VuDidiCamera>
						)}
						onPictureAccepted={(data, reset) => {
							if (data.uri == 'goBack') {
								this.navigate("ValidateID", {}, reset
								)
							} else {
								this.navigate(
									"VuIdentityBack",
									{
										documentData: this.state.documentData as DocumentBarcodeData,
										front: data
									},
									reset
								)
							}
						}
						}
					/> :
					<View style={styles.loading}>
						<ActivityIndicator size="large" color='#5E49E2' />
					</View>
				}
			</Fragment>
		);
	}
}

const connected = didiConnect(
	VuIdentityFrontScreen,
	(state): IdentityProps => ({
		did: state.did.activeDid
	}),
	(dispatch): IdentityScreenDispatchProps => ({
		vuSecurityData: (operationId: number, userName: string) =>
			dispatch({ type: "VU_SECURITY_DATA_SET", state: { operationId: `${operationId}`, userName } }),
	})
);

export { connected as VuIdentityFrontScreen };

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
