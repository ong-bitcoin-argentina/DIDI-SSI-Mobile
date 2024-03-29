import { SelectiveDisclosureProposal, SelectiveDisclosureRequest } from "@proyecto-didi/app-sdk";
import React, { Fragment } from "react";
import { Dimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { getCredentials } from "../../../uPort/getCredentials";
import strings from "../../resources/strings";

import { ScanDisclosureResponseProps } from "./ScanDisclosureResponse";

export interface ShowDisclosureRequestProps {
	proposal: SelectiveDisclosureProposal;
}

interface ShowDisclosureRequestState {
	token?: string;
}

export interface ShowDisclosureRequestNavigation {
	ScanDisclosureResponse: ScanDisclosureResponseProps;
}

export class ShowDisclosureRequestScreen extends NavigationEnabledComponent<
	ShowDisclosureRequestProps,
	ShowDisclosureRequestState,
	ShowDisclosureRequestNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.share.title);

	constructor(props: ShowDisclosureRequestProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.loadToken();
	}

	private async loadToken() {
		const token = await SelectiveDisclosureRequest.fulfilling(await getCredentials(), this.props.proposal);
		this.setState({ token });
	}

	render() {
		const token = this.state.token;
		return (
			<DidiScreen style={{ width: "90%" }}>
				<DidiText.Explanation.Normal>{strings.disclose.request.explanation}</DidiText.Explanation.Normal>
				{token ? (
					<Fragment>
						<QRCode size={0.9 * Dimensions.get("window").width} value={token} />
						<DidiButton
							title={strings.disclose.request.next}
							onPress={() =>
								this.navigate("ScanDisclosureResponse", {
									request: token
								})
							}
						/>
					</Fragment>
				) : (
					<DidiText.Explanation.Normal>{strings.share.generating}</DidiText.Explanation.Normal>
				)}
			</DidiScreen>
		);
	}
}
