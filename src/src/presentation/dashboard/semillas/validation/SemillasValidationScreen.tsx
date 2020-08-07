import React from "react";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import { View, StyleSheet, Modal } from "react-native";
import { DidiText } from "../../../util/DidiText";
import colors from "../../../resources/colors";
import DidiTextInput from "../../../util/DidiTextInput";
import strings from "../../../resources/strings";
import DidiButton from "../../../util/DidiButton";
import { ScrollView } from "react-native-gesture-handler";
import commonStyles from "../../../resources/commonStyles";
import SemillasValidationForm from "./SemillasValidationForm";
const { Small } = DidiText.Explanation;

const { validate } = strings.semillas;

type Props = {};

type State = {
	dni: string;
	name: string;
	lastname: string;
	modalVisible: boolean;
	formValid: boolean;
};

export default class SemillasValidationScreen extends NavigationEnabledComponent<Props, State, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.validationTitle);

	constructor(props: Props) {
		super(props);
		this.state = {
			dni: "",
			name: "",
			lastname: "",
			modalVisible: false,
			formValid: false
		};
	}

	toggleModal = () => {
		this.setState({ modalVisible: !this.state.modalVisible });
	};

	render() {
		const { border, area, text, button } = styles;
		const { formValid } = this.state;
		const { modal } = commonStyles;
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={[border, area]}>
						<Small style={text}>{validate.description}</Small>
						<Small style={text}>{validate.needData}</Small>

						<SemillasValidationForm onChangeValidation={formValid => this.setState({ formValid })} />

						<Small style={text}>{validate.willBeContacting}</Small>
						<View>
							<DidiButton
								title={validate.DNI}
								style={[commonStyles.button.lightGreen, button]}
								titleStyle={{ fontSize: 14 }}
								onPress={this.toggleModal}
								disabled={!formValid}
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
						<View style={[modal.view, { height: "60%" }]}>
							<View style={modal.footer}>
								<DidiButton onPress={this.toggleModal} title={strings.general.cancel} style={modal.smallButton} />
							</View>
						</View>
					</View>
				</Modal>
			</ScrollView>
		);
	}
}

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

	text: {
		color: colors.greenSemillas,
		fontSize: 14,
		textAlign: "left",
		marginBottom: 8
	}
});
