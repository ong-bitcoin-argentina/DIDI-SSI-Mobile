import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StyleSheet, StatusBar, SafeAreaView, View, ScrollView, ImageSourcePropType } from "react-native";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import strings from "../../../resources/strings";
import { Identity } from "../../../../model/StoreContent";
import { UserDataProps } from "../userData/UserData";
import themes from "../../../resources/themes";
import commonStyles from "../../../access/resources/commonStyles";
import DidiTextInput from "../../../util/DidiTextInput";
import DidiButton from "../../../util/DidiButton";
import Validator from "../../../access/helpers/validator";
import DropdownMenu from "../../../util/DropdownMenu";
import colors from "../../../resources/colors";
import UserHeadingComponent from "../userData/UserHeading";

export interface EditProfileProps {
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

export interface EditProfileNavigation {
	UserData: UserDataProps;
}

export default class EditProfileScreen extends NavigationEnabledComponent<
	EditProfileProps,
	EditProfileState,
	EditProfileNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndBackButton<EditProfileNavigation, "UserData">(
		strings.dashboard.userData.editProfile.barTitle,
		"UserData",
		{}
	);

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
		this.navigate("UserData", {});
	}

	renderInputs() {
		return (
			<View style={styles.inputs}>
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

				<DidiTextInput
					description={strings.dashboard.userData.editProfile.addressMessage}
					placeholder=""
					textInputProps={{
						defaultValue: this.props.person.address.value,
						onChangeText: text => this.setState({ address: text })
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
					<SafeAreaView style={commonStyles.view.area}>
						<View style={commonStyles.view.body}>
							<DropdownMenu
								headerContainerStyle={{ backgroundColor: colors.primary }}
								headerTextStyle={{ color: colors.secondaryText }}
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
						</View>
					</SafeAreaView>
				</ScrollView>
			</Fragment>
		);
	}
}

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
		marginBottom: 20,
		marginHorizontal: 10,
		borderRadius: 10,
		overflow: "hidden"
	}
});
