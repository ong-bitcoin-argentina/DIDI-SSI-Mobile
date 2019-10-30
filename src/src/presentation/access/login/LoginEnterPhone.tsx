import React from "react";

import { EnterPhoneScreen } from "../../common/EnterPhone";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { SendSmsValidatorArguments, SendSmsValidatorState } from "../../../services/user/sendSmsValidator";
import { didiConnect } from "../../../store/store";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

import { LoginVerifyPhoneProps } from "./LoginVerifyPhone";

export type LoginEnterPhoneProps = {};
interface LoginEnterPhoneStateProps {
	requestSmsCodeState: SendSmsValidatorState;
}
interface LoginEnterPhoneDispatchProps {
	requestSmsCode(args: SendSmsValidatorArguments): void;
}
type LoginEnterPhoneInternalProps = LoginEnterPhoneProps & LoginEnterPhoneStateProps & LoginEnterPhoneDispatchProps;

export interface LoginEnterPhoneNavigation {
	LoginVerifyPhone: LoginVerifyPhoneProps;
}

class LoginEnterPhoneScreen extends NavigationEnabledComponent<
	LoginEnterPhoneInternalProps,
	{},
	LoginEnterPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar");

	render() {
		return (
			<EnterPhoneScreen
				contentImageSource={require("../resources/images/login.png")}
				onPressContinueButton={inputPhoneNumber => this.onPressContinueButton(inputPhoneNumber)}
				isPending={this.props.requestSmsCodeState.state === "PENDING"}
			/>
		);
	}

	componentDidUpdate() {
		if (this.props.requestSmsCodeState.state === "SUCCESS") {
			this.navigate("LoginVerifyPhone", {});
		}
	}

	private onPressContinueButton(inputPhoneNumber: string) {
		this.props.requestSmsCode({
			cellPhoneNumber: inputPhoneNumber,
			did: "did:ethr:0x460fec23bd53610bf6d0ed6c6a1bef5ec86e740d"
		});
	}
}

const connected = didiConnect(
	LoginEnterPhoneScreen,
	(state): LoginEnterPhoneStateProps => ({
		requestSmsCodeState: state.serviceCalls.sendSmsValidator
	}),
	(dispatch): LoginEnterPhoneDispatchProps => ({
		requestSmsCode: (args: SendSmsValidatorArguments) =>
			dispatch({
				type: "SERVICE_SEND_SMS_VALIDATOR",
				serviceAction: { type: "START", args }
			})
	})
);

export { connected as LoginEnterPhoneScreen };
