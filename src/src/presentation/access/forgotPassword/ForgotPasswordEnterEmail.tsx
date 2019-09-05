import NavigationEnabledComponent from '../../util/NavigationEnabledComponent';
import {ForgotPasswordEmailSentProps} from './ForgotPasswordEmailSent';

export type ForgotPasswordEnterEmailProps = {};

export interface ForgotPasswordEnterEmailNavigation {
	ForgotPasswordEmailSent: ForgotPasswordEmailSentProps;
}

export class ForgotPasswordEnterEmailScreen extends NavigationEnabledComponent<
	ForgotPasswordEnterEmailProps,
	{},
	ForgotPasswordEnterEmailNavigation
> {}
