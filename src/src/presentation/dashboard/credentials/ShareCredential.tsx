import { CredentialDocument } from "didi-sdk";
import React, { Fragment } from "react";
import { Alert, FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
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
import Divider from "../common/Divider";

export type ShareCredentialProps = {};
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
}

class ShareCredentialScreen extends NavigationEnabledComponent<
	ShareCredentialInternalProps,
	ShareCredentialState,
	ShareCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.share.title);

	constructor(props: ShareCredentialInternalProps) {
		super(props);
		this.state = {
			selectedCredentials: []
		};
	}

	render() {
		const credentialsToShare = this.props.credentials.filter(
			credential => credential.category !== "identity" || !credential.specialFlag
		);

		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<FlatList
						style={{ width: "100%" }}
						contentContainerStyle={{ paddingVertical: 8 }}
						data={credentialsToShare}
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
							onPressItem={() => this.doShare(this.state.selectedCredentials)}
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
			case "normal":
			case "identity":
				return true;
			case "obsolete":
			case "revoked":
			case "share":
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

	private doShare(documents: CredentialDocument[]) {
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
