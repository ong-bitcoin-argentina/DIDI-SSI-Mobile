import { CredentialDocument } from "@proyecto-didi/app-sdk";
import React, { Fragment } from "react";
import { Alert, FlatList, SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import {
	credentialState,
	DocumentCredentialCard,
	DocumentCredentialCardContext,
	extractContext
} from "../common/documentToCard";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import ChevronBlueRight from "../../resources/images/chevronBlueRight.svg";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { ShareExplanationProps } from "./ShareExplanationScreen";
import { ShareMicroCredentialProps } from "./ShareMicroCredential";
import { CredentialStates } from "../../../model/Credential";
import { IShareRequestData } from '../../../model/ShareRequest';

export type ShareCredentialProps = Record<string, unknown>;
interface ShareCredentialInternalProps extends ShareCredentialProps {
	credentialContext: DocumentCredentialCardContext;
	did: ActiveDid;
	credentials: CredentialDocument[];
	activeSpecialCredentials: SpecialCredentialMap;
}

interface ShareCredentialState {
	selectedCredentials: CredentialDocument[];
}

export interface ShareCredentialNavigation {
	ShareMicroCredential: ShareMicroCredentialProps;
	ShareExplanation: ShareExplanationProps;
	ShareResp:{};
}

interface ShareRespCredential {
	shareResp: boolean
	shareRequests: IShareRequestData[]
	shareRequestId?: string
}

type ShareCredentialScreenProps = ShareCredentialInternalProps & ShareRespCredential;
class ShareCredentialScreen extends NavigationEnabledComponent<
	ShareCredentialScreenProps,
	ShareCredentialState,
	ShareCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.share.title);

	constructor(props: ShareCredentialScreenProps) {
		super(props);
		this.state = {
			selectedCredentials: []
		};
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<FlatList
						style={{ width: "100%" }}
						contentContainerStyle={{ paddingVertical: 8 }}
						data={this.props.credentials}
						keyExtractor={(_, index) => index.toString()}
						renderItem={item => this.renderCard(item.item)}
						ListEmptyComponent={
							<View style={commonStyles.view.body}>
								<DidiText.Explanation.Normal>
									{strings.credentialShare.noCredentialsAvailable}
								</DidiText.Explanation.Normal>
							</View>
						}
						ListHeaderComponent={
							this.props.shareResp?
							<View style={commonStyles.view.area}>
								<DidiText.Explanation.Emphasis style={{marginVertical:'2%'}}>
								{"Compartir Credenciales con Emisor"}
							    </DidiText.Explanation.Emphasis>
								<DidiText.Explanation.Normal style={{marginVertical:'2%'}}>
									{"Seleccione las credenciales que le solicitaron"}
								</DidiText.Explanation.Normal>
							</View>:
							<DidiText.Explanation.Emphasis style={{ marginVertical: 10 }}>
								{strings.credentialShare.whichFull}
							</DidiText.Explanation.Emphasis>
						}
						extraData={this.state}
					/>
					{this.state.selectedCredentials.length === 0 ? undefined : (
						<FloatingAction
							color={colors.backgroundSeparator}
							overrideWithAction={true}
							actions={[
								{ name: "", icon: <ChevronBlueRight width={14} height={24} />, color: colors.backgroundSeparator }
							]}
							onPressItem={() => this.doShare(this.state.selectedCredentials, this.props.shareResp)}
						/>
					)}
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderCard(document: CredentialDocument): JSX.Element {
		const isSelected = this.state.selectedCredentials.find(doc => doc.jwt === document.jwt);
		return (
			<TouchableOpacity
				style={{
					...commonStyles.util.credentialCard,
					borderRadius: 10,
					backgroundColor: isSelected ? colors.primary : colors.background
				}}
				onPress={() => this.doSelect(document)}
			>
				<DocumentCredentialCard preview={false} document={document} context={this.props.credentialContext} />
			</TouchableOpacity>
		);
	}

	private contextAllowsShare(document: CredentialDocument): boolean {
		switch (credentialState(document, this.props.credentialContext)) {
			case CredentialStates.normal:
			case CredentialStates.identity:
				return true;
			case CredentialStates.obsolete:
			case CredentialStates.revoked:
			case CredentialStates.share:
				return false;
		}
	}

	private doSelect(document: CredentialDocument) {
		if (!this.contextAllowsShare(document)) {
			Alert.alert(strings.credentialShare.notCurrent.title, strings.credentialShare.notCurrent.message);
		} else if (this.state.selectedCredentials.find(doc => doc.jwt === document.jwt)) {
			const selectedCredentials = this.state.selectedCredentials.filter(doc => doc.jwt !== document.jwt);
			this.setState({ selectedCredentials });
		} else {
			const selectedCredentials = [...this.state.selectedCredentials, document];
			this.setState({ selectedCredentials });
		}
	}

	private doShare(documents: CredentialDocument[], shareResp?: boolean ) {
		if (shareResp === true) {
			this.navigate("ShareResp", { 
				documents,
				shareRequests: this.props.shareRequests,
				shareRequestId: this.props.shareRequestId,
			});
		}  else {
			if (documents.every(doc => doc.nested.length === 0)) {
				this.navigate("ShareExplanation", { documents });
			} else {
				this.navigate("ShareMicroCredential", {
					credentials: documents
						.map(doc => (doc.nested.length === 0 ? [doc] : [doc, ...doc.nested]))
						.reduce((acc, next) => [...acc, ...next], []),
					credentialContext: this.props.credentialContext
				});
			}
		}
	}
}

export default didiConnect(
	ShareCredentialScreen,
	(state): ShareCredentialInternalProps => {
		const did = state.did.activeDid;
		const credentials = did
			? state.credentials.filter(document => document.subject.did() === did.did())
			: state.credentials;
		return {
			did,
			credentials,
			activeSpecialCredentials: state.activeSpecialCredentials,
			credentialContext: extractContext(state)
		};
	}
);
