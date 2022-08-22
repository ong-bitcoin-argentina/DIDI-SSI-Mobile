import { CredentialDocument } from "@proyecto-didi/app-sdk";
import React from "react";
import { Image, Share, View } from "react-native";
import { DidiScrollScreen } from "../../common/DidiScreen";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { RecentActivity } from "../../../model/RecentActivity";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import { ShareSpecificCredentialProps } from "./ShareSpecificCredential";
import { savePresentation } from "../../../services/user/savePresentation";

const { Normal, Small } = DidiText.Explanation;
const { shareExplanation } = strings;

export interface ShareExplanationProps {
	documents: CredentialDocument[];
}
interface ShareExplanationStateProps {
	viewerApiUrl: string;
}
interface ShareExplanationDispatchProps {
	recordLinkShare: (documents: CredentialDocument[]) => void;
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
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.shareExplanation.title);

	render() {
		return (
			<DidiScrollScreen>
				<Normal>{shareExplanation.explanation}</Normal>

				<Image style={commonStyles.image.image} source={require("../../resources/images/login.png")} />

				<View>
					<DidiButton title={shareExplanation.direct.button} onPress={() => this.shareDirect(this.props.documents)} />
					<Small>{shareExplanation.direct.explanation}</Small>

					<Normal style={{ marginTop: 18 }}>{shareExplanation.or}</Normal>
					<DidiButton title={shareExplanation.link.button} onPress={() => this.shareLink(this.props.documents)} />
				</View>
			</DidiScrollScreen>
		);
	}

	private async shareLink(documents: CredentialDocument[]) {
		const jwt = documents.map(doc => doc.jwt);
		const jwtString = JSON.stringify(jwt);

		const idPresentation = await savePresentation(jwtString);
		const shareUrl = `${this.props.viewerApiUrl}/presentation/${idPresentation}`;

		Share.share({
			title: strings.shareExplanation.title,
			message: strings.shareExplanation.shareMessage(shareUrl)
		});
		
		for (const document of documents) {
			this.props.recordLinkShare([document]);	
		}
	}

	private shareDirect(documents: CredentialDocument[]) {
		this.navigate("ShareSpecificCredential", { documents });
	}
}

const connected = didiConnect(
	ShareExplanationScreen,
	(state): ShareExplanationStateProps => ({
		viewerApiUrl: state.serviceSettings.viewerApiUrl
	}),
	(dispatch): ShareExplanationDispatchProps => ({
		recordLinkShare: (documents: CredentialDocument[]) =>
			dispatch({
				type: "RECENT_ACTIVITY_ADD",
				value: RecentActivity.from("SHARE", documents)
			})
	})
);

export { connected as ShareExplanationScreen };
