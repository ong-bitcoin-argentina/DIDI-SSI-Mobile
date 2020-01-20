import { CredentialDocument } from "didi-sdk";
import React, { Fragment } from "react";
import { Alert, FlatList, SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard } from "../common/documentToCard";

import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { ShareMicroCredentialProps } from "./ShareMicroCredential";
import { ShareSpecificCredentialProps } from "./ShareSpecificCredential";

export type ShareCredentialProps = {};
interface ShareCredentialInternalProps extends ShareCredentialProps {
	credentials: CredentialDocument[];
	activeSpecialCredentials: SpecialCredentialMap;
}

type ShareCredentialState = {};

export interface ShareCredentialNavigation {
	ShareMicroCredential: ShareMicroCredentialProps;
	ShareSpecificCredential: ShareSpecificCredentialProps;
}

class ShareCredentialScreen extends NavigationEnabledComponent<
	ShareCredentialInternalProps,
	ShareCredentialState,
	ShareCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Compartir");

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<FlatList
						style={{ width: "100%" }}
						contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8 }}
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
							<DidiText.Explanation.Emphasis>{strings.credentialShare.whichFull}</DidiText.Explanation.Emphasis>
						}
					/>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderCard(document: CredentialDocument): JSX.Element {
		return (
			<TouchableOpacity onPress={() => this.doShare(document)}>
				<DocumentCredentialCard preview={false} document={document} context={this.props.activeSpecialCredentials} />
			</TouchableOpacity>
		);
	}

	private doShare(document: CredentialDocument) {
		if (document.specialFlag && this.props.activeSpecialCredentials[document.specialFlag.type]?.jwt !== document.jwt) {
			Alert.alert(strings.credentialShare.notCurrent.title, strings.credentialShare.notCurrent.message);
			return;
		}
		if (document.nested.length === 0) {
			this.navigate("ShareSpecificCredential", { document });
		} else {
			this.navigate("ShareMicroCredential", { credentials: document.nested });
		}
	}
}

export default didiConnect(
	ShareCredentialScreen,
	(state): ShareCredentialInternalProps => ({
		credentials: state.credentials,
		activeSpecialCredentials: state.activeSpecialCredentials
	})
);
