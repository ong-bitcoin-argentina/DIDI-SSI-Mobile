import React from "react";

import { ServiceWrapper } from "../../services/common/ServiceWrapper";

import { SendSmsValidatorArguments, SendSmsValidatorState } from "../../services/user/sendSmsValidator";
import { didiConnect } from "../../store/store";

import { EnterPhoneProps, EnterPhoneScreen } from "./EnterPhone";

export interface EnterPhoneWrapperProps {
	onServiceSuccess(): void;
	contentImageSource: EnterPhoneProps["contentImageSource"];
}
interface EnterPhoneWrapperStateProps {
	requestSmsCodeState: SendSmsValidatorState;
}
interface EnterPhoneWrapperDispatchProps {
	requestSmsCode(args: SendSmsValidatorArguments): void;
}
type LoginEnterPhoneInternalProps = EnterPhoneWrapperProps &
	EnterPhoneWrapperStateProps &
	EnterPhoneWrapperDispatchProps;

class EnterPhoneWrapper extends React.Component<LoginEnterPhoneInternalProps> {
	render() {
		return (
			<ServiceWrapper
				serviceState={this.props.requestSmsCodeState}
				onServiceSuccess={() => this.props.onServiceSuccess()}
			>
				<EnterPhoneScreen
					{...this.props}
					onPressContinueButton={inputPhoneNumber => this.onPressContinueButton(inputPhoneNumber)}
				/>
			</ServiceWrapper>
		);
	}

	private onPressContinueButton(inputPhoneNumber: string) {
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
			})
	})
);

export { connected as EnterPhoneWrapper };
