import React from "react";
import { ScrollView, StyleSheet, Text, View, ViewProps } from "react-native";

import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiTextInput from "../../../util/DidiTextInput";
import DropdownMenu from "../../../util/DropdownMenu";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { ValidationStateIcon } from "../../../util/ValidationStateIcon";

import { ValidatedIdentity } from "../../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../../store/store";
import colors from "../../../resources/colors";
import strings from "../../../resources/strings";
import { EditProfileProps } from "../userMenu/EditProfile";

import { ChangeEmailEnterEmailProps } from "./ChangeEmailEnterEmail";
import { ChangePhoneEnterScreenProps } from "./ChangePhoneEnterPhone";
import { addressDataStructure, personalDataStructure } from "./ProfileInputDescription";
import { UserHeadingComponent } from "./UserHeading";

export type UserDataProps = ViewProps;

interface UserDataInternalProps extends UserDataProps {
	identity: ValidatedIdentity;
}

type UserDataState = {};

export interface UserDataNavigation {
	ChangeEmailEnterEmail: ChangeEmailEnterEmailProps;
	ChangePhoneEnterPhone: ChangePhoneEnterScreenProps;
	EditProfile: EditProfileProps;
}

class UserDataScreen extends NavigationEnabledComponent<UserDataInternalProps, UserDataState, UserDataNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonActions<UserDataNavigation>(
		strings.userData.barTitle,
		[
			{
				actionTitle: strings.userData.changeEmail.screenTitle,
				onPress: navigation => {
					navigation.navigate("ChangeEmailEnterEmail", {});
				}
			},
			{
				actionTitle: strings.userData.changePhone.screenTitle,
				onPress: navigation => {
					navigation.navigate("ChangePhoneEnterPhone", {});
				}
			},
			{
				actionTitle: strings.userData.editProfile.barTitle,
				onPress: navigation => {
					navigation.navigate("EditProfile", {});
				}
			}
		]
	);

	render() {
		return (
			<ScrollView>
				<UserHeadingComponent
					user={this.props.identity.visual.id}
					profileImage={this.props.identity.visual.image}
					backgroundImage={this.props.identity.visual.backgroundImage}
					allowEdit={true}
				/>

				<View>
					{this.renderPersonalData()}
					{this.renderAddressData()}
				</View>
			</ScrollView>
		);
	}

	private renderPersonalData() {
		return this.renderDropdown({
			label: strings.userData.personalDataLabel,
			data: personalDataStructure.order,
			renderOne: key => {
				const struct = personalDataStructure.structure[key];
				const data = this.props.identity.personalData[key];
				return (
					<DidiTextInput
						key={key}
						description={struct.name}
						placeholder={""}
						textInputProps={{
							editable: false,
							value: data ? data.value : "--"
						}}
						stateIndicator={data && data.state && <ValidationStateIcon validationState={data.state} useWords={true} />}
					/>
				);
			}
		});
	}

	private renderAddressData() {
		return this.renderDropdown({
			label: strings.userData.addressDataLabel,
			data: addressDataStructure.order,
			renderOne: key => {
				const struct = addressDataStructure.structure[key];
				const data = this.props.identity.address.value[key];
				return (
					<DidiTextInput
						key={key}
						description={struct.name}
						placeholder={""}
						textInputProps={{
							editable: false,
							value: data === null ? strings.credentialCard.valueNotAvailable : data ?? "--"
						}}
					/>
				);
			},
			headerInsert:
				Object.keys(this.props.identity.address.value).length > 0 ? (
					<View style={styles.addressValidationInsert}>
						<ValidationStateIcon validationState={this.props.identity.address.state} useWords={true} />
					</View>
				) : (
					undefined
				)
		});
	}

	private renderDropdown<T>(args: {
		label: string;
		headerInsert?: JSX.Element;
		data: T[];
		renderOne: (item: T) => JSX.Element;
	}) {
		return (
			<DropdownMenu
				headerInsertComponent={args.headerInsert}
				headerContainerStyle={{ backgroundColor: colors.primary }}
				headerTextStyle={{ color: colors.primaryText }}
				style={styles.personalDataDropdown}
				label={args.label}
			>
				<View style={styles.dropdownContents}>{args.data.map(args.renderOne)}</View>
			</DropdownMenu>
		);
	}
}

export default didiConnect(
	UserDataScreen,
	(state): UserDataInternalProps => ({
		identity: state.validatedIdentity
	})
);

const styles = StyleSheet.create({
	personalDataDropdown: {
		marginVertical: 20,
		marginHorizontal: 10,
		borderRadius: 10,
		overflow: "hidden"
	},
	dropdownContents: {
		padding: 16,
		backgroundColor: colors.darkBackground
	},
	addressValidationInsert: {
		alignItems: "flex-end",
		marginHorizontal: 20
	}
});
