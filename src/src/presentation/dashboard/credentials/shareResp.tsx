import React, { Fragment } from "react";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from '../../util/DidiText';
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import strings from "../../resources/strings";
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { didiConnect } from '../../../store/store';
import { ActiveDid } from '../../../store/reducers/didReducer';
import { CredentialDocument } from '@proyecto-didi/app-sdk';
import { createShareResponseToken, JwtDecodeDocuments } from '../../util/appRouter';
import { IShareRequestData } from '../../../model/ShareRequest';
import { shareResponse } from '../../../services/issuer/shareResponse';
import { DataAlert } from "../../common/DataAlert";

interface ShareRespScreenNavigation {
	DashboardHome: {};
}
interface ShareRespScreenState {
	loading: boolean,
}

interface ShareRespScreenStateProps {
	activeDid: ActiveDid;
}
interface ShareRespScreenProps {
	documents: CredentialDocument[],
	shareRequests: IShareRequestData[],
	shareRequestId: string
}

type ShareRespProps = ShareRespScreenProps & ShareRespScreenStateProps;
class ShareRespScreen extends NavigationEnabledComponent<
	ShareRespProps,
	ShareRespScreenState,
	ShareRespScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.share.title);
	constructor(props: ShareRespProps) {
		super(props);
		this.state = {
			loading: false
		};
	}
	async componentDidMount() {
		const { shareRequestId, shareRequests, documents, activeDid } = this.props;
		const vcDocuments = await JwtDecodeDocuments(documents);
		const shareResp = await createShareResponseToken(activeDid, shareRequests, vcDocuments);
		const result = await shareResponse(activeDid, shareRequestId, shareResp, shareRequests[0].callback);
		if (result.status === "error") {
			DataAlert.alert(strings.vuIdentity.failure.retryButton + ' Nuevamente',
				'El Proceso del envío de las solicitudes de credenciales. \n\nSe encuentra fuera de servicio momentáneamente');
			this.navigate("DashboardHome", {});
		}

		this.setState({ loading: true });
	}
	render() {
		return (
			<Fragment>
				{this.state.loading ?
					<SafeAreaView>
						<View style={styles.title} >
							<DidiText.ChangePassword.Emphasis>{strings.shareResp.shareTitle}</DidiText.ChangePassword.Emphasis>
						</View>
						<View style={styles.description} >
							<DidiText.Explanation.Normal style={{ textAlign: "left" }} >{strings.shareResp.explanation}</DidiText.Explanation.Normal>
						</View>
					</SafeAreaView>
					: <View style={styles.loading}>
						<ActivityIndicator size="large" color='#5E49E2' />
					</View>}
			</Fragment>
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
	title: {
		marginVertical: '5%'
	},
	description: {
		marginHorizontal: '5%'
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
