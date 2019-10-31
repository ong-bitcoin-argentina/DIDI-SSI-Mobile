import React from "react";
import { Alert } from "react-native";

import { ErrorData } from "./serviceErrors";
import { ServiceState } from "./ServiceState";

interface ServiceWrapperProps {
	serviceState: ServiceState<any, any, ErrorData>;
	onServiceSuccess(): void;
}

export class ServiceWrapper extends React.Component<ServiceWrapperProps> {
	componentDidUpdate() {
		const rq = this.props.serviceState;
		switch (rq.state) {
			case "SUCCESS":
				this.props.onServiceSuccess();
				return;
			case "FAILURE":
				Alert.alert(`Error ${rq.error.errorCode}`, rq.error.message);
				return;
			case "NONE":
			case "PENDING":
				return;
		}
	}

	render() {
		return this.props.children;
	}
}
