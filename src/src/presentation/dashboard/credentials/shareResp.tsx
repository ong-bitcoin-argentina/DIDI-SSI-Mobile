import React from "react";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from '../../util/DidiText';
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import strings from "../../resources/strings";
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { didiConnect } from '../../../store/store';
import { ActiveDid } from '../../../store/reducers/didReducer';
import { IssuerDetilState } from '../issuers/IssuerDetail';
import { CredentialDocument } from '@proyecto-didi/app-sdk';
import { createSharedResponseToken } from '../../util/appRouter';

interface ShareRespScreenStateProps {
	activeDid: ActiveDid;
}
interface ShareRespScreenProps {
	documents: CredentialDocument[],
	shareRequest: IssuerDetilState[],

}
class ShareRespScreen extends NavigationEnabledComponent<
	ShareRespScreenProps & ShareRespScreenStateProps,
	{},
	{}
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.share.title);

	/*[
		{
			"data": {
				"aud": "0x18a208fdf867348db23e3bde3d1e3ab4cf60f9e9", 
				"callback": "Callback presentacion A-6", 
				"claims": [{
					"verifiable": {
						"mobilePhone": {
							"issuers": [{
								"did": "did:ethr:0x1991a96792cdccf016aad9d7cea654367488fdf5", 
								"url": "url emisor: Test-A6 (campo opcional)"
							}], 
							"reason": "Necesito que confirmes su Telefono", 
							"required": true
						}
					}
				}], 
				"iat": 1653930464, 
				"iss": "did:ethr:lacchain:0x1991a96792cdccf016aad9d7cea654367488fdf5", 
				"type": "shareReq"
			}, 
			"status": "success"
		}
	]*/

	async componentDidMount(){
		const {shareRequest, documents, activeDid} = this.props;
		// const jwt = documents.map(doc => doc.jwt);
		// const objectRequest = {
		// 	"iat": shareRequest[0].data.iat,
		// 	"type": shareRequest[0].data.type,
		// 	"aud": shareRequest[0].data.aud,
		// 	"iss": shareRequest[0].data.iss,
		// 	"exp": 9,
		// 	"req": "req",
		// 	"vc": [shareRequest[0].data]
		// }
		// const objetResponse = {
		// 	"iat": shareRequest[0].data.iat,
		// 	"type": shareRequest[0].data.type,
		// 	"aud": shareRequest[0].data.aud,
		// 	"iss": shareRequest[0].data.iss,
		// 	"exp": 9,
		// 	"req": "transformar este objectRequest en jwt",
		// 	"vc": jwt,
		// }
		// console.log(objetResponse);
		const result = await createSharedResponseToken(activeDid,shareRequest,documents);
		console.log('miraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		console.log(result);
		
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
