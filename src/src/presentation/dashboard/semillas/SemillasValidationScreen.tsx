import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { View, StyleSheet, Modal } from "react-native";
import { DidiText } from "../../util/DidiText";
import colors from "../../resources/colors";
import DidiTextInput from "../../util/DidiTextInput";
import strings from "../../resources/strings";
import DidiButton from "../../util/DidiButton";
import { ScrollView } from "react-native-gesture-handler";
import commonStyles from "../../resources/commonStyles";
const { Small } = DidiText.Explanation;

const { validate } = strings.semillas;

type Props = {};

type State = {
	dni?: string;
	modalVisible: boolean;
};

export default class SemillasValidationScreen extends NavigationEnabledComponent<Props, State, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.validationTitle);

	constructor(props: Props) {
		super(props);
		this.state = {
			dni: undefined,
			modalVisible: false
		};
	}

	toggleModal = () => {
		this.setState({ modalVisible: !this.state.modalVisible });
	};

	render() {
		const { border, area, text, input, button } = styles;
		const { modal } = commonStyles;
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={[border, area]}>
						<Small style={text}>{validate.description}</Small>
						<Small style={text}>{validate.writeDNI}</Small>
						<View style={input}>
							<DidiTextInput.DNI onChangeText={dni => this.setState({ dni })} />
						</View>
						<Small style={text}>{validate.willBeContacting}</Small>
						<View>
							<DidiButton
								title={validate.DNI}
								style={[commonStyles.button.lightGreen, button]}
								titleStyle={{ fontSize: 14 }}
								onPress={this.toggleModal}
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
	input: {
		marginVertical: 10
	},
	text: {
		color: colors.greenSemillas,
		fontSize: 14,
		textAlign: "left",
		marginBottom: 8
	}
});
