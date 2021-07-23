import React from "react";

import { EnterEmailScreen } from "../../common/EnterEmail";
import { ServiceObserver } from "../../common/ServiceObserver";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../services/ServiceStateStore";
import { userLogin } from "../../../services/user/userLogin";
import { didiConnect } from "../../../store/store";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import strings from "../../resources/strings";

interface LoginScreenStateProps {
	loginPending: boolean;
}
interface LoginScreenDispatchProps {
	login: (email: string, password: string) => void;
}
type LoginScreenInternalProps = LoginScreenStateProps & LoginScreenDispatchProps;

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

	render() {
		return (
			<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.navigate("Dashboard", {})}>
				<EnterEmailScreen
					description={strings.login.messageHead}
					contentImageSource={require("../../resources/images/login.png")}
					buttonTitle={strings.login.buttonText}
					isPasswordRequired={true}
					onPressContinueButton={(email, password) => this.props.login(email, password)}
					isContinuePending={this.props.loginPending}
				/>
			</ServiceObserver>
		);
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
