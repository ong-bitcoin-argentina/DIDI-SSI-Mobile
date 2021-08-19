import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { SvgProps } from "react-native-svg";

import { ValidationState } from "../../store/selector/combinedIdentitySelector";
import colors from "../resources/colors";
import Alert from "../resources/images/alert.svg";
import Checkmark from "../resources/images/checkmark.svg";
import Cross from "../resources/images/cross.svg";
import strings from "../resources/strings";

import { DidiText } from "./DidiText";

interface ValidationStateIconProps extends ViewProps {
	validationState: ValidationState;
	useWords: boolean;
}

interface ValidationIconData {
	text: string;
	backgroundColor: string;
	icon: React.FunctionComponent<SvgProps>;
}

export class ValidationStateIcon extends React.PureComponent<ValidationStateIconProps> {
	private data(): ValidationIconData {
		switch (this.props.validationState) {
			case ValidationState.Approved:
				return {
					icon: Checkmark,
					text: strings.userData.states.approved,
					backgroundColor: colors.lightBackground
				};
			case ValidationState.Pending:
				return {
					icon: Alert,
					text: strings.userData.states.pending,
					backgroundColor: colors.lightBackground
				};
			case ValidationState.Rejected:
				return {
					icon: Cross,
					text: strings.userData.states.rejected,
					backgroundColor: colors.lightError
				};
		}
	}

	render() {
		const { icon: Icon, text, backgroundColor } = this.data();
		if (!this.props.useWords) {
			return <Icon height={22} width={22} />;
		}

		return (
			<View style={[styles.stateContainer, { backgroundColor }]}>
				<Icon height={15} width={15} />
				<DidiText.ValidationState style={styles.stateText}>{text}</DidiText.ValidationState>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	stateContainer: {
		textAlign: "center",
		flexDirection: "row",
		width: 90,
		paddingVertical: 3,
		borderRadius: 10,
		paddingLeft: 5
	},
	stateText: {
		marginLeft: 5,
		alignSelf: "flex-end",
		textAlignVertical: "center"
	},
	stateIcon: {
		fontSize: 10,
		alignSelf: "flex-start",
		textAlignVertical: "center",
		textAlign: "center",
		width: 15,
		height: 15,
		borderRadius: 7.5
	}
});
