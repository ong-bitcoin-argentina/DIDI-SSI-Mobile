import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { EnterEmailScreen } from "../../common/EnterEmail";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { isPendingService } from "../../../services/ServiceStateStore";
import { recoverAccount } from "../../../services/user/recoverAccount";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import { ForgotPasswordEnterEmailProps } from "../forgotPassword/ForgotPasswordEnterEmail";

import { RecoveryEnterPhoneProps } from "./RecoveryEnterPhone";

export type RecoveryEnterEmailProps = {};
interface RecoveryEnterEmailStateProps {
	recoverAccountPending: boolean;
}
interface RecoveryEnterEmailDispatchProps {
	recoverAccount: (email: string, password: string) => void;
}
type RecoveryEnterEmailInternalProps = RecoveryEnterEmailProps &
	RecoveryEnterEmailStateProps &
	RecoveryEnterEmailDispatchProps;

interface RecoverEnterEmailState {
	email: string;
	password: string;
}

export interface RecoveryEnterEmailNavigation {
	ForgotPasswordEnterEmail: ForgotPasswordEnterEmailProps;
	RecoveryEnterPhone: RecoveryEnterPhoneProps;
}

const serviceKey = "RecoveryEnterEmail";

class RecoveryEnterEmailScreen extends NavigationEnabledComponent<
	RecoveryEnterEmailInternalProps,
	RecoverEnterEmailState,
	RecoveryEnterEmailNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	render() {
		return (
			<ServiceObserver serviceKey={serviceKey} onSuccess={() => this.advance()}>
				<EnterEmailScreen
					description={strings.recovery.enterEmail.messageHead}
					contentImageSource={require("../../resources/images/emailRecover.png")}
					buttonTitle={strings.accessCommon.recoverButtonText}
					isPasswordRequired={true}
					onPressContinueButton={(email, password) => this.onPressContinueButton(email, password)}
					isContinuePending={this.props.recoverAccountPending}
				>
					<TouchableOpacity onPress={() => this.navigate("ForgotPasswordEnterEmail", {})} style={styles.forgotPassword}>
						<DidiText.ForgotPasswordButton>
							{strings.recovery.enterEmail.forgotPasswordMessage + " >"}
						</DidiText.ForgotPasswordButton>
					</TouchableOpacity>
				</EnterEmailScreen>
			</ServiceObserver>
		);
	}

	private onPressContinueButton(email: string, password: string) {
		this.setState({ password });
		this.props.recoverAccount(email, password);
	}

	private advance() {
		this.navigate("RecoveryEnterPhone", { password: this.state.password });
	}
}

const connected = didiConnect(
	RecoveryEnterEmailScreen,
	(state): RecoveryEnterEmailStateProps => ({
		recoverAccountPending: isPendingService(state.serviceCalls[serviceKey])
	}),
	(dispatch): RecoveryEnterEmailDispatchProps => ({
		recoverAccount: (email: string, password: string) => dispatch(recoverAccount(serviceKey, email, password))
	})
);

export { connected as RecoveryEnterEmailScreen };

const styles = StyleSheet.create({
	forgotPassword: {
		flexDirection: "row",
		marginLeft: "auto",
		alignSelf: "flex-end"
	}
});
