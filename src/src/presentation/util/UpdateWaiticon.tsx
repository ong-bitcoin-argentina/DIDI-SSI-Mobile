import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { DidiText } from "./DidiText";
import Checkmark from "../resources/images/checkmark.svg";
import strings from "../resources/strings";
import colors from "../resources/colors";
import Alert from "../resources/images/alert.svg";

export enum ComponentState {
	Approved = "Approved",
	Pending = "Pending"
}


interface StateIconProps extends ViewProps {
	componentState: ComponentState;
	useWords?: boolean;
}

interface IconData {
	text: string;
	backgroundColor: string;
	icon: React.FunctionComponent<SvgProps>;
}

export class UpdateWaiticon extends React.PureComponent<StateIconProps> {
	private data(): IconData {
		switch (this.props.componentState) {
			case ComponentState.Approved:
				return {
					icon: Checkmark,
					text: ` ${strings.userData.standbyState.approved} ${strings.userData.formatDate(new Date())} `,
					backgroundColor: colors.lightBackground
				};
			case ComponentState.Pending:
				return {
					icon: Alert,
					text: ` ${strings.userData.standbyState.pending} ${strings.userData.formatDate(new Date())} `,
					backgroundColor: colors.lightBackground
				};
		}
	}


	render() {
		const { icon: Icon, text, backgroundColor } = this.data();
		return (
			<View style={[styles.container, { backgroundColor }]}>
				<Icon height={15} width={15} />
				<DidiText.ValidationState >{text}</DidiText.ValidationState>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: '100%',
		paddingVertical: 10,
        paddingHorizontal:2,
		borderRadius: 10,
		paddingLeft: 7,
		marginTop: 3,
	}
});
