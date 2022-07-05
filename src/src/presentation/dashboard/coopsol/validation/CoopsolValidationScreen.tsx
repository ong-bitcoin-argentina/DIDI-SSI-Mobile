import React from "react";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import { View, StyleSheet, Modal, Alert } from "react-native";
import colors from "../../../resources/colors";
import strings from "../../../resources/strings";
import DidiButton from "../../../util/DidiButton";
import { ScrollView } from "react-native-gesture-handler";
import commonStyles from "../../../resources/commonStyles";
import { DidiText } from "../../../util/DidiText";
import DidiTextInput from "../../../util/DidiTextInput";
import { Validations } from "../../../../model/Validations";
import { DashboardScreenProps } from "../../home/Dashboard";
import { didiConnect } from "../../../../store/store";
import { getEmail, getPhoneNumber } from "../../../../util/specialCredentialsHelpers";
import { DidiServiceButton } from "../../../util/DidiServiceButton";
const { Small, Normal } = DidiText.Explanation;
const { validate } = strings.coopsol;
const { accept } = strings.buttons;


interface Navigation {
	DashboardHome: DashboardScreenProps;
}

interface DispatchProps {
	coopsolValidationStart: (data: any) => void;
}

interface StateProps {
	email: string;
	phoneNumber: string;
}

type Props = DispatchProps & StateProps;

type State = {
	dni: string;
	name: string;
	lastname: string;
	modalVisible: boolean;
	sendingRequest: boolean;
};

class CoopsolValidationScreen extends NavigationEnabledComponent<Props, State, Navigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.coopsol.validationTitle);

	constructor(props: Props) {
		super(props);
		this.state = {
			dni: "",
			name: "",
			lastname: "",
			modalVisible: false,
			sendingRequest: false
		};
	}

	private formValid(): boolean {
		const { dni, name, lastname } = this.state;
		const { isDNI, isName } = Validations;
		return isDNI(dni) && isName(name) && isName(lastname);
	}

	toggleModal = () => {
		this.setState({ modalVisible: !this.state.modalVisible });
	};

	handleValidateConfirm = () => {
		const { dni, name, lastname } = this.state;
		const { email, phoneNumber } = this.props;
		const data = {
			dni,
			phone: phoneNumber,
			email,
			name,
			lastName: lastname
		};
		this.setState({ sendingRequest: true });
		this.props.coopsolValidationStart(data);
		this.toggleModal();
		this.navigate('DashboardHome',{});
	};

	onSuccessRequest = () => {
		this.setState({ sendingRequest: false });
		Alert.alert(strings.coopsol.program, validate.successRequest, [
			{ text: "OK", onPress: () => this.navigate("DashboardHome", {}) }
		]);
	};

	render() {
		const { border, area, text, button, input, description,textWillBeContacting } = styles;
		const {sendingRequest } = this.state;
		const { modal } = commonStyles;
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={[border, area]}>
						<Normal style={text}>{validate.description}</Normal>
						<Normal style={text}>{validate.needData}</Normal>

						<View style={input}>
							<DidiTextInput.DNI onChangeText={dni => this.setState({ dni })} />
						</View>
						<View style={input}>
							<DidiTextInput.FirstName onChangeText={name => this.setState({ name })} />
						</View>
						<View style={input}>
							<DidiTextInput.LastName onChangeText={lastname => this.setState({ lastname })} />
						</View>

						<Normal style={textWillBeContacting}>{validate.willBeContacting}</Normal>
						<View>
							<DidiServiceButton
								title={validate.DNI}
								style={button}
								onPress={this.toggleModal}
								disabled={!this.formValid()}
								isPending={sendingRequest}
							/>
						</View>
					</View>
				</View>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={this.toggleModal}
				>
					<View style={modal.centeredView}>
						<View style={[modal.view, styles.modalView]}>
							<View	>
								<Normal style={[modal.title, { marginBottom: 15 }]}>{validate.identityFromCoopsol}</Normal>
								<Small style={description}>{validate.descriptionSharing}</Small>
								<Small style={description}>{validate.willBeContactingBrevity}</Small>
							</View>
							<View style={modal.footer}>
								<DidiButton onPress={this.handleValidateConfirm} title={accept} style={modal.smallButton} />
							</View>
						</View>
					</View>
				</Modal>
			</ScrollView>
		);
	}
}

export default didiConnect(
	CoopsolValidationScreen,
	state => ({
		email: getEmail(state.activeSpecialCredentials),
		phoneNumber: getPhoneNumber(state.activeSpecialCredentials)
	})
);

const styles = StyleSheet.create({
	area: {
		padding: 25
	},
	border: {
		borderWidth: 1,
		borderColor: colors.primary,
		borderRadius: 5
	},
	button: {
		backgroundColor:colors.primary,
		color: colors.white,
		padding: '8%'
	},
	container: {
		padding: 15
	},
	modalView: {
		alignItems: "center"
	},
	description: {
		textAlign: "center",
		marginVertical: 10
	},
	text: {
		color: colors.primary,
		textAlign: "center",
		marginBottom: 20
	},
	textWillBeContacting:{
		color: colors.primary,
		textAlign: "left",
		marginBottom: 20
	},
	input: {
		marginVertical: 15
	},
	value: {
		textAlign: "left"
	}
});
