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
		return Validations.isName(this.state.firstName) && Validations.isName(this.state.lastName);
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
