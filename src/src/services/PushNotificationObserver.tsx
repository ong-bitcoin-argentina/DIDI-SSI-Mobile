import React from "react";
import PushNotification from "react-native-push-notification";

import { PushNotificationContent, PushToken } from "../store/reducers/pushNotificationReducer";
import { didiConnect } from "../store/store";

export interface PushNotificationObserverProps {
	onNotificationReceived: (notification: PushNotificationContent) => { didHandle: boolean };
}

interface ObserverStateProps {
	pendingPush: PushNotificationContent | undefined;
}

interface ObserverDispatchProps {
	didHandleReceivedPush: (value: PushNotificationContent) => void;
}

export const PushNotificationObserver = didiConnect(
	class extends React.PureComponent<PushNotificationObserverProps & ObserverStateProps & ObserverDispatchProps> {
		componentDidUpdate() {
			if (this.props.pendingPush === undefined) {
				return;
			}

			const { didHandle } = this.props.onNotificationReceived(this.props.pendingPush);
			if (didHandle) {
				this.props.didHandleReceivedPush(this.props.pendingPush);
			}
		}

		render() {
			return this.props.children || null;
		}
	},
	(state): ObserverStateProps => ({
		pendingPush: state.pushToken.pending[0]
	}),
	(dispatch): ObserverDispatchProps => ({
		didHandleReceivedPush: (value: PushNotificationContent) => dispatch({ type: "CLEAR_PUSH", value })
	})
);

interface ReceiverDispatchProps {
	registerPushToken: (value: PushToken) => void;
	recordReceivedPush: (value: PushNotificationContent) => void;
}

type PushNotificationObject = {
	foreground: boolean;
	userInteraction: boolean;
} & (
	| {
			notification: {
				body: string;
				title: string;
			};
			notificationType?: string;
	  }
	| {
			notification?: never;
			title: string;
			message: string;
	  }
);

export const PushNotificationReceiver = didiConnect(
	class extends React.PureComponent<ReceiverDispatchProps> {
		componentDidMount() {
			PushNotification.configure({
				onRegister: token => {
					console.warn("TOKEN", token.token);
					this.props.registerPushToken(token.token);
				},
				onNotification: ((notification: PushNotificationObject) => {
					console.warn("PUSH", notification);
					if (notification.userInteraction) {
						return;
					}
					const commonData: Omit<PushNotificationContent, "type"> = notification.notification
						? {
								title: notification.notification.title,
								message: notification.notification.body,
								foreground: notification.foreground,
								userInteraction: notification.userInteraction
						  }
						: {
								title: notification.title,
								message: notification.message,
								foreground: notification.foreground,
								userInteraction: notification.userInteraction
						  };

					switch ((notification as any).notificationType) {
						case "VALIDATION_REQ":
							this.props.recordReceivedPush({ type: "VALIDATION_REQ", ...commonData });
							return;
						case "SHARE_REQ":
							this.props.recordReceivedPush({ type: "SHARE_REQ", ...commonData });
							return;
						case "NEW_CERT":
							this.props.recordReceivedPush({ type: "NEW_CERT", ...commonData });
							return;
						default:
							return;
					}
				}) as any,
				senderID: "420010989732",
				requestPermissions: true
			});
		}

		render() {
			return null;
		}
	},
	state => ({}),
	(dispatch): ReceiverDispatchProps => ({
		registerPushToken: (value: PushToken) => dispatch({ type: "SET_PUSH_TOKEN", value }),
		recordReceivedPush: (value: PushNotificationContent) => dispatch({ type: "REGISTER_PUSH", value })
	})
);
