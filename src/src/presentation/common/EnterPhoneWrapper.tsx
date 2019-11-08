import { boolean } from "io-ts";
import React from "react";

import { isPendingService } from "../../services/ServiceStateStore";
import { sendSmsValidator } from "../../services/user/sendSmsValidator";
import { didiConnect } from "../../store/store";

import { EnterPhoneProps, EnterPhoneScreen } from "./EnterPhone";
import { ServiceObserver } from "./ServiceObserver";

export interface EnterPhoneWrapperProps {
	onServiceSuccess(phoneNumber: string): void;
	contentImageSource: EnterPhoneProps["contentImageSource"];
	isPasswordRequired: boolean;
	password: string | null;
}

interface EnterPhoneWrapperStateProps {
	requestSmsCodePending: boolean;
}
interface EnterPhoneWrapperDispatchProps {
	requestSmsCode: (cellPhoneNumber: string, password: string | null) => void;
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
					isPasswordRequired={this.props.isPasswordRequired && this.props.password === null}
					onPressContinueButton={(inputPhoneNumber, password) => this.onPressContinueButton(inputPhoneNumber, password)}
					isContinuePending={this.props.requestSmsCodePending}
				/>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(inputPhoneNumber: string, password: string | null) {
		this.setState({ phoneNumber: inputPhoneNumber });
		this.props.requestSmsCode(inputPhoneNumber, password || this.props.password);
	}
}

const connected = didiConnect(
	EnterPhoneWrapper,
	(state): EnterPhoneWrapperStateProps => ({
		requestSmsCodePending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): EnterPhoneWrapperDispatchProps => ({
		requestSmsCode: (cellPhoneNumber: string, password: string | null) =>
			dispatch(sendSmsValidator(serviceKey, cellPhoneNumber, password))
	})
);

export { connected as EnterPhoneWrapper };
