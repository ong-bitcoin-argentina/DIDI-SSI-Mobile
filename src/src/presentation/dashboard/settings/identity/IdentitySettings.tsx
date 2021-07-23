import React, { Fragment } from "react";
import { DidiScreen } from "../../../common/DidiScreen";
import NavigationHeaderStyle from "../../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import { deleteDid, ensureDid, importDid } from "../../../../services/internal/uportSigner";
import { ActiveDid } from "../../../../store/reducers/didReducer";
import { didiConnect } from "../../../../store/store";
import strings from "../../../resources/strings";

import { CredentialRecoveryComponent } from "./CredentialRecoveryComponent";
import { KeyDisplayComponent } from "./KeyDisplayComponent";
import { KeyRecoveryComponent } from "./KeyRecoveryComponent";

export interface IdentitySettingsProps {}
interface IdentitySettingsStateProps {
	activeDid: ActiveDid;
}
interface IdentitySettingsDispatchProps {
	createAddress: () => void;
	importAddress: (phrase: string) => void;
	deleteAddress: () => void;
}
type IdentitySettingsInnerProps = IdentitySettingsProps & IdentitySettingsStateProps & IdentitySettingsDispatchProps;

export type IdentitySettingsNavigation = {};

class IdentitySettingsScreen extends NavigationEnabledComponent<
	IdentitySettingsInnerProps,
	{},
	IdentitySettingsNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.settings.identityBackup);

	constructor(props: IdentitySettingsInnerProps) {
		super(props);
		this.state = {};
	}

	render() {
		return <DidiScreen style={{ flexDirection: "row" }}>{this.renderContent()}</DidiScreen>;
	}

	private renderContent() {
		if (!this.props.activeDid) {
			return <KeyRecoveryComponent createAddress={this.props.createAddress} importAddress={this.props.importAddress} />;
		} else {
			return (
				<Fragment>
					<KeyDisplayComponent
						style={{ flex: 1 }}
						seed={this.props.activeDid.keyAddress()}
						deleteSeed={this.props.deleteAddress}
					/>
					<CredentialRecoveryComponent style={{ flex: 1 }} />
				</Fragment>
			);
		}
	}
}

const serviceKey = "IdentitySettings";

const connected = didiConnect(
	IdentitySettingsScreen,
	(state): IdentitySettingsStateProps => ({
		activeDid: state.did.activeDid
	}),
	(dispatch): IdentitySettingsDispatchProps => ({
		createAddress: () => dispatch(ensureDid(serviceKey)),
		importAddress: (phrase: string) => dispatch(importDid(serviceKey, phrase)),
		deleteAddress: () => dispatch(deleteDid(serviceKey))
	})
);

export { connected as IdentitySettingsScreen };
