import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StyleSheet, StatusBar, View, ScrollView } from "react-native";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import strings from "../../../resources/strings";
import themes from "../../../resources/themes";
import DidiTextInput from "../../../util/DidiTextInput";
import DidiButton from "../../../util/DidiButton";
import Validator from "../../../access/helpers/validator";
import DropdownMenu from "../../../util/DropdownMenu";
import colors from "../../../resources/colors";
import UserHeadingComponent from "../userData/UserHeading";
import { Identity } from "../../../../model/Identity";
import { didiConnect } from "../../../../store/store";

export type EditProfileProps = {};
interface EditProfileInternalProps {
	person: Identity;
}

type EditProfileState = {
	name: string;
	cell: string;
	email: string;
	document: string;
	nationality: string;
	address: string;
};

export interface EditProfileNavigation {}

class EditProfileScreen extends NavigationEnabledComponent<
	EditProfileInternalProps,
	EditProfileState,
	EditProfileNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.dashboard.userData.editProfile.barTitle);

	private canPressContinueButton(): boolean {
		if (
			!this.state ||
			!Validator.isEmail(this.state.email) ||
			!Validator.isPhoneNumber(this.state.cell) ||
			!Validator.isDocumentNumber(this.state.document)
		) {
			return false;
		}

		return this.state.name.length > 0 && this.state.nationality.length > 0 && this.state.address.length > 0;
	}

	editProfile() {
		// TODO !!!
		this.goBack();
	}

	renderInputs() {
		return (
			<View style={styles.dropdownContents}>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.nameMessage}
					placeholder=""
					textInputProps={{
						defaultValue: this.props.person.name,
						onChangeText: text => this.setState({ name: text })
					}}
				/>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.cellMessage}
					placeholder=""
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: this.props.person.cellPhone.value,
						onChangeText: text => this.setState({ cell: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.emailMessage}
					placeholder=""
					textInputProps={{
						keyboardType: "email-address",
						defaultValue: this.props.person.email.value,
						onChangeText: text => this.setState({ email: text })
					}}
				/>

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.documentMessage}
					placeholder=""
					textInputProps={{
						keyboardType: "number-pad",
						defaultValue: this.props.person.document.value,
						onChangeText: text => this.setState({ document: text })
					}}
				/>
				<DidiTextInput
					description={strings.dashboard.userData.editProfile.nationalityMessage}
					placeholder=""
					textInputProps={{
						defaultValue: this.props.person.nationality.value,
						onChangeText: text => this.setState({ nationality: text })
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
						user={this.props.person.id}
						profileImage={this.props.person.image}
						backgroundImage={this.props.person.backgroundImage}
					/>
					<DropdownMenu
						headerContainerStyle={{ backgroundColor: colors.primary }}
						headerTextStyle={{ color: colors.primaryText }}
						style={styles.personalDataDropdown}
						label={strings.dashboard.userData.personalDataLabel}
					>
						{this.renderInputs()}
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
}

export default didiConnect(
	EditProfileScreen,
	(state): EditProfileInternalProps => {
		return {
			person: state.identity
		};
	}
);

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
