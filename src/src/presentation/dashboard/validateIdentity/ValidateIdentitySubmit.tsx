import React from "react";
import { Image, Text, View } from "react-native";

import { delayed } from "../../../services/common/delayed";
import { DidiScrollScreen } from "../../common/DidiScreen";
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
		const documentDataKeys = ["dni", "gender", "firstNames", "lastNames", "birthDate", "tramitId"] as const;

		return (
			<DidiScrollScreen>
				<DidiText.ValidateIdentity.Congrats>
					{strings.validateIdentity.submit.congrats}
				</DidiText.ValidateIdentity.Congrats>

				<View>
					{documentDataKeys.map(key => (
						<Text key={key}>
							{strings.validateIdentity.submit.items[key]}: {this.props.documentData[key]}
						</Text>
					))}
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
			</DidiScrollScreen>
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
