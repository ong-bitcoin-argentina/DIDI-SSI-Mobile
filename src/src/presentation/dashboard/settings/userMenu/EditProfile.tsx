import { Identity, EthrDID, CredentialDocument } from "@proyecto-didi/app-sdk";
import React, { Fragment } from "react";
import { ScrollView, StatusBar, StyleSheet, TextInputProps, View, Clipboard, ToastAndroid } from "react-native";
import { readFile, DocumentDirectoryPath, exists } from "react-native-fs";
import ImageResizer from "react-native-image-resizer";

import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiButton from "../../../util/DidiButton";
import DropdownMenu from "../../../util/DropdownMenu";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { DidiCamera } from "../../common/DidiCamera";
import { DidiReticleCamera } from "../../common/DidiReticleCamera";

import { Validations } from "../../../../model/Validations";
import { ValidatedIdentity, ValidationState } from "../../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../../store/store";
import colors from "../../../resources/colors";
import strings from "../../../resources/strings";
import themes from "../../../resources/themes";
import { addressDataStructure, personalDataStructure } from "../userData/ProfileInputDescription";
import { UserHeading } from "../userData/UserHeading";
import { DidiText } from "../../../util/DidiText";
import commonStyles from "../../../resources/commonStyles";
import { SettingsScreenProps } from "../SettingsScreen";
import { sendProfileImage } from "../../../../services/user/sendProfileImage";
import { createToken } from "../../../util/appRouter";

export type EditProfileProps = {};
interface EditProfileStateProps {
	did: EthrDID | null;
	identity: ValidatedIdentity;
	isPersonalDataApproved: boolean;
	isAddressApproved: boolean;
	credentials: CredentialDocument[];
}
interface EditProfileDispatchProps {
	saveIdentity: (state: Identity) => void;
	sendProfileImage: (token: string, image: any) => void;
}
type EditProfileInternalProps = EditProfileProps & EditProfileStateProps & EditProfileDispatchProps;

interface EditProfileState {
	identity: Identity;
	cameraActive: boolean;
}

export interface EditProfileNavigation {
	Settings: SettingsScreenProps;
}

const { Small, Emphasis } = DidiText.Explanation;
const serviceKeySendProfileImage = "sendProfileImage";

class EditProfileScreen extends NavigationEnabledComponent<
	EditProfileInternalProps,
	EditProfileState,
	EditProfileNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButton<EditProfileNavigation, "Settings">(
		strings.userData.editProfile.barTitle,
		"settings",
		"Settings"
	);

	constructor(props: EditProfileInternalProps) {
		super(props);
		this.state = {
			cameraActive: false,
			identity: {
				address: {},
				personalData: {}
			}
		};
	}

	private canPressContinueButton(): boolean {
		return (
			(!this.state.identity.personalData.firstNames ||
				Validations.isName(this.state.identity.personalData.firstNames)) &&
			(!this.state.identity.personalData.lastNames || Validations.isName(this.state.identity.personalData.lastNames)) &&
			(!this.state.identity.personalData.document ||
				Validations.isDocumentNumber(this.state.identity.personalData.document)) &&
			(!this.state.identity.personalData.nationality ||
				Validations.isNationality(this.state.identity.personalData.nationality))
		);
	}

	private setIdentityMerging(identity: Partial<Identity>) {
		this.setState({ identity: Identity.merge(identity, this.state.identity) });
	}

	private textInputPropsFor(
		keyboardType: TextInputProps["keyboardType"],
		state?: ValidationState,
		value?: string | null
	): TextInputProps {
		const props: TextInputProps = {
			keyboardType
		};

		props.editable = state !== ValidationState.Approved;
		if (props.editable ?? true) {
			props.style = { backgroundColor: colors.editableSetting };
			props.defaultValue = value ? value : "";
		} else {
			props.style = { color: colors.textFaded, fontStyle: "italic" };
			props.defaultValue = value === null ? strings.credentialCard.valueNotAvailable : value ?? "--";
		}

		return props;
	}
	
	personalInformation(){
		try {
			const information = this.props.credentials.find(function(element: any) {
				return element.data.Credencial === 'Datos Personales';
			});
			Object.assign(information?.data,{email:this.props.identity.email?.value})
			Object.assign(information?.data,{cellPhone:this.props.identity.cellPhone?.value})
			return information;
		} catch (error) {
			return {
				data : {
						cellPhone: "",
						email: "",
						"Nombre(s)": "",
						"Apellido(s)": "",
						Nacionalidad: "",
						"Numero de Identidad": ""
					}
			} 
		}
	}

	private renderPersonInputs() {
		const PersonalInformation = this.personalInformation();
		return (
			<View style={styles.dropdownContents}>
				{personalDataStructure.order.map(key => {
					const struct = personalDataStructure.structure[key];
					const value = PersonalInformation?.data[key];		
					return this.renderKeyValue(key, struct.name, value);
				})}
			</View>
		);
	}

	renderKeyValue(key: any, label: string, value?: string | null) {
		return (
			<View style={styles.keyValueContainer} key={key}>
				<Small style={{ color: colors.textLight, fontSize: 13 }}>{label}</Small>
				<Small style={{ textAlign: "left" }}>{value ? value : "N/A"}</Small>
			</View>
		);
	}

	addressUser(){
		try {
			return this.props.credentials.find(function(element: any):any {
				return element.data.Credencial === 'Domicilio Legal';
			});
		} catch (error) {
			return  {
				data:{
				"Ciudad/Barrio": "",
				"Departamento/Municipalidad": "",
				Domicilio: "",
				País: "",
				Provincia: "",
			}}	
		}
	}

	private renderAddressInputs() {
		const LegalAddressUser = this.addressUser();
		return (
			<View style={styles.dropdownContents}>
				{addressDataStructure.order.map(key => {
					const struct = addressDataStructure.structure[key];
					const value = LegalAddressUser?.data[key];		
					return this.renderKeyValue(key, struct.name, value);
				})}
			</View>
		);
	}

	handleCopyDid = () => {
		Clipboard.setString(this.props.did?.did() || "");
		ToastAndroid.show("Copiado", ToastAndroid.SHORT);
	};

	private renderEditView() {
		const { did } = this.props;
		return (
			<ScrollView style={{ backgroundColor: colors.lighterBackground }} contentContainerStyle={{ paddingBottom: 20 }}>
				<UserHeading user={this.props.identity.id} onImageEditTap={() => this.setState({ cameraActive: true })} />

				<DropdownMenu label={personalDataStructure.name} approved={this.props.isPersonalDataApproved}>
					{this.renderPersonInputs()}
				</DropdownMenu>

				<DropdownMenu label={addressDataStructure.name} approved={this.props.isAddressApproved}>
					{this.renderAddressInputs()}
				</DropdownMenu>

				<View style={styles.didSection}>
					<Emphasis style={{ color: colors.textLight }}>Identidad activa - DID:</Emphasis>
					<Small>{did && did.did ? did.did() : ""}</Small>
					<DidiButton
						title="Copiar DID"
						style={[commonStyles.button.inverted, styles.copyButton]}
						titleStyle={{ color: colors.primary }}
						onPress={this.handleCopyDid}
						small
					/>
				</View>
			</ScrollView>
		);
	}

	private renderCameraView() {
		return (
			<DidiReticleCamera
				photoWidth={300}
				photoHeight={300}
				targetWidth={300}
				targetHeight={300}
				reticleShape="circle"
				camera={(onLayout, reticle, onPictureTaken) => (
					<DidiCamera cameraLocation="front" onCameraLayout={onLayout} onPictureTaken={onPictureTaken}>
						{reticle}
					</DidiCamera>
				)}
				cameraLandscape={false}
				onPictureCropped={pic => this.onPictureTaken(pic)}
			/>
		);
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				{this.state.cameraActive ? this.renderCameraView() : this.renderEditView()}
			</Fragment>
		);
	}

	getToken = async () => {
		return this.props.did && this.props.did.did ? await createToken(this.props.did) : null;
	};

	private async onPictureTaken(pic: { uri: string }) {
		const resizedImageUrl = await ImageResizer.createResizedImage(
			pic.uri,
			300,
			300,
			"JPEG",
			80,
			0,
			DocumentDirectoryPath
		);

		const token = await this.getToken();
		const fileExists = await exists(resizedImageUrl.path);
		if (token && fileExists) {
			this.props.sendProfileImage(token, {
				uri: resizedImageUrl.uri,
				name: resizedImageUrl.name,
				type: "image/jpeg"
			});
		}

		const data = await readFile(pic.uri, "base64");
		this.setIdentityMerging({ image: { mimetype: "image/jpeg", data } });
		this.setState({ cameraActive: false });
		this.editProfile();
	}

	private editProfile() {
		this.props.saveIdentity(this.state.identity);
		this.goBack();
	}
}

const connected = didiConnect(
	EditProfileScreen,
	(state): EditProfileStateProps => ({
		did: state.did.activeDid,
		identity: state.validatedIdentity,
		isPersonalDataApproved: state.isPersonalDataApproved,
		isAddressApproved: state.validatedIdentity?.address?.state === ValidationState.Approved,
		credentials: state.credentials
	}),
	(dispatch): EditProfileDispatchProps => ({
		saveIdentity: (identity: Identity) => dispatch({ type: "IDENTITY_PATCH", value: identity }),
		sendProfileImage: (token, image) => dispatch(sendProfileImage(serviceKeySendProfileImage, token, image))
	})
);

export { connected as EditProfileScreen };

const styles = StyleSheet.create({
	area: {
		backgroundColor: colors.background,
		flex: 1,
		alignItems: "stretch"
	},
	inputs: {
		backgroundColor: colors.backgroundSeparator,
		paddingTop: 30,
		paddingBottom: 30,
		paddingRight: 30
	},
	button: {
		marginBottom: 30
	},
	dropdownContents: {
		padding: 16,
		paddingHorizontal: 20,
		backgroundColor: colors.white,
		alignItems: "flex-start"
	},
	copyButton: {
		borderRadius: 40,
		marginTop: 10
	},
	didSection: {
		paddingVertical: 22,
		paddingHorizontal: 28,
		alignItems: "center"
	},
	keyValueContainer: {
		alignItems: "flex-start",
		marginBottom: 18
	}
});
