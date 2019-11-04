import React from "react";

import { ServiceWrapper } from "../../services/common/ServiceWrapper";

import { VerifySmsCodeState } from "../../services/user/verifySmsCode";
import { didiConnect } from "../../store/store";

import { VerifyPhoneProps, VerifyPhoneScreen } from "./VerifyPhone";

interface VerifyPhoneWrapperProps {
	onServiceSuccess(): void;
	contentImageSource: VerifyPhoneProps["contentImageSource"];
}
interface VerifyPhoneWrapperStateProps {
	verifyPhoneCodeState: VerifySmsCodeState;
}
interface VerifyPhoneWrapperDispatchProps {
	verifyPhoneCode(code: string): void;
	dropVerifyPhoneCode(): void;
}
type VerifyPhoneWrapperInternalProps = VerifyPhoneWrapperProps &
	VerifyPhoneWrapperStateProps &
	VerifyPhoneWrapperDispatchProps;

class VerifyPhoneWrapper extends React.Component<VerifyPhoneWrapperInternalProps> {
	render() {
		return (
			<ServiceWrapper
				serviceState={this.props.verifyPhoneCodeState}
				onServiceSuccess={() => this.props.onServiceSuccess()}
				resetService={() => this.props.dropVerifyPhoneCode()}
			>
				<VerifyPhoneScreen
					contentImageSource={this.props.contentImageSource}
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
	VerifyPhoneWrapper,
	(state): VerifyPhoneWrapperStateProps => ({
		verifyPhoneCodeState: state.serviceCalls.verifySmsCode
	}),
	(dispatch): VerifyPhoneWrapperDispatchProps => ({
		verifyPhoneCode: (validationCode: string) =>
			dispatch({
				type: "SERVICE_VERIFY_SMS_CODE",
				serviceAction: {
					type: "START",
					args: { validationCode }
				}
			}),
		dropVerifyPhoneCode: () => dispatch({ type: "SERVICE_VERIFY_SMS_CODE", serviceAction: { type: "DROP" } })
	})
);

export { connected as VerifyPhoneWrapper };
