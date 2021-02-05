import React, { Component } from "react";
import { View, Modal, StyleSheet, ActivityIndicator, Image } from "react-native";
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
	alreadyHave?: Boolean;
	automatic?: Boolean;
	onCancel: () => void;
	onOk: () => void;
};
export type AuthModalState = {
	loading: boolean;
};

const { authModal } = strings.dashboard;

export class AuthModal extends Component<AuthModalProps, AuthModalState> {
	constructor(props: AuthModalProps) {
		super(props);
		this.state = {
			loading: false
		};
	}

	handleModalShow = () => {
		const { alreadyHave, automatic } = this.props;
		if (alreadyHave && automatic) {
			setTimeout(() => {
				this.props.onOk();
			}, 1000);
		}
	};

	renderButtons() {
		return (
			<>
				<DidiButton
					onPress={this.props.onCancel}
					title="Cancelar"
					style={styles.invertedButton}
					titleStyle={{ color: colors.primary }}
				/>
				<DidiButton onPress={this.props.onOk} title="Aceptar" />
			</>
		);
	}

	renderHasRonda() {
		return (
			<>
				<Small style={styles.title}>{authModal.titleHas}</Small>
				<View style={styles.logoContainer}>
					<Image source={require("../../resources/images/logo.png")} style={styles.logo} />
				</View>
				<Small style={[styles.title, { fontSize: 18 }]}>{authModal.connecting}</Small>
				<View style={styles.footer}>
					<ActivityIndicator color={colors.primary} size="large" />
				</View>
			</>
		);
	}

	renderNoRonda() {
		const { appName } = this.props;
		return (
			<>
				<Small style={styles.title}>{authModal.title}</Small>
				<Small>{authModal.detail(appName)}</Small>
				<View style={styles.footer}>{this.renderButtons()}</View>
			</>
		);
	}

	render() {
		const { visible, onCancel, alreadyHave, automatic } = this.props;
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				onRequestClose={onCancel}
				onShow={this.handleModalShow}
			>
				<LinearGradient colors={[colors.primaryLight, colors.lightBackground]} style={commonStyles.modal.centeredView}>
					<View style={styles.modalView}>
						<DidiText.Icon fontSize={70} color={colors.primary}>
							check_circle
						</DidiText.Icon>
						{automatic && alreadyHave ? this.renderHasRonda() : this.renderNoRonda()}
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
		marginTop: 16,
		marginBottom: 10,
		color: colors.textLight
	},
	logoContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	logo: {
		resizeMode: "contain",
		width: "50%",
		height: 100
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
