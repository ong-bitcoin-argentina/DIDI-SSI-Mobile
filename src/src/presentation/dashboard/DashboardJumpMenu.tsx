import React from "react";
import { View, ViewProps, Text, StyleSheet } from "react-native";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import colors from "../resources/colors";

export interface DashboardJumpMenuProps extends ViewProps {
	navigation: NavigationScreenProp<NavigationState>;
	showJumpButton: boolean;
}

interface DashboardJumpMenuState {
	showJumpMenu: boolean;
}

export default class DashboardJumpMenu extends React.Component<DashboardJumpMenuProps, DashboardJumpMenuState> {
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
					onPressItem={name => name && this.props.navigation.navigate(name, {})}
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

const actions: IActionProps[] = [
	{
		...actionCommon,
		icon: <Text style={styles.icon}></Text>,
		text: "Escanear Credenciales",
		name: "StartCredentialInteraction"
	},
	{
		...actionCommon,
		icon: <Text style={styles.icon}></Text>,
		text: "Compartir",
		name: "Share"
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
		icon: <Text style={styles.icon}></Text>,
		text: "Editar Perfil",
		name: "UserData"
	},
	{
		...actionCommon,
		icon: <Text style={styles.icon}></Text>,
		text: "Ver ID",
		name: "viewId"
	}
];
