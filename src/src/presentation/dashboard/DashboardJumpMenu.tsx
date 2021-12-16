import React from "react";
import { View, ViewProps } from "react-native";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { NavigationScreenProp, NavigationState } from "react-navigation";

import { DidiText } from "../util/DidiText";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";

import colors from "../resources/colors";
import strings from "../resources/strings";

import { ScanCredentialProps } from "./credentials/ScanCredential";
import { ShareCredentialProps } from "./credentials/ShareCredential";
import { DocumentsScreenProps } from "./documents/DocumentsScreen";
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
					color={colors.highlight}
					overlayColor="rgba(0, 0, 0, 0.66)"
					actions={actions}
					onPressItem={name => name && this.navigate(name as keyof DashboardJumpNavigation, {})}
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

function iconFrom(text: string) {
	return <DidiText.Icon fontSize={21}>{text}</DidiText.Icon>;
}

const actions: Array<IActionProps & { name: keyof DashboardJumpNavigation }> = [
	{
		...actionCommon,
		icon: iconFrom(""),
		text: strings.dashboardJump.scanCredential,
		name: "ScanCredential"
	},
	{
		...actionCommon,
		icon: iconFrom(""),
		text: strings.dashboardJump.shareCredential,
		name: "ShareCredential"
	},
	{
		...actionCommon,
		icon: iconFrom(""),
		text: strings.dashboardJump.documents,
		name: "DashboardDocuments"
	},
	{
		...actionCommon,
		icon: iconFrom(""),
		text: strings.dashboardJump.editProfile,
		name: "EditProfile"
	}
];
