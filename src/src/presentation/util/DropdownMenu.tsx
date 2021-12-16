import React from "react";
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";

import ChevronGrayDown from "../resources/images/chevronGrayDown.svg";
import ChevronGrayUp from "../resources/images/chevronGrayUp.svg";
import Checkmark from "../resources/images/checkmark.svg";

import { DidiText } from "./DidiText";
import commonStyles from "../resources/commonStyles";
import colors from "../resources/colors";

interface DropdownMenuProps extends ViewProps {
	label: string;
	headerContainerStyle?: StyleProp<ViewStyle>;
	headerTextStyle?: StyleProp<TextStyle>;
	headerColor?: string;
	headerInsertComponent?: JSX.Element;
	textColor?: string;
	approved?: boolean;
	userHelp?: {			
		name:string,
		lastname: string,
		did:string,
		fullName:string,
}
}

interface DropdownMenuState {
	visible: boolean;
}

export default class DropdownMenu extends React.Component<DropdownMenuProps, DropdownMenuState> {
	constructor(props: DropdownMenuProps) {
		super(props);
		this.state = { visible: true };
	}

	toggleVisible() {
		this.state.visible ? this.hide() : this.show();
	}

	show() {
		this.setState({ visible: true });
	}

	hide() {
		this.setState({ visible: false });
	}

	approvedLabel = () => {
		if (!this.props.approved) return;
		return (
			<View style={styles.approvedLabel}>
				<Checkmark style={{ marginRight: 6 }} />
				<DidiText.Explanation.Small style={{ fontSize: 14 }}>Aprobado</DidiText.Explanation.Small>
			</View>
		);
	};

	render() {
		const { visible } = this.state;
		return (
			<View {...this.props} style={[this.props.style, styles.container]}>
				<TouchableOpacity
					style={[styles.dropdown]}
					onPress={() => {
						this.toggleVisible();
					}}
				>
					<View style={[styles.labelContainer, this.props.headerContainerStyle]}>
						<DidiText.Explanation.Small style={[styles.label, this.props.headerTextStyle]}>
							{this.props.label}
						</DidiText.Explanation.Small>

						<View style={styles.headerInsertContainer}>{this.approvedLabel()}</View>

						<View style={styles.chevron}>{visible ? <ChevronGrayUp /> : <ChevronGrayDown />}</View>
					</View>
				</TouchableOpacity>
				{visible && this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 18,
		marginHorizontal: 10,
		borderRadius: 6,
		overflow: "hidden",
		backgroundColor: colors.white,
		...commonStyles.util.shadow,
		elevation: 3
	},
	dropdown: {
		flex: 1
	},
	headerInsertContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	labelContainer: {
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row",
		justifyContent: "center"
	},
	label: {
		justifyContent: "flex-start",
		textAlign: "left",
		marginLeft: 10,
		paddingVertical: 6,
		paddingHorizontal: 10,
		fontWeight: "bold",
		color: colors.textLight
	},
	icon: {
		justifyContent: "flex-end",
		marginRight: 10
	},
	chevron: {
		width: 30,
		justifyContent: "center"
	},
	approvedLabel: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.successLight,
		paddingHorizontal: 10,
		paddingVertical: 3,
		borderRadius: 16
	}
});
