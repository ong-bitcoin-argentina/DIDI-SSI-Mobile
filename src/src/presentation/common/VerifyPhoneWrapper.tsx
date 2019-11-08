import React from "react";
import { Dispatch } from "redux";

import { isPendingService, ServiceCallAction } from "../../services/ServiceStateStore";
import { verifySmsCode } from "../../services/user/verifySmsCode";
import { didiConnect } from "../../store/store";
import { StoreAction } from "../../store/StoreAction";

import { ServiceObserver } from "./ServiceObserver";
import { VerifyPhoneProps, VerifyPhoneScreen } from "./VerifyPhone";

interface VerifyPhoneWrapperProps {
	serviceCall?: (serviceKey: string, validationCode: string) => ServiceCallAction;
	onServiceSuccess(): void;
	contentImageSource: VerifyPhoneProps["contentImageSource"];
}
interface VerifyPhoneWrapperStateProps {
	verifyPhoneCodePending: boolean;
}
interface VerifyPhoneWrapperDispatchProps {
	dispatch: Dispatch<StoreAction>;
}
type VerifyPhoneWrapperInternalProps = VerifyPhoneWrapperProps &
	VerifyPhoneWrapperStateProps &
	VerifyPhoneWrapperDispatchProps;

const serviceKey = "VerifyPhone";

class VerifyPhoneWrapper extends React.Component<VerifyPhoneWrapperInternalProps> {
	render() {
		return (
			<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.props.onServiceSuccess()}>
				<VerifyPhoneScreen
					contentImageSource={this.props.contentImageSource}
					onPressContinueButton={inputCode => this.onPressContinueButton(inputCode)}
					isContinuePending={this.props.verifyPhoneCodePending}
				/>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(inputCode: string) {
		const serviceCall = this.props.serviceCall || verifySmsCode;
		this.props.dispatch(serviceCall(serviceKey, inputCode));
	}
}

const connected = didiConnect(
	VerifyPhoneWrapper,
	(state): VerifyPhoneWrapperStateProps => ({
		verifyPhoneCodePending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): VerifyPhoneWrapperDispatchProps => ({ dispatch })
);

export { connected as VerifyPhoneWrapper };
