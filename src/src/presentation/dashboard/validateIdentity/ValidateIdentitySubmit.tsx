import React from "react";
import { Image, Text, View } from "react-native";

import { delayed } from "../../../services/common/delayed";
import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import commonStyles from "../../resources/commonStyles";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { DocumentBarcodeData } from "../../../model/DocumentBarcodeData";
import { isPendingService } from "../../../services/ServiceStateStore";
import { checkValidateDni } from "../../../services/user/checkValidateDni";
import { validateDni } from "../../../services/user/validateDni";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

export interface ValidateIdentitySubmitProps {
	documentData: DocumentBarcodeData;
	front: { uri: string };
	back: { uri: string };
	selfie: { uri: string };
}
interface ValidateIdentitySubmitStateProps {
	validateIdentityPending: boolean;
}
interface ValidateIdentitySubmitDispatchProps {
	validateIdentity: (
		barcodeData: DocumentBarcodeData,
		front: { uri: string },
		back: { uri: string },
		selfie: { uri: string }
	) => void;
}
type ValidateIdentitySubmitInnerProps = ValidateIdentitySubmitProps &
	ValidateIdentitySubmitStateProps &
	ValidateIdentitySubmitDispatchProps;

const serviceKey = "ValidateIdentity";

class ValidateIdentitySubmitScreen extends NavigationEnabledComponent<ValidateIdentitySubmitInnerProps, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<DidiScreen>
				<DidiText.ValidateIdentity.Title>{strings.validateIdentity.submit.header}</DidiText.ValidateIdentity.Title>
				<DidiText.ValidateIdentity.Congrats>
					{strings.validateIdentity.submit.congrats}
				</DidiText.ValidateIdentity.Congrats>

				<View>
					<Text>DNI: {this.props.documentData.dni}</Text>
					<Text>Genero: {this.props.documentData.gender}</Text>
					<Text>Nombre(s): {this.props.documentData.firstNames}</Text>
					<Text>Apellido(s): {this.props.documentData.lastNames}</Text>
					<Text>Fecha de Nacimiento: {this.props.documentData.birthDate}</Text>
					<Text>Numero de tramite: {this.props.documentData.tramitId}</Text>
				</View>

				<View style={{ justifyContent: "space-around", flexDirection: "row" }}>
					<Image style={commonStyles.image.image} width={160} height={100} source={{ uri: this.props.front.uri }} />
					<Image style={commonStyles.image.image} width={160} height={100} source={{ uri: this.props.back.uri }} />
				</View>
				<Image style={commonStyles.image.image} width={100} height={120} source={{ uri: this.props.selfie.uri }} />

				<DidiText.ValidateIdentity.Reminder>
					{strings.validateIdentity.submit.reminder}
				</DidiText.ValidateIdentity.Reminder>

				<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.goToRoot()} />
				<DidiServiceButton
					title={strings.validateIdentity.submit.buttonText}
					onPress={() =>
						this.props.validateIdentity(this.props.documentData, this.props.front, this.props.back, this.props.selfie)
					}
					isPending={this.props.validateIdentityPending}
				/>
			</DidiScreen>
		);
	}
}

const connected = didiConnect(
	ValidateIdentitySubmitScreen,
	(state): ValidateIdentitySubmitStateProps => ({
		validateIdentityPending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): ValidateIdentitySubmitDispatchProps => ({
		validateIdentity: async (
			barcodeData: DocumentBarcodeData,
			front: { uri: string },
			back: { uri: string },
			selfie: { uri: string }
		) => {
			dispatch(validateDni(serviceKey, barcodeData, { front, back, selfie }));
			dispatch(delayed("_checkValidateDni", { seconds: 30 }, checkValidateDni));
		}
	})
);

export { connected as ValidateIdentitySubmitScreen };
