import { View, StyleSheet, ViewProps, ScrollView } from "react-native";
import React from "react";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import DropdownMenu from "../../../util/DropdownMenu";
import strings from "../../../resources/strings";
import PersonalData from "./PersonalData";
import colors from "../../../resources/colors";
import { LoggedInStoreContent, Identity } from "../../../../model/StoreContent";
import { connect } from "react-redux";
import UserHeadingComponent from "./UserHeading";

export type UserDataProps = ViewProps;

interface UserDataInternalProps extends UserDataProps {
	identity: Identity;
}

class UserDataScreen extends NavigationEnabledComponent<UserDataInternalProps, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Mi Perfil");

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

	getUserData() {
		return {
			user: "@lili.martinez",
			profileImage: require("../../resources/images/avatar.png"),
			backgroundImage: require("../../resources/images/bg.jpg"),
			cameraIcon: require("../../resources/images/camera-icon.png")
		};
	}

	render() {
		const userData = this.getUserData();
		return (
			<ScrollView>
				<UserHeadingComponent
					user={userData.user}
					profileImage={userData.profileImage}
					backgroundImage={userData.backgroundImage}
					cameraIcon={userData.cameraIcon}
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
	(state: LoggedInStoreContent): UserDataInternalProps => {
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
