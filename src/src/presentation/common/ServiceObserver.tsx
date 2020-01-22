import React from "react";

import { assertUnreachable } from "../../util/assertUnreachable";
import { AddChildren } from "../../util/ReactExtensions";

import { ServiceCallState } from "../../services/ServiceStateStore";
import { didiConnect } from "../../store/store";

import { ErrorDataAlert } from "./ErrorDataAlert";

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
				ErrorDataAlert.alert(rq.error, () => this.props.dropCallChain(this.props.serviceKey));
				return;
			case "IN_PROGRESS":
				return;
			default:
				assertUnreachable(rq);
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
