import { Identity } from "didi-sdk";
import React, { Fragment } from "react";
import { ScrollView, StatusBar, StyleSheet, TextInputProps, View } from "react-native";

import { assertUnreachable } from "../../../../util/assertUnreachable";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiButton from "../../../util/DidiButton";
import DidiTextInput from "../../../util/DidiTextInput";
import DropdownMenu from "../../../util/DropdownMenu";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { Validations } from "../../../../model/Validations";
import { ValidatedIdentity, ValidationState } from "../../../../store/selector/combinedIdentitySelector";
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

export interface EditProfileNavigation {}

class EditProfileScreen extends NavigationEnabledComponent<EditProfileInternalProps, Identity, EditProfileNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.userData.editProfile.barTitle);

	constructor(props: EditProfileInternalProps) {
		super(props);
		this.state = {
			address: {},
			personalData: {}
		};
	}

	private canPressContinueButton(): boolean {
		return (
			(!this.state.personalData.firstNames || Validations.isName(this.state.personalData.firstNames)) &&
			(!this.state.personalData.lastNames || Validations.isName(this.state.personalData.lastNames)) &&
			(!this.state.personalData.document || Validations.isDocumentNumber(this.state.personalData.document)) &&
			(!this.state.personalData.nationality || Validations.isNationality(this.state.personalData.nationality))
		);
	}

	private setStateMerging<Key extends keyof Identity>(key: Key, merge: Partial<Identity[Key]>) {
		this.setState(Identity.merge({ personalData: {}, address: {}, [key]: merge }, this.state));
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

	renderPersonInputs() {
		return (
			<View style={styles.dropdownContents}>
				{personalDataStructure.order.map(key => {
					const struct = personalDataStructure.structure[key];
					const id = key === "cellPhone" || key === "email" ? null : this.props.identity.personalData[key];
					return (
						<DidiTextInput
							key={key}
							description={struct.name}
							placeholder=""
							textInputProps={{
								onChangeText: text => this.setStateMerging("personalData", { [key]: text }),
								...this.textInputPropsFor(struct.keyboardType, id?.state, id?.value)
							}}
						/>
					);
				})}
			</View>
		);
	}

	renderAddressInputs() {
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
								onChangeText: text => this.setStateMerging("address", { [key]: text }),
								...this.textInputPropsFor(struct.keyboardType, state, value)
							}}
						/>
					);
				})}
			</View>
		);
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<ScrollView>
					<UserHeadingComponent user={this.props.identity.id} profileImage={this.state.image} />

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
			</Fragment>
		);
	}

	private editProfile() {
		this.props.saveIdentity(this.state);
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
