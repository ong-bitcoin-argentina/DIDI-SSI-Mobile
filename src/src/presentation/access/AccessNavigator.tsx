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

import NavMap from "../util/NavMap"

export default NavMap.from(StartAccessScreen, {
        LoginEnterPhone: NavMap.from(LoginEnterPhoneScreen, {
                LoginVerifyPhone: NavMap.from(LoginVerifyPhoneScreen)
        }),
        SignupOnboarding: NavMap.from(SignupOnboardingScreen, {
                SignupEnterPhone: NavMap.from(SignupEnterPhoneScreen, {
                        SignupVerifyPhone: NavMap.from(SignupVerifyPhoneScreen, {
                                SignupEnterEmail: NavMap.from(SignupEnterEmailScreen, {
                                        SignupConfirmEmail: NavMap.from(SignupConfirmEmailScreen)
                                })
                        })
                })
        }),
        RecoveryExplanation: NavMap.from(RecoveryExplanationScreen, {
                RecoveryEnterEmail: NavMap.from(RecoveryEnterEmailScreen, {
                        RecoveryEnterPhone: NavMap.from(RecoveryEnterPhoneScreen, {
                                RecoveryVerifyPhone: NavMap.from(RecoveryVerifyPhoneScreen)
                        })
                })
        }),
})