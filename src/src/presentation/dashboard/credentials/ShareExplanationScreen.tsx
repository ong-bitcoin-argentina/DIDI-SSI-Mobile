import { CredentialDocument } from "didi-sdk";
import React from "react";
import { Image, Share, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
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

export interface ShareExplanationProps {
	documents: CredentialDocument[];
}
interface ShareExplanationStateProps {
	baseURL: string;
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

	private async shareLink(documents: CredentialDocument[]) {
		const jwt = documents.map(doc => doc.jwt);
		const jwtString = JSON.stringify(jwt);

		const idPresentation = await savePresentation(jwtString);

		Share.share({
			title: strings.shareExplanation.title,
			message: strings.shareExplanation.shareMessage(`${this.props.baseURL}/presentation/${idPresentation}`)
		});
		this.props.recordLinkShare(documents);
	}
}

const connected = didiConnect(
	ShareExplanationScreen,
	(state): ShareExplanationStateProps => ({
		baseURL: state.serviceSettings.didiUserServer
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
