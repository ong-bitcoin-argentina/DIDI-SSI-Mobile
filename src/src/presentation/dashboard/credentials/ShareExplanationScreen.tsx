import { CredentialDocument, SelectiveDisclosureProposal } from "didi-sdk";
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

const { Normal, Small } = DidiText.Explanation;
const { shareExplanation } = strings;

export interface ShareExplanationProps {
	documents: CredentialDocument[];
}
interface ShareExplanationStateProps {
	sharePrefix: string;
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

	private shareLink(documents: CredentialDocument[]) {
		const jwt = documents.map(doc => doc.jwt).join(",");
		Share.share({
			title: strings.shareExplanation.title,
			message: strings.shareExplanation.shareMessage(`${this.props.sharePrefix}/${jwt}`)
		});
		this.props.recordLinkShare(documents);
	}

	private shareDirect(documents: CredentialDocument[]) {
		this.navigate("ShareSpecificCredential", { documents });
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
			})
	})
);

export { connected as ShareExplanationScreen };
