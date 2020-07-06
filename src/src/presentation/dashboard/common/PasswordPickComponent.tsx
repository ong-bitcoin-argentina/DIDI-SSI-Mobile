import React, { Fragment } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import TypedObject from "../../../util/TypedObject";
import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import { ValidationStateIcon } from "../../util/ValidationStateIcon";

import { Validations } from "../../../model/Validations";
import { ValidationState } from "../../../store/selector/combinedIdentitySelector";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

interface Props {
	onPasswordChange: (password: string | null) => void;
	showFullPasswordRequirements?: boolean;
}

interface State {
	password: string;
	passwordCopy: string;
}

export class PasswordPickComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			password: "",
			passwordCopy: ""
		};
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		const password = (state: State) =>
			state.password === state.passwordCopy && this.validPasswords() && Validations.isPassword(state.password)
				? state.password
				: null;
		if (password(this.state) !== password(prevState)) {
			this.props.onPasswordChange(password(this.state));
		}
	}

	validPasswords = () => {
		const { password, passwordCopy } = this.state;

		return this.passwordErrors(password).length === 0 && this.passwordErrors(passwordCopy).length === 0;
	};

	render() {
		const { password } = this.state;
		const passwordErrors = this.passwordErrors(password);

		return (
			<Fragment>
				<View>
					<DidiTextInput.Password
						onChangeText={text => this.setState({ password: text })}
						descriptionType="NEW"
						stateIndicator={this.renderPasswordStateIndicator()}
					/>

					{this.props.showFullPasswordRequirements ? (
						<View>
							<DidiText.ChangePassword.Explanation>
								{strings.userData.changePassword.requirementHeader}
							</DidiText.ChangePassword.Explanation>
							{TypedObject.keys(strings.userData.changePassword.requirements).map(key => {
								const accepted = passwordErrors.find(e => e.toString() === key) === undefined;

								const indicator = accepted
									? strings.userData.changePassword.indicator.ok
									: strings.userData.changePassword.indicator.missing;
								const text = strings.userData.changePassword.requirements[key];
								const color = accepted ? colors.success : undefined;
								return (
									<DidiText.ChangePassword.EnumerationItem style={{ color }} key={key}>
										{indicator}
										{text}
									</DidiText.ChangePassword.EnumerationItem>
								);
							})}
						</View>
					) : (
						<DidiText.InputDescription style={{ textAlign: "center" }}>
							{strings.accessCommon.passwordDescription}
						</DidiText.InputDescription>
					)}
				</View>

				<View>
					<DidiTextInput.Password
						onChangeText={text => this.setState({ passwordCopy: text })}
						descriptionType="REPEAT"
						stateIndicator={this.renderPasswordCopyStateIndicator()}
					/>

					{this.props.showFullPasswordRequirements ? (
						<DidiText.ChangePassword.Error>
							{this.arePasswordsDifferent() && this.state.passwordCopy.length > 0
								? strings.userData.changePassword.mismatch
								: ""}
						</DidiText.ChangePassword.Error>
					) : null}
				</View>
			</Fragment>
		);
	}

	private renderPasswordStateIndicator() {
		const { password } = this.state;

		if (!password) {
			return undefined;
		}
		const errors = this.passwordErrors(password);
		if (errors.length === 0) {
			return (
				<View style={{ padding: 10, justifyContent: "center" }}>
					<ValidationStateIcon validationState={ValidationState.Approved} useWords={false} />
				</View>
			);
		} else {
			return (
				<TouchableOpacity style={{ padding: 10, justifyContent: "center" }} onPress={() => this.alertPasswordErrors()}>
					<ValidationStateIcon validationState={ValidationState.Rejected} useWords={false} />
				</TouchableOpacity>
			);
		}
	}

	private renderPasswordCopyStateIndicator() {
		const { passwordCopy } = this.state;
		if (!passwordCopy) {
			return undefined;
		} else if (this.arePasswordsDifferent() || this.passwordErrors(passwordCopy).length > 0) {
			return (
				<TouchableOpacity style={{ padding: 10, justifyContent: "center" }} onPress={() => this.alertPasswordsDiffer()}>
					<ValidationStateIcon validationState={ValidationState.Rejected} useWords={false} />
				</TouchableOpacity>
			);
		} else {
			return (
				<View style={{ padding: 10, justifyContent: "center" }}>
					<ValidationStateIcon validationState={ValidationState.Approved} useWords={false} />
				</View>
			);
		}
	}

	private passwordErrors(password: string) {
		return Validations.validatePassword(password);
	}

	private arePasswordsDifferent() {
		return this.state.password !== this.state.passwordCopy;
	}

	private alertPasswordErrors() {
		const { password } = this.state;
		const errors = this.passwordErrors(password);

		const messages = TypedObject.keys(strings.userData.changePassword.requirements).map(key => {
			const accepted = errors.find(e => e.toString() === key) === undefined;

			const indicator = accepted
				? strings.userData.changePassword.indicator.ok
				: strings.userData.changePassword.indicator.missing;
			const text = strings.userData.changePassword.requirements[key];
			return `${indicator}${text}`;
		});
		Alert.alert("Requisitos de contraseña", messages.join("\n"));
	}

	private alertPasswordsDiffer() {
		Alert.alert("Las contraseñas no coinciden");
	}
}
