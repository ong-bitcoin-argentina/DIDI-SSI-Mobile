import React from "react";
import { Image, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { Validations } from "../../../model/Validations";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";

import { SignupEnterEmailProps } from "./SignupEnterEmail";

export interface SignupEnterNameProps {
	phoneNumber: string;
}
interface SignupEnterNameDispatchProps {
	saveName: (firstNames: string, lastNames: string) => void;
}
type SignupEnterNameInternalProps = SignupEnterNameProps & SignupEnterNameDispatchProps;

interface SignupEnterNameState {
	firstName: string;
	lastName: string;
}

export interface SignupEnterNameNavigation {
	SignupEnterEmail: SignupEnterEmailProps;
}

class SignupEnterNameScreen extends NavigationEnabledComponent<
	SignupEnterNameInternalProps,
	SignupEnterNameState,
	SignupEnterNameNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.signup.barTitle);

	constructor(props: SignupEnterNameInternalProps) {
		super(props);
		this.state = {
			firstName: "",
			lastName: ""
		};
	}

	private canPressContinueButton(): boolean {
		let result = this.specialCharacter();
		if (result) {
			return Validations.isName(this.state.firstName) && Validations.isName(this.state.lastName);
		} else {
			return false;
		}
	}
	private specialCharacter(): boolean {
		let correctedFirstName = false;
		let correctedLastName = false;
		let lowerFirstName = this.state.firstName.toLowerCase();
		let upperFirstName = this.state.firstName.toUpperCase();
		let correctedTextFirstName = "";
		for (let i = 0; i < lowerFirstName.length; ++i) {
			if (lowerFirstName[i] != upperFirstName[i] || lowerFirstName[i].trim() === "") correctedTextFirstName += this.state.firstName[i];
		}
		if (correctedTextFirstName === this.state.firstName) {
			correctedFirstName = true;
		}
		let lowerLastName = this.state.lastName.toLowerCase();
		let upperLastName = this.state.lastName.toUpperCase();
		let correctedTextLastName = "";
		for (let i = 0; i < lowerLastName.length; ++i) {
			if (lowerLastName[i] != upperLastName[i] || lowerLastName[i].trim() === "") correctedTextLastName += this.state.lastName[i];
		}
		if (correctedTextLastName === this.state.lastName) {
			correctedLastName = true;
		}
		if (correctedFirstName === true && correctedLastName === true) {
			return true;
		} else {
			return false;
		}
	}
	render() {
		return (
			<DidiScreen>
				<DidiText.Explanation.Emphasis>{strings.signup.enterName.messageHead}</DidiText.Explanation.Emphasis>

				<DidiTextInput.FirstName onChangeText={text => this.setState({ firstName: text })} />

				<DidiTextInput.LastName onChangeText={text => this.setState({ lastName: text })} />

				<Image style={commonStyles.image.image} source={require("../../resources/images/login.png")} />

				<View />

				<DidiButton
					disabled={!this.canPressContinueButton()}
					onPress={() => {
						this.props.saveName(this.state.firstName, this.state.lastName);
						this.navigate("SignupEnterEmail", { phoneNumber: this.props.phoneNumber });
					}}
					title={strings.signup.enterName.next}
				/>
			</DidiScreen>
		);
	}
}

const connected = didiConnect(
	SignupEnterNameScreen,
	() => ({}),
	(dispatch): SignupEnterNameDispatchProps => ({
		saveName: (firstNames: string, lastNames: string) =>
			dispatch({
				type: "IDENTITY_PATCH",
				value: {
					personalData: { firstNames, lastNames },
					visual: {},
					address: {}
				}
			})
	})
);

export { connected as SignupEnterNameScreen };
