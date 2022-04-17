import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { RNUportHDSigner } from "react-native-uport-signer";

import NavigationHeaderStyle from "../common/NavigationHeaderStyle";
import DidiButton from "../util/DidiButton";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";

import { AppConfig } from "../../AppConfig";
import colors from "../resources/colors";
import strings from "../resources/strings";
import themes from "../resources/themes";
import { SplashContent } from "../SplashContent";

import { AccessSettingsProps } from "./AccessSettings";
import { RecoveryExplanationProps } from "./recovery/RecoveryExplanation";
import { SignupOnboardingProps } from "./signup/SignupOnboarding";
import { SignupWithResetProps } from "./signup/SignupWithReset";
import { didiConnect } from "../../store/store";
import { PendingLinkingState } from "../../store/reducers/pendingLinkingReducer";
import { deepLinkHandler, dynamicLinkHandler } from "../util/appRouter";
import { ActiveDid } from "../../store/reducers/didReducer";
import { DidiText } from "../util/DidiText";
import { CommonQuestionsScreenProps } from "../common/CommonQuestions";
import Icon from "react-native-vector-icons/AntDesign";
import { OpenEmailScreenProps } from "../common/OpenEmail";

const { Title } = DidiText;

export type StartAccessProps = {
	did: ActiveDid;
	pendingLinking: PendingLinkingState;
};

type StartAccessDispatchProps = {
	savePendingLinking: (state: PendingLinkingState) => void;
};

type StartAccessInternalProps = StartAccessProps & StartAccessDispatchProps;

type StartAccessState = {};

export interface StartAccessNavigation {
	Login: {};
	SignupOnboarding: SignupOnboardingProps;
	SignupWithReset: SignupWithResetProps;
	RecoveryExplanation: RecoveryExplanationProps;
	AccessSettings: AccessSettingsProps;
	CommonQuestions: CommonQuestionsScreenProps;
	OpenEmail: OpenEmailScreenProps;
}

class StartAccessScreen extends NavigationEnabledComponent<
	StartAccessInternalProps,
	StartAccessState,
	StartAccessNavigation
> {
	static navigationOptions = NavigationHeaderStyle.gone;

	componentDidMount() {
		deepLinkHandler(this.urlHandler);
		dynamicLinkHandler(this.urlHandler);
	}

	urlHandler = (link?: { url: string } | null) => {
		if (link && !this.props.pendingLinking) {
			this.props.savePendingLinking(link.url);
		}
	};
	
	private goToCommonQuestions = async () => {		
		this.navigate("CommonQuestions", {});
	}

	render() {
		const object = {}
		Object.assign(object,this.props.did)
		const nullSearch= Object.values(object)[0];
		return (
			<Fragment>
				<Icon onPress={this.goToCommonQuestions} name="questioncircle" color={colors.primaryShadow} size={30} style={styles.questionsIcon} />
				<SplashContent>
					
					<Title>{nullSearch !== null && this.props.did && this.props.did.did ?
						`DID: ${this.props.did.did().slice(0,15) + '...' + this.props.did.did().slice(-4)}` 
						: 'Crear o recuperar cuenta'}
					</Title>
					{nullSearch !== null &&this.props.did ? 
						<DidiButton
							onPress={() => this.navigate("Login", {})}
							style={styles.secondaryButton}
							title={strings.recovery.startAccess.loginButton}
							/>
					: null}
					<DidiButton
						onPress={this.goToSignup}
						style={styles.primaryButton}
						title={strings.recovery.startAccess.createButton}
					/>
					<DidiButton
						onPress={() => this.navigate("RecoveryExplanation", {})}
						style={this.props.did ? styles.transparentButton : styles.primaryButton}
						titleStyle={this.props.did ? styles.transparentButtonText : null}
						title={strings.recovery.startAccess.recoveryButton}
						/>
				</SplashContent>
				{AppConfig.debug && (
					<DidiButton
						title="DEBUG"
						style={{ position: "absolute", top: 20, right: 20 }}
						onPress={() => this.navigate("AccessSettings", {})}
					/>
				)}
			</Fragment>
		);
	}

	private goToSignup = async () => {
		const hasSeed = await RNUportHDSigner.hasSeed();
		if (hasSeed) {
			this.navigate("SignupWithReset", {});
		} else {
			this.navigate("SignupOnboarding", {});
		}
	};
}

const styles = StyleSheet.create({
	transparentButton: {
		backgroundColor: "transparent"
	},
	transparentButtonText: {
		color: themes.foreground
	},
	primaryButton: {
		backgroundColor: colors.primaryShadow
	},
	secondaryButton: {
		backgroundColor: colors.secondary
	},
	questionsIcon: {
		position: 'absolute',
		top: 10,
		left: "80%",
		zIndex: 999
	}
});

const connected = didiConnect(
	StartAccessScreen,
	state => ({
		did: state.did.activeDid,
		pendingLinking: state.pendingLinking
	}),
	(dispatch): any => ({
		savePendingLinking: (state: PendingLinkingState) => dispatch({ type: "PENDING_LINKING_SET", state })
	})
);

export { connected as StartAccessScreen };
