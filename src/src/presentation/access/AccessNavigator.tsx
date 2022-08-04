import NavMap, { NavTree } from "../util/NavMap";

import { DashboardScreenProps } from "../dashboard/home/Dashboard";

import { AccessSettingsScreen } from "./AccessSettings";
import { ForgotPasswordEmailSentScreen } from "./forgotPassword/ForgotPasswordEmailSent";
import { ForgotPasswordEnterEmailScreen } from "./forgotPassword/ForgotPasswordEnterEmail";
import { ForgotPasswordNewPasswordScreen } from "./forgotPassword/ForgotPasswordNewPassword";
import { LoginScreen } from "./login/LoginScreen";
import { RecoveryEnterEmailScreen } from "./recovery/RecoveryEnterEmail";
import { RecoveryEnterPhoneScreen } from "./recovery/RecoveryEnterPhone";
import { RecoveryExplanationScreen } from "./recovery/RecoveryExplanation";
import { RecoveryVerifyPhoneScreen } from "./recovery/RecoveryVerifyPhone";
import { SignupConfirmedScreen } from "./signup/SignupConfirmed";
import { SignupConfirmEmailScreen } from "./signup/SignupConfirmEmail";
import { SignupEnterEmailScreen } from "./signup/SignupEnterEmail";
import { SignupEnterNameScreen } from "./signup/SignupEnterName";
import { SignupEnterPhoneScreen } from "./signup/SignupEnterPhone";
import { SignupOnboardingScreen } from "./signup/SignupOnboarding";
import { SignupPhoneVerifiedScreen } from "./signup/SignupPhoneVerified";
import { SignupVerifyPhoneScreen } from "./signup/SignupVerifyPhone";
import { SignupWithResetScreen } from "./signup/SignupWithReset";
import { StartAccessScreen } from "./StartAccess";
import { CommonQuestionsScreen } from "../common/CommonQuestions";
import { PoliticsScreen } from "../common/Politics";
import { OpenEmailScreen } from "../common/OpenEmail";
import { ExpiredAccountScreen  } from "../common/ExpiredAccount";
import { ValidateIdentityScreen  } from "../common/ValidateIdentity";
interface AccessSwitchTarget {
	Dashboard: DashboardScreenProps;
}

function login(then: NavTree<AccessSwitchTarget>) {
	return NavMap.from(LoginScreen, then);
}

function signup(then: NavTree<AccessSwitchTarget>) {
	return NavMap.from(SignupOnboardingScreen, { 
		PoliticsScreen:NavMap.from(PoliticsScreen,{
			SignupEnterPhone: NavMap.from(SignupEnterPhoneScreen, {
				SignupVerifyPhone: NavMap.from(SignupVerifyPhoneScreen, {
					SignupPhoneVerified: NavMap.from(SignupPhoneVerifiedScreen, {
						SignupEnterName: NavMap.from(SignupEnterNameScreen, {
							SignupEnterEmail: NavMap.from(SignupEnterEmailScreen, {
								SignupConfirmEmail: NavMap.from(SignupConfirmEmailScreen, {
									SignupConfirmed: NavMap.from(SignupConfirmedScreen, then)
							})
						})
					})
				})
				})
			})
		})
	});
}

function forgotPassword(then: NavTree<AccessSwitchTarget>) {
	return NavMap.from(ForgotPasswordEnterEmailScreen, {
		ForgotPasswordEmailSent: NavMap.from(ForgotPasswordEmailSentScreen, {
			ForgotPasswordNewPassword: NavMap.from(ForgotPasswordNewPasswordScreen, then)
		})
	});
}

function recovery(then: NavTree<AccessSwitchTarget>) {
	return NavMap.from(RecoveryExplanationScreen, {
		RecoveryEnterEmail: NavMap.from(RecoveryEnterEmailScreen, {
			RecoveryEnterPhone: NavMap.from(RecoveryEnterPhoneScreen, {
				RecoveryVerifyPhone: NavMap.from(RecoveryVerifyPhoneScreen, then)
			}),
			ForgotPasswordEnterEmail: forgotPassword(then)
		})
	});
}

export default function (then: NavTree<AccessSwitchTarget>) {
	return NavMap.from(StartAccessScreen, {
		Login: login(then),
		SignupOnboarding: signup(then),
		SignupWithReset: NavMap.from(SignupWithResetScreen, {
			SignupEnterPhone: NavMap.placeholder(SignupEnterPhoneScreen),
			RecoveryExplanation: recovery(then)
		}),
		RecoveryExplanation: recovery(then),
		AccessSettings: NavMap.from(AccessSettingsScreen, then),
		CommonQuestions: NavMap.from(CommonQuestionsScreen, then),
		Politics: NavMap.from(PoliticsScreen, then),
		OpenEmail: NavMap.from(OpenEmailScreen, then),
		ExpiredAccount: NavMap.from(ExpiredAccountScreen, then),
		ValidateIdentity: NavMap.from(ValidateIdentityScreen, then)
	});
}
