import { StartAccessScreen } from "./StartAccess";

import { LoginEnterPhoneScreen } from "./login/LoginEnterPhone";
import { LoginVerifyPhone } from "./login/LoginVerifyPhone";

import { RecoveryExpanationScreen } from "./recovery/RecoveryExplanation";
import { RecoveryEnterEmail } from "./recovery/RecoveryEnterEmail";
import { RecoveryEnterPhone } from "./recovery/RecoveryEnterPhone";
import { RecoveryVerifyPhone } from "./recovery/RecoveryVerifyPhone";

import { SignupOnboardingScreen } from "./signup/SignupOnboarding";
import { SignupEnterPhone } from "./signup/SignupEnterPhone";
import { SignupVerifyPhone } from "./signup/SignupVerifyPhone";
import { SignupEnterEmail } from "./signup/SignupEnterEmail";
import { SignupConfirmEmail } from "./signup/SignupConfirmEmail";

import NavMap from "../util/NavMap"

export default NavMap.from(StartAccessScreen, {
        Login: NavMap.from(LoginEnterPhoneScreen, {
                /*
                NavMap.from(LoginVerifyPhone)
                */
        }),
        Signup: NavMap.from(SignupOnboardingScreen, {
                /*
                NavMap.from(SignupEnterPhone, {
                        NavMap.from(SignupVerifyPhone, {
                                NavMap.from(SignupEnterEmail, {
                                        NavMap.from(SignupConfirmEmail)
                                })
                        })
                })
                */
        }),
        Recovery: NavMap.from(RecoveryExpanationScreen, {
                /*
                NavMap.from(RecoveryEnterEmail, {
                        NavMap.from(RecoveryEnterPhone, {
                                NavMap.from(RecoveryVerifyPhone)
                        })
                })
                */
        }),
})