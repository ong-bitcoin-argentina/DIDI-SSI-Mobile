import React from "react";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from '../../util/DidiText';
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import strings from "../../resources/strings";
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { didiConnect } from '../../../store/store';
import { ActiveDid } from '../../../store/reducers/didReducer';
import { CredentialDocument } from '@proyecto-didi/app-sdk';
import { createShareResponseToken, JwtDecodeDocuments } from '../../util/appRouter';
import { IShareRequestData } from '../../../model/ShareRequest';
import { shareResponse } from '../../../services/issuer/shareResponse';
interface ShareRespScreenStateProps {
	activeDid: ActiveDid;
}
interface ShareRespScreenProps {
	documents: CredentialDocument[],
	shareRequests: IShareRequestData[],

}
class ShareRespScreen extends NavigationEnabledComponent<
	ShareRespScreenProps & ShareRespScreenStateProps,
	{},
	{}
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.share.title);

	async componentDidMount(){
		const {shareRequests, documents, activeDid} = this.props;
		const vcDocuments = await JwtDecodeDocuments(documents);
		const shareResp = await createShareResponseToken(activeDid,shareRequests,vcDocuments);
		await shareResponse(activeDid,shareResp, shareRequests[0].callback);
	}
	render() {
		return (
			<SafeAreaView>
                <View style={styles.title} >
                    <DidiText.ChangePassword.Emphasis>{strings.shareResp.shareTitle}</DidiText.ChangePassword.Emphasis>
                </View>
                <View style={styles.description} >
					<DidiText.Explanation.Normal style={{textAlign:"left"}} >{strings.shareResp.explanation}</DidiText.Explanation.Normal>
                </View>
			</SafeAreaView>
		);
	}
}

const connected = didiConnect(
	ShareRespScreen,
	(state): ShareRespScreenStateProps => ({
		activeDid: state.did.activeDid,
	})
);

export { connected as ShareRespScreen };

const styles = StyleSheet.create({
	title:{
        marginVertical:'5%'
	},
    description:{
        marginHorizontal: '5%'
	},
});
