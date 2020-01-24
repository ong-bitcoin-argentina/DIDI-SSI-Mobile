import { CredentialDocument } from "didi-sdk";
import { SelectiveDisclosureProposal } from "didi-sdk/src/protocol/packets/SelectiveDisclosureProposal";
import React, { Fragment } from "react";
import { Dimensions, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { RecentActivity } from "../../../model/RecentActivity";
import { didiConnect } from "../../../store/store";
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
	recordLinkShare: (document: CredentialDocument) => void;
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

class ShareSpecificCredentialScreen extends NavigationEnabledComponent<
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
		const content = SelectiveDisclosureProposal.from(this.props.documents);
		const token = await SelectiveDisclosureProposal.signJWT(await getCredentials(), content);
		this.setState({ token });
	}

	render() {
		return (
			<DidiScreen style={{ width: "90%" }}>
				<DidiText.Explanation.Normal>{strings.share.explanation}</DidiText.Explanation.Normal>
				{this.state.token ? (
					<Fragment>
						<QRCode size={0.9 * Dimensions.get("window").width} value={this.state.token} />
						<DidiButton title={strings.share.next} onPress={() => this.navigate("ScanCredential", {})} />
					</Fragment>
				) : (
					<DidiText.Explanation.Normal>{strings.share.generating}</DidiText.Explanation.Normal>
				)}
				{this.props.documents.length === 1 ? (
					<Fragment>
						<DidiText.Explanation.Normal>o</DidiText.Explanation.Normal>
						<DidiButton
							title={strings.share.shareLink}
							onPress={() => {
								this.shareLink(this.props.documents[0]);
							}}
						/>
					</Fragment>
				) : (
					undefined
				)}
			</DidiScreen>
		);
	}

	private shareLink(document: CredentialDocument) {
		const jwt = document.jwt;
		Share.share({
			title: strings.share.title,
			message: `${this.props.sharePrefix}/${jwt}`
		});
		this.props.recordLinkShare(document);
	}
}

const connected = didiConnect(
	ShareSpecificCredentialScreen,
	(state): ShareSpecificCredentialStateProps => ({
		sharePrefix: state.serviceSettings.sharePrefix
	}),
	(dispatch): ShareSpecificCredentialDispatchProps => ({
		recordLinkShare: (document: CredentialDocument) =>
			dispatch({
				type: "RECENT_ACTIVITY_ADD",
				value: RecentActivity.from("SHARE", [document])
			})
	})
);

export { connected as ShareSpecificCredentialScreen };
