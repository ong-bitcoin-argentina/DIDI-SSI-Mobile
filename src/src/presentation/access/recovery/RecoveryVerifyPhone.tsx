import React, { Fragment } from "react";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { VerifyCodeWrapper } from "../../common/VerifyCodeWrapper";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { changePhoneNumber } from "../../../services/user/changePhoneNumber";
import { sendSmsValidator } from "../../../services/user/sendSmsValidator";
import { DashboardScreenProps } from "../../dashboard/home/Dashboard";
import strings from "../../resources/strings";
import { DidiText } from "../../util/DidiText";
import { QA } from "../../../AppConfig";
import { CodeState } from "../../../store/reducers/phoneVerificationReducer";
import { didiConnect } from "../../../store/store";
import { StyleSheet } from "react-native";
export interface RecoveryVerifyPhoneProps {
	newPhoneNumber: string;
	password: string;
}

interface RecoveryVerifyPhoneStateProps {
	codeConfirmation: CodeState;
}

export type RecoveryVerifyPhoneNavigation = {
	Dashboard: DashboardScreenProps;
};

const RecoveryVerifyPhoneScreen = class RecoveryVerifyPhoneScreen extends NavigationEnabledComponent<
	RecoveryVerifyPhoneProps & RecoveryVerifyPhoneStateProps,
	{},
	RecoveryVerifyPhoneNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	render() {
		return (
			<Fragment>
			{QA && <DidiText.Explanation.Emphasis style={styles.description}>
				QA: {this.props.codeConfirmation.code}
			</DidiText.Explanation.Emphasis>
			}
			<VerifyCodeWrapper
				description={strings.accessCommon.verify.phoneMessageHead}
				contentImageSource={require("../../resources/images/phoneRecover.png")}
				serviceCall={(serviceKey, validationCode) =>
					changePhoneNumber(serviceKey, this.props.password, this.props.newPhoneNumber, validationCode)
				}
				onServiceSuccess={() => this.navigate("Dashboard", {})}
				onResendCodePress={serviceKey => sendSmsValidator(serviceKey, this.props.newPhoneNumber, this.props.password)}
			/>
			</Fragment>
		);
	}
}

const connected = didiConnect(
	RecoveryVerifyPhoneScreen,
	(state) : RecoveryVerifyPhoneStateProps => ({
		codeConfirmation: state.codeConfirmation
	})
);

export { connected as RecoveryVerifyPhoneScreen };

const styles = StyleSheet.create({
	description: {
		fontSize: 14
	}
});
