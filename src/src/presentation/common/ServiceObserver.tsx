import React from "react";
import { Alert } from "react-native";

import { AddChildren } from "../../util/ReactExtensions";

import { ServiceCallState, SingleServiceCallState } from "../../services/ServiceStateStore";
import { didiConnect } from "../../store/store";

interface ServiceObserverProps {
	serviceKey: string;
	onSuccess: () => void;
	keepCallChainOnExit?: boolean;
}
interface ServiceObserverStateProps {
	callState: ServiceCallState;
}
interface ServiceObserverDispatchProps {
	dropCallChain: (serviceKey: string) => void;
}
type ServiceObserverInternalProps = ServiceObserverProps & ServiceObserverStateProps & ServiceObserverDispatchProps;

class ServiceObserver extends React.Component<AddChildren<ServiceObserverInternalProps>> {
	componentDidUpdate() {
		const rq = this.props.callState[this.props.serviceKey];
		if (rq === undefined) {
			return;
		}
		switch (rq.state) {
			case "SUCCEEDED":
				this.props.onSuccess();
				this.props.dropCallChain(this.props.serviceKey);
				return;
			case "FAILED":
				Alert.alert(
					"Error",
					`${rq.error.message}\n\n(Error ${rq.error.errorCode})`,
					[{ text: "OK", onPress: () => this.props.dropCallChain(this.props.serviceKey) }],
					{ onDismiss: () => this.props.dropCallChain(this.props.serviceKey) }
				);
				return;
			case "IN_PROGRESS":
				return;
		}
	}

	componentWillUnmount() {
		if (!this.props.keepCallChainOnExit) {
			this.props.dropCallChain(this.props.serviceKey);
		}
	}

	render() {
		return this.props.children || null;
	}
}

const connected = didiConnect(
	ServiceObserver,
	(state): ServiceObserverStateProps => ({
		callState: state.serviceCalls
	}),
	(dispatch): ServiceObserverDispatchProps => ({
		dropCallChain: (serviceKey: string) => dispatch({ type: "SERVICE_CALL_DROP", serviceKey })
	})
);

export { connected as ServiceObserver };
