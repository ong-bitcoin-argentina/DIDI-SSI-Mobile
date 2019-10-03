import { View, StyleSheet, ViewProps, ScrollView, Text } from "react-native";
import React from "react";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import DropdownMenu from "../../../util/DropdownMenu";
import strings from "../../../resources/strings";
import PersonalData from "./PersonalData";
import colors from "../../../resources/colors";
import { connect } from "react-redux";
import UserHeadingComponent from "./UserHeading";
import { ChangePasswordProps } from "../userMenu/ChangePassword";
import { EditProfileProps } from "../userMenu/EditProfile";
import { ShareProfileProps } from "../userMenu/ShareProfile";
import { StoreContent } from "../../../../model/store";
import { Identity } from "../../../../model/data/Identity";

export type UserDataProps = ViewProps;

interface UserDataInternalProps extends UserDataProps {
	identity: Identity;
}

type UserDataState = {};

export interface UserDataNavigation {
	ChangePassword: ChangePasswordProps;
	EditProfile: EditProfileProps;
	ShareProfile: ShareProfileProps;
}

class UserDataScreen extends NavigationEnabledComponent<UserDataInternalProps, UserDataState, UserDataNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonActions("Mi perfil", [
		{
			actionTitle: "Cambiar Contraseña",
			onPress: navigation => {
				navigation.navigate("ChangePassword", {});
			}
		},
		{
			actionTitle: "Editar Perfil",
			onPress: navigation => {
				navigation.navigate("EditProfile", {});
			}
		},
		{
			actionTitle: "Compartir",
			onPress: navigation => {
				navigation.navigate("ShareProfile", {});
			}
		}
	]);

	getPersonalData() {
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
			},
			{
				label: "Domicilio",
				value: this.props.identity.address
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
					<DropdownMenu
						headerContainerStyle={{ backgroundColor: colors.primary }}
						headerTextStyle={{ color: colors.secondaryText }}
						style={styles.personalDataDropdown}
						label={strings.dashboard.userData.personalDataLabel}
					>
						<View style={styles.dropdownContents}>
							{this.getPersonalData().map((data, index) => {
								return (
									<PersonalData
										key={index}
										label={data.label}
										value={data.value.value}
										state={data.value.state}
										style={styles.personalDataElement}
									/>
								);
							})}
						</View>
					</DropdownMenu>
				</View>
			</ScrollView>
		);
	}
}

export default connect(
	(state: StoreContent): UserDataInternalProps => {
		return {
			identity: state.identity
		};
	}
)(UserDataScreen);

const styles = StyleSheet.create({
	personalDataDropdown: {
		marginTop: 20,
		marginHorizontal: 10,
		borderRadius: 10,
		overflow: "hidden"
	},
	dropdownContents: {
		backgroundColor: colors.darkBackground
	},
	personalDataElement: {
		marginBottom: 10
	}
});
