import { CredentialDocument, SelectiveDisclosureProposal } from "didi-sdk";
import React, { Fragment } from "react";
import { Dimensions, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { getCredentials } from "../../../uPort/getCredentials";
import strings from "../../resources/strings";

import { ScanCredentialProps } from "./ScanCredential";

export interface ShareSpecificCredentialProps {
	documents: CredentialDocument[];
}
interface ShareSpecificCredentialStateProps {
	sharePrefix: string;
}
interface ShareSpecificCredentialDispatchProps {
	recordLinkShare: (documents: CredentialDocument[]) => void;
}
type ShareSpecificCredentialInternalProps = ShareSpecificCredentialProps &
	ShareSpecificCredentialStateProps &
	ShareSpecificCredentialDispatchProps;

interface ShareSpecificCredentialState {
	token?: string;
}

export interface ShareSpecificCredentialNavigation {
	ScanCredential: ScanCredentialProps;
}

export class ShareSpecificCredentialScreen extends NavigationEnabledComponent<
	ShareSpecificCredentialInternalProps,
	ShareSpecificCredentialState,
	ShareSpecificCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.share.title);

	constructor(props: ShareSpecificCredentialInternalProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.loadToken();
	}

	private async loadToken() {
		const token = await SelectiveDisclosureProposal.offering(await getCredentials(), this.props.documents);
		this.setState({ token });
	}

	render() {
		return (
			<DidiScreen style={{ width: "90%" }}>
				{this.state.token ? (
					<Fragment>
						<DidiText.Explanation.Normal>{strings.share.explanation}</DidiText.Explanation.Normal>
						<QRCode size={0.9 * Dimensions.get("window").width} value={this.state.token} />
						<DidiButton title={strings.share.next} onPress={() => this.navigate("ScanCredential", {})} />
					</Fragment>
				) : (
					<DidiText.Explanation.Normal>{strings.share.generating}</DidiText.Explanation.Normal>
				)}
			</DidiScreen>
		);
	}
}
