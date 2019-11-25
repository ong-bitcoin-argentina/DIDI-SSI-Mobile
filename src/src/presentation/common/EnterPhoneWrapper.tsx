import React from "react";

import { ensureDid } from "../../services/internal/ensureDid";
import { isPendingService } from "../../services/ServiceStateStore";
import { sendSmsValidator } from "../../services/user/sendSmsValidator";
import { didiConnect } from "../../store/store";

import { EnterPhoneProps, EnterPhoneScreen } from "./EnterPhone";
import { ServiceObserver } from "./ServiceObserver";

export interface EnterPhoneWrapperProps {
	onServiceSuccess(phoneNumber: string, password: string | null): void;
	explanation: EnterPhoneProps["explanation"];
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

interface EnterPhoneState {
	phoneNumber: string;
	password: string | null;
}

const serviceKey = "EnterPhone";

class EnterPhoneWrapper extends React.Component<EnterPhoneInternalProps, EnterPhoneState> {
	constructor(props: EnterPhoneInternalProps) {
		super(props);
		this.state = {
			phoneNumber: "",
			password: ""
		};
	}
	render() {
		return (
			<ServiceObserver
				serviceKey={serviceKey}
				onSuccess={() => this.props.onServiceSuccess(this.state.phoneNumber, this.state.password)}
			>
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
		const effectivePassword = password || this.props.password;
		this.setState({ phoneNumber: inputPhoneNumber, password: effectivePassword });
		this.props.requestSmsCode(this.props.shouldCreateDid, inputPhoneNumber, effectivePassword);
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
