import React from "react";
import { ScrollView, StyleSheet, Text, View, ViewProps } from "react-native";

import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import DidiTextInput from "../../../util/DidiTextInput";
import DropdownMenu from "../../../util/DropdownMenu";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { ValidationStateIcon } from "../../../util/ValidationStateIcon";

import { Identity, WithValidationState } from "../../../../model/Identity";
import { didiConnect } from "../../../../store/store";
import colors from "../../../resources/colors";
import strings from "../../../resources/strings";
import { EditProfileProps, EditProfileScreen } from "../userMenu/EditProfile";
import { ShareProfileProps } from "../userMenu/ShareProfile";

import { ChangeEmailEnterEmailProps } from "./ChangeEmailEnterEmail";
import { ChangePhoneEnterScreenProps } from "./ChangePhoneEnterPhone";
import UserHeadingComponent from "./UserHeading";

export type UserDataProps = ViewProps;

interface UserDataInternalProps extends UserDataProps {
	identity: Identity;
}

type UserDataState = {};

export interface UserDataNavigation {
	ShareProfile: ShareProfileProps;
	ChangeEmailEnterEmail: ChangeEmailEnterEmailProps;
	ChangePhoneEnterPhone: ChangePhoneEnterScreenProps;
	EditProfile: EditProfileProps;
}

class UserDataScreen extends NavigationEnabledComponent<UserDataInternalProps, UserDataState, UserDataNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonActions<UserDataNavigation>("Mi perfil", [
		{
			actionTitle: strings.dashboard.userData.changeEmail.screenTitle,
			onPress: navigation => {
				navigation.navigate("ChangeEmailEnterEmail", {});
			}
		},
		{
			actionTitle: strings.dashboard.userData.changePhone.screenTitle,
			onPress: navigation => {
				navigation.navigate("ChangePhoneEnterPhone", {});
			}
		},
		{
			actionTitle: strings.dashboard.userData.share.barTitle,
			onPress: navigation => {
				navigation.navigate("ShareProfile", {});
			}
		},
		{
			actionTitle: strings.dashboard.userData.editProfile.barTitle,
			onPress: navigation => {
				navigation.navigate("EditProfile", {});
			}
		}
	]);

	getPersonalData(): Array<{ label: string; value: WithValidationState<string> }> {
		return [
			{
				label: "Nombre Completo",
				value: this.props.identity.fullName
			},
			{
				label: "Celular",
				value: this.props.identity.cellPhone
			},
			{
				label: "E-mail",
				value: this.props.identity.email
			},
			{
				label: "DU / CI / Pasaporte",
				value: this.props.identity.document
			},
			{
				label: "Nacionalidad",
				value: this.props.identity.nationality
			}
		];
	}

	getAddressData(): Array<{ label: string; value?: string }> {
		return [
			{
				label: "Nombre de Calle / Manzana",
				value: this.props.identity.address.street
			},
			{
				label: "Número / Casa",
				value: this.props.identity.address.number
			},
			{
				label: "Departamento",
				value: this.props.identity.address.department
			},
			{
				label: "Piso",
				value: this.props.identity.address.floor
			},
			{
				label: "Barrio",
				value: this.props.identity.address.neighborhood
			},
			{
				label: "Codigo Postal",
				value: this.props.identity.address.postCode
			}
		];
	}

	render() {
		return (
			<ScrollView>
				<UserHeadingComponent
					user={this.props.identity.id}
					profileImage={this.props.identity.image}
					backgroundImage={this.props.identity.backgroundImage}
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
		return this.renderDropdown(strings.dashboard.userData.personalDataLabel, this.getPersonalData(), (data, index) => {
			return (
				<DidiTextInput
					key={index}
					description={data.label}
					placeholder={""}
					textInputProps={{
						editable: false,
						value: data.value.value
					}}
					stateIndicator={
						data.value.state && <ValidationStateIcon validationState={data.value.state} useWords={true} />
					}
				/>
			);
		});
	}

	private renderAddressData() {
		return this.renderDropdown(strings.dashboard.userData.addressDataLabel, this.getAddressData(), (item, index) => {
			return (
				<DidiTextInput
					key={index}
					description={item.label}
					placeholder={""}
					textInputProps={{
						editable: false,
						value: item.value || "--"
					}}
				/>
			);
		});
	}

	private renderDropdown<T>(label: string, data: T[], renderOne: (item: T, index: number) => JSX.Element) {
		return (
			<DropdownMenu
				headerContainerStyle={{ backgroundColor: colors.primary }}
				headerTextStyle={{ color: colors.primaryText }}
				style={styles.personalDataDropdown}
				label={label}
			>
				<View style={styles.dropdownContents}>{data.map(renderOne)}</View>
			</DropdownMenu>
		);
	}
}

export default didiConnect(
	UserDataScreen,
	(state): UserDataInternalProps => ({
		identity: state.identity
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
	}
});
