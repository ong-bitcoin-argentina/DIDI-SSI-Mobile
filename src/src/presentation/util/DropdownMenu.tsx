import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";

import { DidiText } from "./DidiText";

interface DropdownMenuProps extends ViewProps {
	label: string;
	headerContainerStyle?: StyleProp<ViewStyle>;
	headerTextStyle?: StyleProp<TextStyle>;
	headerColor?: string;
	textColor?: string;
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

	render() {
		const { visible } = this.state;
		return (
			<View {...this.props}>
				<TouchableOpacity
					style={[styles.dropdown]}
					onPress={() => {
						this.toggleVisible();
					}}
				>
					<View style={[styles.labelContainer, this.props.headerContainerStyle]}>
						<DidiText.Explanation.Emphasis style={[styles.label, this.props.headerTextStyle]}>
							{this.props.label}
						</DidiText.Explanation.Emphasis>
						{visible && <Text style={styles.icon}>▼</Text>}
						{!visible && <Text style={styles.icon}>◀</Text>}
					</View>
				</TouchableOpacity>
				{visible && this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	dropdown: {
		flex: 1
	},
	labelContainer: {
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: "row"
	},
	label: {
		flex: 1,
		justifyContent: "flex-start",
		textAlign: "left",
		marginLeft: 10
	},
	icon: {
		justifyContent: "flex-end",
		marginRight: 10
	}
});
