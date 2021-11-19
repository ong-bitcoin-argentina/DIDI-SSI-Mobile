import { CredentialDocument, SelectiveDisclosureProposal } from "@proyecto-didi/app-sdk";
import React, { Fragment } from "react";
import { Dimensions, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { DidiScrollScreen } from "../../common/DidiScreen";
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
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.share.title);

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
			<DidiScrollScreen>
				{this.state.token ? (
					<Fragment>
						<DidiText.Explanation.Normal>{strings.share.explanation}</DidiText.Explanation.Normal>
						<View style={{ marginVertical: 10 }}>
							<QRCode size={0.8 * Dimensions.get("window").width} value={this.state.token} />
						</View>
						<DidiButton
							title={strings.share.next}
							onPress={() => this.navigate("ScanCredential", { documents: this.props.documents })}
						/>
					</Fragment>
				) : (
					<DidiText.Explanation.Normal>{strings.share.generating}</DidiText.Explanation.Normal>
				)}
			</DidiScrollScreen>
		);
	}
}
