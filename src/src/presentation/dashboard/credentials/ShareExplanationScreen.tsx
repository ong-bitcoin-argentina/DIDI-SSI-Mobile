import { CredentialDocument, SelectiveDisclosureProposal } from "didi-sdk";
import React, { Fragment } from "react";
import { Dimensions, Image, Share, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { RecentActivity } from "../../../model/RecentActivity";
import { didiConnect } from "../../../store/store";
import { getCredentials } from "../../../uPort/getCredentials";
import strings from "../../resources/strings";

import { ShareSpecificCredentialProps } from "./ShareSpecificCredential";
import { savePresentation } from "../../../services/user/savePresentation";

export interface ShareExplanationProps {
	documents: CredentialDocument[];
}
interface ShareExplanationStateProps {
	sharePrefix: string;
}
interface ShareExplanationDispatchProps {
	recordLinkShare: (documents: CredentialDocument[]) => void;
	savePresentation: (jwts: string) => void;
}
type ShareExplanationInternalProps = ShareExplanationProps & ShareExplanationStateProps & ShareExplanationDispatchProps;

export interface ShareExplanationNavigation {
	ShareSpecificCredential: ShareSpecificCredentialProps;
}

class ShareExplanationScreen extends NavigationEnabledComponent<
	ShareExplanationInternalProps,
	{},
	ShareExplanationNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.shareExplanation.title);

	render() {
		return (
			<DidiScreen style={{ width: "90%" }}>
				<DidiText.Explanation.Normal>{strings.shareExplanation.explanation}</DidiText.Explanation.Normal>

				<Image style={commonStyles.image.image} source={require("../../resources/images/login.png")} />

				<View>
					<DidiButton
						title={strings.shareExplanation.link.button}
						onPress={() => this.shareLink(this.props.documents)}
					/>
				</View>
			</DidiScreen>
		);
	}

	private shareLink(documents: CredentialDocument[]) {
		// const jwt = documents.map(doc => doc.jwt).join(",");
		const jwt = documents.map(doc => doc.jwt);
		const jwtString = JSON.stringify(jwt);
		const response = this.props.savePresentation(jwtString);
		console.log(jwtString);
		Share.share({
			title: strings.shareExplanation.title,
			message: strings.shareExplanation.shareMessage(`${this.props.sharePrefix}/${jwt.join(",")}`)
		});
		this.props.recordLinkShare(documents);
	}
}

const connected = didiConnect(
	ShareExplanationScreen,
	(state): ShareExplanationStateProps => ({
		sharePrefix: state.serviceSettings.sharePrefix
	}),
	(dispatch): ShareExplanationDispatchProps => ({
		recordLinkShare: (documents: CredentialDocument[]) =>
			dispatch({
				type: "RECENT_ACTIVITY_ADD",
				value: RecentActivity.from("SHARE", documents)
			}),
		savePresentation: (jwts: string) => dispatch(savePresentation("savePresentation", jwts))
	})
);

export { connected as ShareExplanationScreen };
