import React from "react";

import { ServiceWrapper } from "../../../services/common/ServiceWrapper";
import { VerifyPhoneScreen } from "../../common/VerifyPhone";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { VerifySmsCodeState } from "../../../services/user/verifySmsCode";
import { didiConnect } from "../../../store/store";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

export type LoginVerifyPhoneProps = {};
interface LoginVerifyPhoneStateProps {
	verifyPhoneCodeState: VerifySmsCodeState;
}
interface LoginVerifyPhoneDispatchProps {
	verifyPhoneCode(code: string): void;
}
type LoginVerifyPhoneInternalProps = LoginVerifyPhoneProps & LoginVerifyPhoneStateProps & LoginVerifyPhoneDispatchProps;

export type LoginVerifyPhoneNavigation = {
	Dashboard: DashboardScreenProps;
};

class LoginVerifyPhoneScreen extends NavigationEnabledComponent<
	LoginVerifyPhoneInternalProps,
	{},
	LoginVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ingresar");

	render() {
		return (
			<ServiceWrapper
				serviceState={this.props.verifyPhoneCodeState}
				onServiceSuccess={() => this.navigate("Dashboard", {})}
			>
				<VerifyPhoneScreen
					contentImageSource={require("../resources/images/loginVerify.png")}
					onPressContinueButton={inputCode => this.onPressContinueButton(inputCode)}
					isContinuePending={this.props.verifyPhoneCodeState.state === "PENDING"}
				/>
			</ServiceWrapper>
		);
	}

	private onPressContinueButton(inputCode: string) {
		this.props.verifyPhoneCode(inputCode);
	}
}

const connected = didiConnect(
	LoginVerifyPhoneScreen,
	(state): LoginVerifyPhoneStateProps => ({
		verifyPhoneCodeState: state.serviceCalls.verifySmsCode
	}),
	(dispatch): LoginVerifyPhoneDispatchProps => ({
		verifyPhoneCode: (validationCode: string) =>
			dispatch({
				type: "SERVICE_VERIFY_SMS_CODE",
				serviceAction: {
					type: "START",
					args: { did: "did:ethr:0x460fec23bd53610bf6d0ed6c6a1bef5ec86e740d", validationCode }
				}
			})
	})
);

export { connected as LoginVerifyPhoneScreen };
