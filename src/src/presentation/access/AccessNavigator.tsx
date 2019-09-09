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

import NavMap from "../util/NavMap";
import { DashboardScreen } from "./dashboard/dashboard";

const login = NavMap.from(LoginEnterPhoneScreen, {
	LoginVerifyPhone: NavMap.from(LoginVerifyPhoneScreen)
});

const signup = NavMap.from(SignupOnboardingScreen, {
	SignupEnterPhone: NavMap.from(SignupEnterPhoneScreen, {
		SignupVerifyPhone: NavMap.from(SignupVerifyPhoneScreen, {
			SignupPhoneVerified: NavMap.from(SignupPhoneVerifiedScreen, {
				SignupEnterEmail: NavMap.from(SignupEnterEmailScreen, {
					SignupConfirmEmail: NavMap.from(SignupConfirmEmailScreen, {
						SignupConfirmed: NavMap.from(SignupConfirmedScreen, {
							Dashboard: NavMap.from(DashboardScreen)
						})
					})
				})
			})
		})
	})
});

const forgotPassword = NavMap.from(ForgotPasswordEnterEmailScreen, {
	ForgotPasswordEmailSent: NavMap.from(ForgotPasswordEmailSentScreen, {
		ForgotPasswordConfirmEmail: NavMap.from(ForgotPasswordConfirmEmailScreen, {
			ForgotPasswordNewPassword: NavMap.from(ForgotPasswordNewPasswordScreen, {
				Dashboard: NavMap.from(DashboardScreen)
			})
		})
	})
});

const recovery = NavMap.from(RecoveryExplanationScreen, {
	RecoveryEnterEmail: NavMap.from(RecoveryEnterEmailScreen, {
		RecoveryEnterPhone: NavMap.from(RecoveryEnterPhoneScreen, {
			RecoveryVerifyPhone: NavMap.from(RecoveryVerifyPhoneScreen, {
				Dashboard: NavMap.from(DashboardScreen)
			})
		}),
		ForgotPasswordEnterEmail: forgotPassword
	})
});

export default NavMap.from(StartAccessScreen, {
	LoginEnterPhone: login,
	SignupOnboarding: signup,
	RecoveryExplanation: recovery
});
