import React, { Fragment } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiButton from "../../../util/DidiButton";
import DidiTextInput from "../../../util/DidiTextInput";
import DropdownMenu from "../../../util/DropdownMenu";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { Identity, LegalAddress, ValidationState } from "../../../../model/Identity";
import { didiConnect } from "../../../../store/store";
import Validator from "../../../access/helpers/validator";
import colors from "../../../resources/colors";
import strings from "../../../resources/strings";
import themes from "../../../resources/themes";
import { UserHeadingComponent } from "../userData/UserHeading";

export type EditProfileProps = {};
interface EditProfileStateProps {
	identity: Identity;
}
interface EditProfileDispatchProps {}
type EditProfileInternalProps = EditProfileProps & EditProfileStateProps & EditProfileDispatchProps;

type EditProfileState = Omit<Identity, "address"> & LegalAddress;

export interface EditProfileNavigation {}

class EditProfileScreen extends NavigationEnabledComponent<
	EditProfileInternalProps,
	EditProfileState,
	EditProfileNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.dashboard.userData.editProfile.barTitle);

	constructor(props: EditProfileInternalProps) {
		super(props);
		this.state = {
			...this.props.identity,
			...this.props.identity.address
		};
	}

	private canPressContinueButton(): boolean {
		return (
			(!this.state.name || Validator.isName(this.state.name)) &&
			(!this.state.document || Validator.isDocumentNumber(this.state.document.value)) &&
			(!this.state.nationality || Validator.isNationality(this.state.nationality.value))
		);
	}

	renderPersonInputs() {
		return (
			<View style={styles.dropdownContents}>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.nameMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: this.state.name,
						onChangeText: text => this.setState({ name: text })
					}}
				/>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.cellMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: this.state.email && this.state.email.value,
						editable: false
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.emailMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: this.state.cellPhone && this.state.cellPhone.value,
						editable: false
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.documentMessage}
					placeholder="--"
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: this.state.document && this.state.document.value,
						onChangeText: text => this.setState({ document: { state: ValidationState.Pending, value: text } })
					}}
				/>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.nationalityMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: this.state.nationality && this.state.nationality.value,
						onChangeText: text => this.setState({ nationality: { state: ValidationState.Pending, value: text } })
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
						defaultValue: this.state.street,
						onChangeText: text => this.setState({ street: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.numberMessage}
					placeholder="--"
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: this.state.number,
						onChangeText: text => this.setState({ number: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.departmentMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: this.state.department,
						onChangeText: text => this.setState({ department: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.floorMessage}
					placeholder="--"
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: this.state.floor,
						onChangeText: text => this.setState({ floor: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.neighborhoodMessage}
					placeholder="--"
					textInputProps={{
						defaultValue: this.state.neighborhood,
						onChangeText: text => this.setState({ neighborhood: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.postCodeMessage}
					placeholder="--"
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: this.state.postCode,
						onChangeText: text => this.setState({ postCode: text })
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
						user={this.state.id}
						profileImage={this.state.image}
						backgroundImage={this.state.backgroundImage}
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
		// TODO !!!
		this.goBack();
	}
}

const connected = didiConnect(
	EditProfileScreen,
	(state): EditProfileStateProps => ({
		identity: state.identity
	}),
	(dispatch): EditProfileDispatchProps => ({})
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
