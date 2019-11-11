import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import { isPendingService } from "../../../services/ServiceStateStore";
import { userLogin } from "../../../services/user/userLogin";
import { didiConnect } from "../../../store/store";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import Validator from "../helpers/validator";

export interface LoginScreenProps {}
interface LoginScreenStateProps {
	loginPending: boolean;
}
interface LoginScreenDispatchProps {
	login: (email: string, password: string) => void;
}
type LoginScreenInternalProps = LoginScreenProps & LoginScreenStateProps & LoginScreenDispatchProps;

interface LoginScreenState {
	email: string;
	password: string;
}

export interface LoginScreenNavigation {
	Dashboard: DashboardScreenProps;
}

const serviceKey = "Login";

class LoginScreen extends NavigationEnabledComponent<
	LoginScreenInternalProps,
	LoginScreenState,
	LoginScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar");

	private canPressContinueButton(): boolean {
		return this.state && this.state.password
			? this.state.password.length > 0 && Validator.isEmail(this.state.email)
			: false;
	}

	render() {
		return (
			<DidiScreen>
				<Text style={commonStyles.text.emphasis}>{strings.login.messageHead}</Text>

				<Image source={require("../resources/images/login.png")} style={commonStyles.image.image} />

				<DidiTextInput.Email onChangeText={text => this.setState({ email: text })} />

				<DidiTextInput.Password onChangeText={text => this.setState({ password: text })} descriptionType="BASIC" />

				<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.navigate("Dashboard", {})} />
				<DidiServiceButton
					onPress={() => this.onPressContinue()}
					disabled={!this.canPressContinueButton()}
					title={strings.login.buttonText}
					isPending={this.props.loginPending}
				/>
			</DidiScreen>
		);
	}

	private onPressContinue() {
		this.props.login(this.state.email, this.state.password);
	}
}

const connected = didiConnect(
	LoginScreen,
	(state): LoginScreenStateProps => ({
		loginPending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): LoginScreenDispatchProps => ({
		login: (email: string, password: string) => dispatch(userLogin(serviceKey, email, password))
	})
);

export { connected as LoginScreen };
