import React from "react";
import { StyleSheet, View } from "react-native";
import DidiButton, { DidiButtonProps, styles as didiButtonStyles } from "./DidiButton";
import { Text } from "react-native-svg";
import themes from "../resources/themes";

export interface DidiButtonImageProps extends DidiButtonProps {
	image: JSX.Element;
}

export default class DidiButtonImage extends React.Component<DidiButtonImageProps> {
	public render() {
		const theme = this.props.theme ? this.props.theme : themes.primaryTheme;
		const currentButtonColor = {
			flex: 1,
			backgroundColor: this.props.disabled ? theme.buttonDisabled : theme.button,
			...styles.btn
		};
		styles;
		const { image } = this.props;
		return (
			<View style={[didiButtonStyles.button, currentButtonColor]}>
				<View>{image}</View>
				<Text>
					<DidiButton {...this.props} />
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 56,
		marginHorizontal: 5,
		marginVertical: 5,
		borderRadius: 5
	},
	text: {
		marginHorizontal: 10
	},
	btn: {
		flexDirection: "row"
	}
});
