import React, { Component } from "react";
import { Text, View, Modal, StyleSheet, Alert, TouchableHighlight } from "react-native";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
const { Small } = DidiText.Explanation;

export type AuthModalProps = {
	appName: string;
	onCancel: () => void;
	onOk: () => void;
};
export type AuthModalState = {
	modalVisible: boolean;
};

export class AuthModal extends Component<AuthModalProps, AuthModalState> {
	setModalVisible = (visible: boolean) => {
		this.setState({ modalVisible: visible });
	};

	render() {
		const { appName } = this.props;
		const detail = `ai· di compartirá esta información con ${appName}: Nombre, apellido, número de celular, mail, número de identificación digital (DID) y foto de usuario.`;
		return (
			<View style={styles.centeredView}>
				<Modal animationType="slide" transparent={true} visible={true}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Small>{detail}</Small>
							<View style={styles.footer}>
								<DidiButton onPress={this.props.onCancel} title="Cancelar" />
								<DidiButton onPress={this.props.onOk} title="Aceptar" />
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
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
