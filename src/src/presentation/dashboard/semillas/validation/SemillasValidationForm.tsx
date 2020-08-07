import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import DidiTextInput from "../../../util/DidiTextInput";
import { Validations } from "../../../../model/Validations";

type Props = {
	onChangeValidation: (valid: boolean) => void;
};

type State = {
	name: string;
	lastname: string;
	dni: string;
	formValid: boolean;
};

export default class SemillasValidationForm extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			name: "",
			lastname: "",
			dni: "",
			formValid: false
		};
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		const { dni, name, lastname } = this.state;
		const { isDNI, isName } = Validations;

		const formValid = isDNI(dni) && isName(name) && isName(lastname);
		if (formValid !== prevState.formValid) {
			this.setState({ formValid });
			this.props.onChangeValidation(formValid);
		}
	}

	shouldComponentUpdate(nextProps: Props, nextState: State) {
		const { dni, name, lastname } = this.state;
		return nextState.dni !== dni || nextState.name !== name || nextState.lastname !== lastname;
	}

	render() {
		const { input } = styles;
		return (
			<View>
				<View style={input}>
					<DidiTextInput.DNI onChangeText={dni => this.setState({ dni })} />
				</View>
				<View style={input}>
					<DidiTextInput.FirstName onChangeText={name => this.setState({ name })} />
				</View>
				<View style={input}>
					<DidiTextInput.LastName onChangeText={lastname => this.setState({ lastname })} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		marginVertical: 10
	}
});
