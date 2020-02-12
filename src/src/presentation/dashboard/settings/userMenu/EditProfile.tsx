import { Identity } from "didi-sdk";
import React, { Fragment } from "react";
import { ScrollView, StatusBar, StyleSheet, TextInputProps, View } from "react-native";
import { TakePictureResponse } from "react-native-camera";

import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiButton from "../../../util/DidiButton";
import DidiTextInput from "../../../util/DidiTextInput";
import DropdownMenu from "../../../util/DropdownMenu";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { DidiCamera } from "../../common/DidiCamera";

import { Validations } from "../../../../model/Validations";
import {
	ValidatedIdentity,
	ValidationState,
	WithValidationState
} from "../../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../../store/store";
import colors from "../../../resources/colors";
import strings from "../../../resources/strings";
import themes from "../../../resources/themes";
import { addressDataStructure, personalDataStructure } from "../userData/ProfileInputDescription";
import { UserHeadingComponent } from "../userData/UserHeading";

export type EditProfileProps = {};
interface EditProfileStateProps {
	identity: ValidatedIdentity;
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
						/>
					);
				})}
			</View>
		);
	}

	private renderEditView() {
		return (
			<ScrollView>
				<UserHeadingComponent
					user={this.props.identity.id}
					profileImage={this.state.identity.image}
					onImageEditTap={() => this.setState({ cameraActive: true })}
				/>

				<DropdownMenu
					headerContainerStyle={{ backgroundColor: colors.primary }}
					headerTextStyle={{ color: colors.primaryText }}
					style={styles.personalDataDropdown}
					label={personalDataStructure.name}
				>
					{this.renderPersonInputs()}
				</DropdownMenu>

				<DropdownMenu
					headerContainerStyle={{ backgroundColor: colors.primary }}
					headerTextStyle={{ color: colors.primaryText }}
					style={styles.personalDataDropdown}
					label={addressDataStructure.name}
				>
					{this.renderAddressInputs()}
				</DropdownMenu>

				<DidiButton
					onPress={() => {
						this.editProfile();
					}}
					disabled={!this.canPressContinueButton()}
					title={strings.userData.editProfile.saveChanges}
				/>
			</ScrollView>
		);
	}

	private renderCameraView() {
		return (
			<DidiCamera
				cameraLocation="front"
				cameraOutputsBase64Picture={true}
				onPictureTaken={pic => this.onPictureTaken(pic)}
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

	private onPictureTaken(pic: TakePictureResponse) {
		this.setIdentityMerging({ image: { mimetype: "image/jpeg", data: pic.base64! } });
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
		identity: state.validatedIdentity
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
	personalDataDropdown: {
		marginTop: 20,
		marginHorizontal: 10,
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: colors.darkBackground
	},
	dropdownContents: {
		padding: 16,
		backgroundColor: colors.darkBackground
	}
});
