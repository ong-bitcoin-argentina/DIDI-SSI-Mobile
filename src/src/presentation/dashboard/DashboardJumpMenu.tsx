import React from "react";
import { View, ViewProps } from "react-native";
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

const actionCommon: Omit<IActionProps, "name"> = {
	textBackground: "transparent",
	textColor: "#FFF",
	color: colors.primary,
	textElevation: 0
};

const actions: IActionProps[] = [
	{
		...actionCommon,
		icon: require("./resources/images/share.png"),
		text: "Compartir",
		name: "share"
	},
	{
		...actionCommon,
		icon: require("./resources/images/roundIcon.png"),
		text: "Armar Ronda",
		name: "DashboardRounds"
	},
	{
		...actionCommon,
		icon: require("./resources/images/jumpToDocuments.png"),
		text: "Ver Documentos",
		name: "DashboardDocuments"
	},
	{
		...actionCommon,
		icon: require("./resources/images/jumpToEditProfile.png"),
		text: "Editar Perfil",
		name: "UserData"
	},
	{
		...actionCommon,
		icon: require("./resources/images/documentIcon.png"),
		text: "Ver ID",
		name: "viewId"
	}
];
