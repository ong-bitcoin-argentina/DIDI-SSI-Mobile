import React from "react";

import { assertUnreachable } from "../../util/assertUnreachable";
import { AddChildren } from "../../util/ReactExtensions";
import { ServiceCallState } from "../../services/ServiceStateStore";
import { didiConnect } from "../../store/store";
import { ErrorDataAlert } from "./ErrorDataAlert";

import crashlytics from "@react-native-firebase/crashlytics";

// TODO: checkear que se logueen errores en firebase
const errorCodesBlacklist = ["USER_GET", "FETCH_TG_ERR", "DID_NOT_FOUND"];

interface ServiceObserverProps {
	serviceKey: string;
	onSuccess: () => void;
	onError?: () => void;
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
		const { dropCallChain, onError, onSuccess, serviceKey } = this.props;
		const rq = this.props.callState[serviceKey];
		if (rq === undefined) {
			return;
		}
		switch (rq.state) {
			case "SUCCEEDED":
				onSuccess();
				dropCallChain(serviceKey);
				return;
			case "FAILED":
				onError && onError();
				crashlytics().recordError(new Error(rq.error.message));
				if (!errorCodesBlacklist.includes(rq.error.errorCode)) {
					ErrorDataAlert.alert(rq.error, () => dropCallChain(serviceKey));
				}
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
