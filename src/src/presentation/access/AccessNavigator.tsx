import { StartAccessScreen } from "./StartAccess";

import { LoginEnterPhoneScreen } from "./login/LoginEnterPhone";
import { LoginVerifyPhoneScreen } from "./login/LoginVerifyPhone";

import { RecoveryExplanationScreen } from "./recovery/RecoveryExplanation";
import { RecoveryEnterEmailScreen } from "./recovery/RecoveryEnterEmail";
import { RecoveryEnterPhoneScreen } from "./recovery/RecoveryEnterPhone";
import { RecoveryVerifyPhoneScreen } from "./recovery/RecoveryVerifyPhone";

import { SignupOnboardingScreen } from "./signup/SignupOnboarding";
import { SignupEnterPhoneScreen } from "./signup/SignupEnterPhone";
import { SignupVerifyPhoneScreen } from "./signup/SignupVerifyPhone";
import { SignupEnterEmailScreen } from "./signup/SignupEnterEmail";
import { SignupConfirmEmailScreen } from "./signup/SignupConfirmEmail";
import { SignupPhoneVerifiedScreen } from "./signup/SignupPhoneVerified";
import { SignupConfirmedScreen } from "./signup/SignupConfirmed";

import { ForgotPasswordEnterEmailScreen } from "./forgotPassword/ForgotPasswordEnterEmail";
import { ForgotPasswordNewPasswordScreen } from "./forgotPassword/ForgotPasswordNewPassword";
import { ForgotPasswordEmailSentScreen } from "./forgotPassword/ForgotPasswordEmailSent";
import { ForgotPasswordConfirmEmailScreen } from "./forgotPassword/ForgotPasswordConfirmEmail";

import NavMap, { NavTree } from "../util/NavMap";
import { DashboardScreenProps } from "../dashboard/home/Dashboard";

interface AccessSwitchTarget {
	Dashboard: DashboardScreenProps;
}

function login(then: NavTree<AccessSwitchTarget>) {
	return NavMap.from(LoginEnterPhoneScreen, {
		LoginVerifyPhone: NavMap.from(LoginVerifyPhoneScreen, then)
	});
}

function signup(then: NavTree<AccessSwitchTarget>) {
	return NavMap.from(SignupOnboardingScreen, {
		SignupEnterPhone: NavMap.from(SignupEnterPhoneScreen, {
			SignupVerifyPhone: NavMap.from(SignupVerifyPhoneScreen, {
				SignupPhoneVerified: NavMap.from(SignupPhoneVerifiedScreen, {
					SignupEnterEmail: NavMap.from(SignupEnterEmailScreen, {
						SignupConfirmEmail: NavMap.from(SignupConfirmEmailScreen, {
							SignupConfirmed: NavMap.from(SignupConfirmedScreen, then)
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
			ForgotPasswordConfirmEmail: NavMap.from(ForgotPasswordConfirmEmailScreen, {
				ForgotPasswordNewPassword: NavMap.from(ForgotPasswordNewPasswordScreen, then)
			})
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

export default function(then: NavTree<AccessSwitchTarget>) {
	return NavMap.from(StartAccessScreen, {
		LoginEnterPhone: login(then),
		SignupOnboarding: signup(then),
		RecoveryExplanation: recovery(then)
	});
}
