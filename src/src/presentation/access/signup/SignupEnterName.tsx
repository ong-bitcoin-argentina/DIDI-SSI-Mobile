import React from "react";
import { Image, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import Validator from "../helpers/validator";

import { SignupEnterEmailProps } from "./SignupEnterEmail";

export interface SignupEnterNameProps {
	phoneNumber: string;
}
interface SignupEnterNameDispatchProps {
	saveName: (name: string) => void;
}
type SignupEnterNameInternalProps = SignupEnterNameProps & SignupEnterNameDispatchProps;

interface SignupEnterNameState {
	name: string;
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
			name: ""
		};
	}

	private canPressContinueButton(): boolean {
		return Validator.isName(this.state.name);
	}

	render() {
		return (
			<DidiScreen>
				<DidiText.Explanation.Emphasis>{strings.signup.enterName.messageHead}</DidiText.Explanation.Emphasis>

				<DidiTextInput.FullName onChangeText={text => this.setState({ name: text })} />

				<Image style={commonStyles.image.image} source={require("../../resources/images/login.png")} />

				<View />

				<DidiButton
					disabled={!this.canPressContinueButton()}
					onPress={() => {
						this.props.saveName(this.state.name);
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
		saveName: (fullName: string) =>
			dispatch({
				type: "IDENTITY_PATCH",
				value: {
					personalData: { fullName },
					visual: {},
					address: {}
				}
			})
	})
);

export { connected as SignupEnterNameScreen };
