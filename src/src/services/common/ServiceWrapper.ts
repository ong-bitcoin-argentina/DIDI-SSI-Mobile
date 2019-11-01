import React from "react";
import { Alert } from "react-native";

import { ErrorData } from "./serviceErrors";
import { ServiceState } from "./ServiceState";

interface ServiceWrapperProps {
	serviceState: ServiceState<any, any, ErrorData>;
	onServiceSuccess(): void;
	resetService(): void;
}

export class ServiceWrapper extends React.Component<ServiceWrapperProps> {
	componentDidUpdate() {
		const rq = this.props.serviceState;
		switch (rq.state) {
			case "SUCCESS":
				this.props.onServiceSuccess();
				this.props.resetService();
				return;
			case "FAILURE":
				Alert.alert(
					"Error",
					`${rq.error.message}\n\n(Error ${rq.error.errorCode})`,
					[{ text: "OK", onPress: this.props.resetService }],
					{ onDismiss: this.props.resetService }
				);
				return;
			case "NONE":
			case "PENDING":
				return;
		}
	}

	render() {
		return this.props.children || null;
	}
}
