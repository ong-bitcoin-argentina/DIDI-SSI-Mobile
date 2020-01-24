import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { Dispatch } from "redux";

import commonStyles from "../resources/commonStyles";

import { isPendingService, ServiceCallAction } from "../../services/ServiceStateStore";
import { didiConnect } from "../../store/store";
import { StoreAction } from "../../store/StoreAction";

import { ServiceObserver } from "./ServiceObserver";
import { VerifyCodeProps, VerifyCodeScreen } from "./VerifyCode";

interface VerifyCodeWrapperProps {
	description: VerifyCodeProps["description"];
	contentImageSource: ImageSourcePropType;

	serviceCall: (serviceKey: string, validationCode: string) => ServiceCallAction;
	onServiceSuccess: () => void;
}
interface VerifyCodeWrapperStateProps {
	verifyPhoneCodePending: boolean;
}
interface VerifyCodeWrapperDispatchProps {
	dispatch: Dispatch<StoreAction>;
}
type VerifyCodeWrapperInternalProps = VerifyCodeWrapperProps &
	VerifyCodeWrapperStateProps &
	VerifyCodeWrapperDispatchProps;

const serviceKey = "VerifyCode";

class VerifyCodeWrapper extends React.Component<VerifyCodeWrapperInternalProps> {
	render() {
		return (
			<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.props.onServiceSuccess()}>
				<VerifyCodeScreen
					description={this.props.description}
					onPressContinueButton={inputCode => this.onPressContinueButton(inputCode)}
					isContinuePending={this.props.verifyPhoneCodePending}
				>
					<Image style={commonStyles.image.image} source={this.props.contentImageSource} />
				</VerifyCodeScreen>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(inputCode: string) {
		this.props.dispatch(this.props.serviceCall(serviceKey, inputCode));
	}
}

const connected = didiConnect(
	VerifyCodeWrapper,
	(state): VerifyCodeWrapperStateProps => ({
		verifyPhoneCodePending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): VerifyCodeWrapperDispatchProps => ({ dispatch })
);

export { connected as VerifyCodeWrapper };
