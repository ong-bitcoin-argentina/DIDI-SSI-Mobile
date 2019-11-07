import React from "react";

import { isPendingService } from "../../services/ServiceStateStore";
import { verifySmsCode } from "../../services/user/verifySmsCode";
import { didiConnect } from "../../store/store";

import { ServiceObserver } from "./ServiceObserver";
import { VerifyPhoneProps, VerifyPhoneScreen } from "./VerifyPhone";

interface VerifyPhoneWrapperProps {
	onServiceSuccess(): void;
	contentImageSource: VerifyPhoneProps["contentImageSource"];
}
interface VerifyPhoneWrapperStateProps {
	verifyPhoneCodePending: boolean;
}
interface VerifyPhoneWrapperDispatchProps {
	verifyPhoneCode: (code: string) => void;
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
		this.props.verifyPhoneCode(inputCode);
	}
}

const connected = didiConnect(
	VerifyPhoneWrapper,
	(state): VerifyPhoneWrapperStateProps => ({
		verifyPhoneCodePending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): VerifyPhoneWrapperDispatchProps => ({
		verifyPhoneCode: (validationCode: string) => dispatch(verifySmsCode(serviceKey, validationCode))
	})
);

export { connected as VerifyPhoneWrapper };
