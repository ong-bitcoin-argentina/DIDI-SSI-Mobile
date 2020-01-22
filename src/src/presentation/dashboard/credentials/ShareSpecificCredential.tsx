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
type ShareSpecificCredentialInternalProps = ShareSpecificCredentialProps & ShareSpecificCredentialStateProps;

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
			</DidiScreen>
		);
	}
}

const connected = didiConnect(
	ShareSpecificCredentialScreen,
	(state): ShareSpecificCredentialStateProps => {
		return {
			sharePrefix: state.serviceSettings.sharePrefix
		};
	}
);

export { connected as ShareSpecificCredentialScreen };
