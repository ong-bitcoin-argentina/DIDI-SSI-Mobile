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
import { validateDniWithSemillas } from "../../../../services/semillas/validateDni";
import { SemillasNeedsToValidateDni } from "didi-sdk";
import { ServiceObserver } from "../../../common/ServiceObserver";
import KeyValueText from "../../../util/KeyValueText";
const { Small, Normal } = DidiText.Explanation;
const { validate } = strings.semillas;
const { declaredDNI, nameAndLastname, phone } = strings.general;
const { accept, reject } = strings.buttons;

const serviceKey = "ValidateDniWithSemillas";

interface Navigation {
	DashboardHome: DashboardScreenProps;
}

interface DispatchProps {
	semillasValidationStart: (data: SemillasNeedsToValidateDni) => void;
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
};

class SemillasValidationScreen extends NavigationEnabledComponent<Props, State, Navigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.validationTitle);

	constructor(props: Props) {
		super(props);
		this.state = {
			dni: "",
			name: "",
			lastname: "",
			modalVisible: false
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
		// TODO: when endpoint is ready, make a fetch and show success or error with an Alert
		const { dni, name, lastname } = this.state;
		const { email, phoneNumber } = this.props;
		const data = {
			dni,
			phoneNumber,
			email,
			name,
			lastname
		};
		this.props.semillasValidationStart(data);
		this.toggleModal();
	};

	onSuccessRequest = () => {
		Alert.alert(strings.semillas.program, validate.successRequest, [
			{ text: "OK", onPress: () => this.navigate("DashboardHome", {}) }
		]);
	};

	render() {
		const { border, area, text, button, input, value, description } = styles;
		const { dni, name, lastname } = this.state;
		const { email, phoneNumber } = this.props;
		const { modal } = commonStyles;
		return (
			<ScrollView>
				<ServiceObserver serviceKey={serviceKey} onSuccess={this.onSuccessRequest} />
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

						<Normal style={text}>{validate.willBeContacting}</Normal>
						<View>
							<DidiButton
								title={validate.DNI}
								style={[commonStyles.button.lightGreen, button]}
								titleStyle={{ fontSize: 14 }}
								onPress={this.toggleModal}
								disabled={!this.formValid()}
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
							<View style={{}}>
								<Normal style={[modal.title, { marginBottom: 15 }]}>{validate.identityFromSemillas}</Normal>
								<Small style={description}>{validate.descriptionSharing}</Small>
								<KeyValueText name={declaredDNI} value={dni} />
								<KeyValueText name={nameAndLastname} value={`${name} ${lastname}`} />
								<KeyValueText name={phone} value={dni} />
								<KeyValueText name={strings.general.email} value={email} />
								<Small style={description}>{validate.willBeContactingBrevity}</Small>
							</View>
							<View style={modal.footer}>
								<DidiButton onPress={this.toggleModal} title={reject} style={modal.smallButton} />
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
	SemillasValidationScreen,
	state => ({
		email: getEmail(state.activeSpecialCredentials),
		phoneNumber: getPhoneNumber(state.activeSpecialCredentials)
	}),
	(dispatch): DispatchProps => ({
		semillasValidationStart: data => dispatch(validateDniWithSemillas(serviceKey, data))
	})
);

const styles = StyleSheet.create({
	area: {
		padding: 20
	},
	border: {
		borderWidth: 1,
		borderColor: colors.greenSemillas,
		borderRadius: 5
	},
	button: {
		marginTop: 10
	},
	container: {
		padding: 15
	},
	modalView: {
		alignItems: "flex-start"
	},
	description: {
		textAlign: "left",
		marginVertical: 10
	},
	text: {
		color: colors.greenSemillas,
		textAlign: "left",
		marginBottom: 8
	},
	input: {
		marginVertical: 10
	},
	value: {
		textAlign: "left"
	}
});
