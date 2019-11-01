import React from "react";

import { ServiceWrapper } from "../../services/common/ServiceWrapper";

import { SendSmsValidatorArguments, SendSmsValidatorState } from "../../services/user/sendSmsValidator";
import { didiConnect } from "../../store/store";

import { EnterPhoneProps, EnterPhoneScreen } from "./EnterPhone";

export interface EnterPhoneWrapperProps {
	onServiceSuccess(phoneNumber: string): void;
	contentImageSource: EnterPhoneProps["contentImageSource"];
}
interface EnterPhoneWrapperStateProps {
	requestSmsCodeState: SendSmsValidatorState;
}
interface EnterPhoneWrapperDispatchProps {
	requestSmsCode(args: SendSmsValidatorArguments): void;
	dropRequestSmsCode(): void;
}
type LoginEnterPhoneInternalProps = EnterPhoneWrapperProps &
	EnterPhoneWrapperStateProps &
	EnterPhoneWrapperDispatchProps;

class EnterPhoneWrapper extends React.Component<LoginEnterPhoneInternalProps, { phoneNumber: string }> {
	constructor(props: LoginEnterPhoneInternalProps) {
		super(props);
		this.state = { phoneNumber: "" };
	}
	render() {
		return (
			<ServiceWrapper
				serviceState={this.props.requestSmsCodeState}
				onServiceSuccess={() => this.props.onServiceSuccess(this.state.phoneNumber)}
				resetService={() => this.props.dropRequestSmsCode()}
			>
				<EnterPhoneScreen
					{...this.props}
					onPressContinueButton={inputPhoneNumber => this.onPressContinueButton(inputPhoneNumber)}
					isContinuePending={this.props.requestSmsCodeState.state === "PENDING"}
				/>
			</ServiceWrapper>
		);
	}

	private onPressContinueButton(inputPhoneNumber: string) {
		this.setState({ phoneNumber: inputPhoneNumber });
		this.props.requestSmsCode({
			cellPhoneNumber: inputPhoneNumber,
			did: "did:ethr:0x460fec23bd53610bf6d0ed6c6a1bef5ec86e740d"
		});
	}
}

const connected = didiConnect(
	EnterPhoneWrapper,
	(state): EnterPhoneWrapperStateProps => ({
		requestSmsCodeState: state.serviceCalls.sendSmsValidator
	}),
	(dispatch): EnterPhoneWrapperDispatchProps => ({
		requestSmsCode: (args: SendSmsValidatorArguments) =>
			dispatch({
				type: "SERVICE_SEND_SMS_VALIDATOR",
				serviceAction: { type: "START", args }
			}),
		dropRequestSmsCode: () =>
			dispatch({
				type: "SERVICE_SEND_SMS_VALIDATOR",
				serviceAction: { type: "DROP" }
			})
	})
);

export { connected as EnterPhoneWrapper };
