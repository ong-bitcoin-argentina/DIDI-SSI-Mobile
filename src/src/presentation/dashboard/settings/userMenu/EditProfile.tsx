import { Identity, EthrDID } from "didi-sdk";
import React, { Fragment } from "react";
import { ScrollView, StatusBar, StyleSheet, TextInputProps, View, Clipboard } from "react-native";
import { readFile } from "react-native-fs";

import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiButton from "../../../util/DidiButton";
import DidiTextInput from "../../../util/DidiTextInput";
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
import Checkmark from "../../../resources/images/checkmark.svg";
import { addressDataStructure, personalDataStructure } from "../userData/ProfileInputDescription";
import { UserHeadingComponent } from "../userData/UserHeading";
import { DidiText } from "../../../util/DidiText";
import commonStyles from "../../../resources/commonStyles";

export type EditProfileProps = {};
interface EditProfileStateProps {
	did: EthrDID | null;
	identity: ValidatedIdentity;
	isPersonalDataApproved: boolean;
	isAddressApproved: boolean;
}
interface EditProfileDispatchProps {
	saveIdentity: (state: Identity) => void;
}
type EditProfileInternalProps = EditProfileProps & EditProfileStateProps & EditProfileDispatchProps;

interface EditProfileState {
	identity: Identity;
	cameraActive: boolean;
}

export interface EditProfileNavigation {}

const { Small, Emphasis } = DidiText.Explanation;

class EditProfileScreen extends NavigationEnabledComponent<
	EditProfileInternalProps,
	EditProfileState,
	EditProfileNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.userData.editProfile.barTitle);

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

	private renderPersonInputs() {
		return (
			<View style={styles.dropdownContents}>
				{personalDataStructure.order.map(key => {
					const struct = personalDataStructure.structure[key];

					const id =
						key === "cellPhone" || key === "email" ? this.props.identity[key] : this.props.identity.personalData[key];
					const onChangeText = (text: string) =>
						key === "cellPhone" || key === "email"
							? this.setIdentityMerging({ [key]: text })
							: this.setIdentityMerging({ personalData: { [key]: text } });

					return (
						<DidiTextInput
							key={key}
							description={struct.name}
							placeholder=""
							textInputProps={{
								onChangeText,
								...this.textInputPropsFor(struct.keyboardType, id?.state, id?.value)
							}}
							editable={false}
						/>
					);
				})}
			</View>
		);
	}

	private renderAddressInputs() {
		const state = this.props.identity.address.state;
		return (
			<View style={styles.dropdownContents}>
				{addressDataStructure.order.map(key => {
					const struct = addressDataStructure.structure[key];
					const value = this.props.identity.address.value[key];
					return (
						<DidiTextInput
							key={key}
							description={struct.name}
							placeholder=""
							textInputProps={{
								onChangeText: text => this.setIdentityMerging({ address: { [key]: text } }),
								...this.textInputPropsFor(struct.keyboardType, state, value)
							}}
							editable={false}
						/>
					);
				})}
			</View>
		);
	}

	private renderEditView() {
		return (
			<ScrollView style={{ backgroundColor: colors.lighterBackground }} contentContainerStyle={{ paddingBottom: 20 }}>
				<UserHeadingComponent
					user={this.props.identity.id}
					profileImage={this.state.identity.image ?? this.props.identity.image}
					onImageEditTap={() => this.setState({ cameraActive: true })}
				/>

				<DropdownMenu label={personalDataStructure.name} approved={this.props.isPersonalDataApproved}>
					{this.renderPersonInputs()}
				</DropdownMenu>

				<DropdownMenu label={addressDataStructure.name} approved={this.props.isAddressApproved}>
					{this.renderAddressInputs()}
				</DropdownMenu>

				<View style={styles.didSection}>
					<Emphasis style={{ color: colors.textLight }}>Identidad activa - DID:</Emphasis>
					<Small>{this.props.did?.did()}</Small>
					<DidiButton
						title="Copiar DID"
						style={[commonStyles.button.inverted, styles.copyButton]}
						titleStyle={{ color: colors.primary }}
						small
						onPress={() => Clipboard.setString(this.props.did?.did() || "")}
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

	private async onPictureTaken(pic: { uri: string }) {
		const data = await readFile(pic.uri, "base64");
		this.setIdentityMerging({ image: { mimetype: "image/jpeg", data } });
		this.setState({ cameraActive: false });
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
		isAddressApproved: state.validatedIdentity?.address?.state === ValidationState.Approved
	}),
	(dispatch): EditProfileDispatchProps => ({
		saveIdentity: (identity: Identity) => dispatch({ type: "IDENTITY_PATCH", value: identity })
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
		backgroundColor: colors.white
	},
	copyButton: {
		borderRadius: 40,
		marginTop: 10
	},
	didSection: {
		paddingVertical: 22,
		paddingHorizontal: 28,
		alignItems: "center"
	}
});
