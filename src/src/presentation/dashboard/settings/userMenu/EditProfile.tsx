import React, { Fragment } from "react";
import { ScrollView, StatusBar, StyleSheet, TextInputProps, View } from "react-native";

import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiButton from "../../../util/DidiButton";
import DidiTextInput from "../../../util/DidiTextInput";
import DropdownMenu from "../../../util/DropdownMenu";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { Identity, PersonalData } from "../../../../model/Identity";
import { ValidatedIdentity, ValidationState } from "../../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../../store/store";
import Validator from "../../../access/helpers/validator";
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
			visual: {},
			personalData: {}
		};
	}

	private canPressContinueButton(): boolean {
		return (
			(!this.state.personalData.fullName || Validator.isName(this.state.personalData.fullName)) &&
			(!this.state.personalData.document || Validator.isDocumentNumber(this.state.personalData.document)) &&
			(!this.state.personalData.nationality || Validator.isNationality(this.state.personalData.nationality))
		);
	}

	private setStateMerging<Key extends keyof Identity>(key: Key, merge: Partial<Identity[Key]>) {
		this.setState({ ...this.state, [key]: { ...this.state[key], ...merge } });
	}

	private textInputPropsFor(key: keyof PersonalData, keyboardType: TextInputProps["keyboardType"]): TextInputProps {
		const props: TextInputProps = {
			keyboardType,
			onChangeText: text => this.setStateMerging("personalData", { [key]: text })
		};

		const value = this.props.identity.personalData[key];
		if (value) {
			props.editable = value.state !== ValidationState.Approved;
			props.defaultValue = value.value;
		}

		if (props.editable !== false) {
			props.style = { backgroundColor: colors.editableSetting };
		} else {
			props.style = { color: colors.textFaded, fontStyle: "italic" };
		}
		return props;
	}

	renderPersonInputs() {
		return (
			<View style={styles.dropdownContents}>
				{personalDataStructure.order.map(key => {
					const struct = personalDataStructure.structure[key];
					return (
						<DidiTextInput
							key={key}
							description={struct.name}
							placeholder=""
							textInputProps={this.textInputPropsFor(key, struct.keyboardType)}
						/>
					);
				})}
			</View>
		);
	}

	renderAddressInputs() {
		return (
			<View style={styles.dropdownContents}>
				{addressDataStructure.order.map(key => {
					const struct = addressDataStructure.structure[key];
					return (
						<DidiTextInput
							key={key}
							description={struct.name}
							placeholder=""
							textInputProps={{
								keyboardType: struct.keyboardType,
								defaultValue: this.props.identity.address[key],
								onChangeText: text => this.setStateMerging("address", { [key]: text }),
								style: { backgroundColor: colors.editableSetting }
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
					<UserHeadingComponent
						user={this.state.visual.id}
						profileImage={this.state.visual.image}
						backgroundImage={this.state.visual.backgroundImage}
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
		identity: state.identity
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
