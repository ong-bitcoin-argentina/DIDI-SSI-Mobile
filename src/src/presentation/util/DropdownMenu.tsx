import React, { Fragment } from "react";
import { TouchableOpacity, StyleProp, TextStyle, Text, StyleSheet, View } from "react-native";
import commonStyles from "../access/resources/commonStyles";
import themes from "../resources/themes";

interface DropdownMenuProps {
	label: string;
	style?: StyleProp<TextStyle>;
	color?: string;
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
		const textColor = this.props.textColor ? this.props.textColor : "";
		const color = this.props.color ? this.props.color : themes.buttonDisabled;
		return (
			<Fragment>
				<TouchableOpacity
					style={[styles.dropdown, this.props.style]}
					onPress={() => {
						this.toggleVisible();
					}}
				>
					<View style={styles.labelContainer}>
						<Text style={[commonStyles.text.emphasis, styles.label, { color: textColor, backgroundColor: color }]}>
							{this.props.label}
						</Text>
						{visible && <Text style={[styles.icon, { backgroundColor: color }]}>▼</Text>}
						{!visible && <Text style={[styles.icon, { backgroundColor: color }]}>◀</Text>}
					</View>
				</TouchableOpacity>
				{visible && this.props.children}
			</Fragment>
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
		marginBottom: 10
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
