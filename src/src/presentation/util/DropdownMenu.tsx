import React, { Fragment } from "react";
import { TouchableOpacity, StyleProp, TextStyle, Text, StyleSheet, View, ViewProps } from "react-native";
import commonStyles from "../access/resources/commonStyles";
import themes from "../resources/themes";

interface DropdownMenuProps extends ViewProps {
	label: string;
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
					style={[styles.dropdown, this.props.style]}
					onPress={() => {
						this.toggleVisible();
					}}
				>
					<View style={styles.labelContainer}>
						<Text style={[commonStyles.text.emphasis, styles.label]}>{this.props.label}</Text>
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
		marginRight: 5,
		flex: 1
	},
	labelContainer: {
		flexDirection: "row",
		marginVertical: 16
	},
	label: {
		flex: 1,
		justifyContent: "flex-start",
		textAlign: "left",
		marginLeft: 10
	},
	icon: {
		justifyContent: "flex-end"
	}
});
