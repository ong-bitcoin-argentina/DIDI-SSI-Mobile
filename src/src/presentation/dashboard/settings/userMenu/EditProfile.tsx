import React, { Fragment } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import { liftUndefined } from "../../../../util/liftUndefined";
import TypedObject from "../../../../util/TypedObject";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiButton from "../../../util/DidiButton";
import DidiTextInput from "../../../util/DidiTextInput";
import DropdownMenu from "../../../util/DropdownMenu";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { Identity, LegalAddress, PersonalData } from "../../../../model/Identity";
import { ValidatedIdentity } from "../../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../../store/store";
import Validator from "../../../access/helpers/validator";
import colors from "../../../resources/colors";
import strings from "../../../resources/strings";
import themes from "../../../resources/themes";
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
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.dashboard.userData.editProfile.barTitle);

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

	private setStateMergingPersonalData(merge: Partial<PersonalData>) {
		this.setState({ ...this.state, personalData: { ...this.state.personalData, ...merge } });
	}

	private setStateMergingAddressData(merge: Partial<LegalAddress>) {
		this.setState({ ...this.state, address: { ...this.state.address, ...merge } });
	}

	renderPersonInputs() {
		return (
			<View style={styles.dropdownContents}>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.fullNameMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: liftUndefined(this.props.identity.personalData.fullName, x => x.value),
						onChangeText: text => this.setStateMergingPersonalData({ fullName: text })
					}}
				/>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.cellMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: liftUndefined(this.props.identity.personalData.email, x => x.value),
						editable: false
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.emailMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: liftUndefined(this.props.identity.personalData.cellPhone, x => x.value),
						editable: false
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.documentMessage}
					placeholder="--"
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: liftUndefined(this.props.identity.personalData.document, x => x.value),
						onChangeText: text => this.setStateMergingPersonalData({ document: text })
					}}
				/>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.nationalityMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: liftUndefined(this.props.identity.personalData.nationality, x => x.value),
						onChangeText: text => this.setStateMergingPersonalData({ nationality: text })
					}}
				/>
			</View>
		);
	}

	renderAddressInputs() {
		return (
			<View style={styles.dropdownContents}>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.streetMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: this.props.identity.address.street,
						onChangeText: text => this.setStateMergingAddressData({ street: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.numberMessage}
					placeholder="--"
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: this.props.identity.address.number,
						onChangeText: text => this.setStateMergingAddressData({ number: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.departmentMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: this.props.identity.address.department,
						onChangeText: text => this.setStateMergingAddressData({ department: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.floorMessage}
					placeholder="--"
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: this.props.identity.address.floor,
						onChangeText: text => this.setStateMergingAddressData({ floor: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.neighborhoodMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: this.props.identity.address.neighborhood,
						onChangeText: text => this.setStateMergingAddressData({ neighborhood: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.postCodeMessage}
					placeholder="--"
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: this.props.identity.address.postCode,
						onChangeText: text => this.setStateMergingAddressData({ postCode: text })
					}}
				/>
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
						label={strings.dashboard.userData.personalDataLabel}
					>
						{this.renderPersonInputs()}
					</DropdownMenu>

					<DropdownMenu
						headerContainerStyle={{ backgroundColor: colors.primary }}
						headerTextStyle={{ color: colors.primaryText }}
						style={styles.personalDataDropdown}
						label={strings.dashboard.userData.addressDataLabel}
					>
						{this.renderAddressInputs()}
					</DropdownMenu>

					<DidiButton
						onPress={() => {
							this.editProfile();
						}}
						disabled={!this.canPressContinueButton()}
						title={strings.dashboard.userData.editProfile.saveChanges}
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
