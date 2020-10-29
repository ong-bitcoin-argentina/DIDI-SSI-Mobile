import React, { Component } from "react";
import { View, Modal, StyleSheet } from "react-native";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import commonStyles from "../../resources/commonStyles";
import LinearGradient from "react-native-linear-gradient";
const { Small } = DidiText.Explanation;

export type AuthModalProps = {
	appName: string;
	visible: boolean;
	onCancel: () => void;
	onOk: () => void;
};
export type AuthModalState = {};

const { authModal } = strings.dashboard;

export class AuthModal extends Component<AuthModalProps, AuthModalState> {
	render() {
		const { appName, visible, onCancel, onOk } = this.props;
		return (
			<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onCancel}>
				<LinearGradient colors={[colors.primaryLight, colors.lightBackground]} style={commonStyles.modal.centeredView}>
					<View style={styles.modalView}>
						<DidiText.Icon fontSize={70} color={colors.primary}>
							check_circle
						</DidiText.Icon>
						<Small style={styles.title}>{authModal.title}</Small>
						<Small>{authModal.detail(appName)}</Small>
						<View style={styles.footer}>
							<DidiButton
								onPress={onCancel}
								title="Cancelar"
								style={styles.invertedButton}
								titleStyle={{ color: colors.primary }}
							/>
							<DidiButton onPress={onOk} title="Aceptar" />
						</View>
					</View>
				</LinearGradient>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	title: {
		fontWeight: "bold",
		fontSize: 20,
		marginVertical: 10
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 14,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	invertedButton: {
		backgroundColor: colors.lightBackground,
		borderWidth: 1,
		borderColor: colors.primary
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	footer: {
		flexWrap: "wrap",
		alignItems: "flex-start",
		flexDirection: "row",
		paddingTop: 40
	}
});
