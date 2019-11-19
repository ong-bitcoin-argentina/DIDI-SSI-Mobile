import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { NavigationScreenProp, NavigationState } from "react-navigation";

import NavigationEnabledComponent from "../util/NavigationEnabledComponent";

import colors from "../resources/colors";

import { ScanCredentialProps } from "./credentials/ScanCredential";
import { ShareCredentialProps } from "./credentials/ShareCredential";
import { DocumentsScreenProps } from "./documents/DocumentsScreen";
import { RoundsScreenProps } from "./rounds/RoundsScreen";
import { UserDataProps } from "./settings/userData/UserData";
import { EditProfileProps } from "./settings/userMenu/EditProfile";

export interface DashboardJumpMenuProps extends ViewProps {
	navigation: NavigationScreenProp<NavigationState>;
	showJumpButton: boolean;
}

interface DashboardJumpMenuState {
	showJumpMenu: boolean;
}

export interface DashboardJumpNavigation {
	ScanCredential: ScanCredentialProps;
	ShareCredential: ShareCredentialProps;
	DashboardRounds: RoundsScreenProps;
	DashboardDocuments: DocumentsScreenProps;
	UserData: UserDataProps;
	EditProfile: EditProfileProps;
}

export default class DashboardJumpMenu extends NavigationEnabledComponent<
	DashboardJumpMenuProps,
	DashboardJumpMenuState,
	DashboardJumpNavigation
> {
	render() {
		if (!this.props.showJumpButton) {
			return;
		}
		return (
			<View {...this.props} pointerEvents="box-none">
				<FloatingAction
					color="#FFBD10"
					overlayColor="rgba(0, 0, 0, 0.66)"
					actions={actions}
					onPressItem={name => name && this.navigate(name as keyof DashboardJumpNavigation, {})}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	icon: {
		fontFamily: "MaterialIcons-Regular",
		fontSize: 21,
		color: colors.primaryText
	}
});

const actionCommon: Omit<IActionProps, "name"> = {
	textBackground: "transparent",
	textColor: "#FFF",
	color: colors.primary,
	textElevation: 0
};

const actions: Array<IActionProps & { name: keyof DashboardJumpNavigation }> = [
	{
		...actionCommon,
		icon: <Text style={styles.icon}></Text>,
		text: "Escanear Credenciales",
		name: "ScanCredential"
	},
	{
		...actionCommon,
		icon: <Text style={styles.icon}></Text>,
		text: "Compartir",
		name: "ShareCredential"
	},
	{
		...actionCommon,
		icon: <Text style={styles.icon}></Text>,
		text: "Armar Ronda",
		name: "DashboardRounds"
	},
	{
		...actionCommon,
		icon: <Text style={styles.icon}></Text>,
		text: "Ver Documentos",
		name: "DashboardDocuments"
	},
	{
		...actionCommon,
		icon: <Text style={styles.icon}></Text>,
		text: "Ver ID",
		name: "UserData"
	},
	{
		...actionCommon,
		icon: <Text style={styles.icon}></Text>,
		text: "Editar Perfil",
		name: "EditProfile"
	}
];
