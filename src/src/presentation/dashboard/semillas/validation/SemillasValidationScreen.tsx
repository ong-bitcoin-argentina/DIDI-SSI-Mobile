import React from "react";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import { View, StyleSheet, Modal } from "react-native";
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
const { Tiny, Small, Normal } = DidiText.Explanation;
const { validate } = strings.semillas;
const { declaredDNI, nameAndLastname, phone } = strings.general;
const { accept, reject } = strings.buttons;

interface Navigation {
	DashboardHome: DashboardScreenProps;
}

interface DispatchProps {
	semillasValidationStart: () => void;
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

	handleConfirm = () => {
		// TODO: when endpoint is ready, make a fetch and show success or error with an Alert
		this.props.semillasValidationStart();
		this.toggleModal();
		this.navigate("DashboardHome", {});
	};

	render() {
		const { border, area, text, button, input, value, description } = styles;
		const { dni, name, lastname } = this.state;
		const { email, phoneNumber } = this.props;
		const { modal } = commonStyles;
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={[border, area]}>
						<Small style={text}>{validate.description}</Small>
						<Small style={text}>{validate.needData}</Small>

						<View style={input}>
							<DidiTextInput.DNI onChangeText={dni => this.setState({ dni })} />
						</View>
						<View style={input}>
							<DidiTextInput.FirstName onChangeText={name => this.setState({ name })} />
						</View>
						<View style={input}>
							<DidiTextInput.LastName onChangeText={lastname => this.setState({ lastname })} />
						</View>

						<Small style={text}>{validate.willBeContacting}</Small>
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
							<Normal style={[modal.title, { marginBottom: 15 }]}>{validate.identityFromSemillas}</Normal>
							<Tiny style={description}>{validate.descriptionSharing}</Tiny>
							<Tiny style={value}>{`${declaredDNI}: ${dni}`}</Tiny>
							<Tiny style={value}>{`${nameAndLastname}: ${name} ${lastname}`}</Tiny>
							<Tiny style={value}>{`${phone}: ${phoneNumber}`}</Tiny>
							<Tiny style={value}>{`${strings.general.email}: ${email}`}</Tiny>

							<Tiny style={description}>{validate.willBeContactingBrevity}</Tiny>
							<View style={modal.footer}>
								<DidiButton onPress={this.toggleModal} title={reject} style={modal.smallButton} />
								<DidiButton onPress={this.handleConfirm} title={accept} style={modal.smallButton} />
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
		semillasValidationStart: () => dispatch({ type: "VALIDATE_SEMILLAS_DNI_START" })
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
		justifyContent: "flex-start",
		alignContent: "flex-start",
		alignItems: "flex-start",
		height: "70%"
	},
	description: {
		textAlign: "left",
		marginVertical: 10
	},
	text: {
		color: colors.greenSemillas,
		fontSize: 14,
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
