import React from "react";

import { isPendingService } from "../../services/ServiceStateStore";
import { sendSmsValidator } from "../../services/user/sendSmsValidator";
import { didiConnect } from "../../store/store";

import { EnterPhoneProps, EnterPhoneScreen } from "./EnterPhone";
import { ServiceObserver } from "./ServiceObserver";

export interface EnterPhoneWrapperProps {
	onServiceSuccess(phoneNumber: string): void;
	contentImageSource: EnterPhoneProps["contentImageSource"];
}
interface EnterPhoneWrapperStateProps {
	requestSmsCodePending: boolean;
}
interface EnterPhoneWrapperDispatchProps {
	requestSmsCode: (cellPhoneNumber: string) => void;
}
type LoginEnterPhoneInternalProps = EnterPhoneWrapperProps &
	EnterPhoneWrapperStateProps &
	EnterPhoneWrapperDispatchProps;

const serviceKey = "EnterPhone";

class EnterPhoneWrapper extends React.Component<LoginEnterPhoneInternalProps, { phoneNumber: string }> {
	constructor(props: LoginEnterPhoneInternalProps) {
		super(props);
		this.state = { phoneNumber: "" };
	}
	render() {
		return (
			<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.props.onServiceSuccess(this.state.phoneNumber)}>
				<EnterPhoneScreen
					{...this.props}
					onPressContinueButton={inputPhoneNumber => this.onPressContinueButton(inputPhoneNumber)}
					isContinuePending={this.props.requestSmsCodePending}
				/>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(inputPhoneNumber: string) {
		this.setState({ phoneNumber: inputPhoneNumber });
		this.props.requestSmsCode(inputPhoneNumber);
	}
}

const connected = didiConnect(
	EnterPhoneWrapper,
	(state): EnterPhoneWrapperStateProps => ({
		requestSmsCodePending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): EnterPhoneWrapperDispatchProps => ({
		requestSmsCode: (cellPhoneNumber: string) => dispatch(sendSmsValidator(serviceKey, cellPhoneNumber))
	})
);

export { connected as EnterPhoneWrapper };
