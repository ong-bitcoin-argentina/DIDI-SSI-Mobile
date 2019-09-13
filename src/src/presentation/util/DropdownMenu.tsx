import React, { Fragment } from "react";
import { TouchableOpacity, StyleProp, TextStyle, Text, StyleSheet, View } from "react-native";
import commonStyles from "../access/resources/commonStyles";
import themes from "../resources/themes";

interface DropdownMenuProps {
	label: string;
	style?: StyleProp<TextStyle>;
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
			<Fragment>
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
		backgroundColor: themes.buttonDisabled,
		flex: 1,
		justifyContent: "flex-start",
		textAlign: "left",
		marginLeft: 10
	},
	icon: {
		backgroundColor: themes.buttonDisabled,
		justifyContent: "flex-end"
	}
});
