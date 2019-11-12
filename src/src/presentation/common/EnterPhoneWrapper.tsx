import { boolean } from "io-ts";
import React from "react";

import { ensureDid } from "../../services/internal/ensureDid";
import { isPendingService } from "../../services/ServiceStateStore";
import { sendSmsValidator } from "../../services/user/sendSmsValidator";
import { didiConnect } from "../../store/store";

import { EnterPhoneProps, EnterPhoneScreen } from "./EnterPhone";
import { ServiceObserver } from "./ServiceObserver";

export interface EnterPhoneWrapperProps {
	onServiceSuccess(phoneNumber: string): void;
	contentImageSource: EnterPhoneProps["contentImageSource"];
	shouldCreateDid: boolean;
	isPasswordRequired: boolean;
	password: string | null;
}

interface EnterPhoneWrapperStateProps {
	requestSmsCodePending: boolean;
}
interface EnterPhoneWrapperDispatchProps {
	requestSmsCode: (createDid: boolean, cellPhoneNumber: string, password: string | null) => void;
}
type EnterPhoneInternalProps = EnterPhoneWrapperProps & EnterPhoneWrapperStateProps & EnterPhoneWrapperDispatchProps;

const serviceKey = "EnterPhone";

class EnterPhoneWrapper extends React.Component<EnterPhoneInternalProps, { phoneNumber: string }> {
	constructor(props: EnterPhoneInternalProps) {
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
		this.props.requestSmsCode(this.props.shouldCreateDid, inputPhoneNumber, password || this.props.password);
	}
}

const connected = didiConnect(
	EnterPhoneWrapper,
	(state): EnterPhoneWrapperStateProps => ({
		requestSmsCodePending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): EnterPhoneWrapperDispatchProps => ({
		requestSmsCode: (createDid: boolean, cellPhoneNumber: string, password: string | null) => {
			let call = sendSmsValidator(serviceKey, cellPhoneNumber, password);
			if (createDid) {
				call = ensureDid(serviceKey, call);
			}
			dispatch(call);
		}
	})
);

export { connected as EnterPhoneWrapper };
