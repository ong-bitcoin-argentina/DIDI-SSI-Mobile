import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { uPortDocumentToCard } from "../common/documentToCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { liftToDerivedCredential } from "../../../model/DerivedCredential";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { ShareSpecificCredentialProps } from "./ShareSpecificCredential";

export interface ShareMicroCredentialProps {
	credentials: CredentialDocument[];
}

type ShareMicroCredentialState = {};

export interface ShareMicroCredentialNavigation {
	ShareSpecificCredential: ShareSpecificCredentialProps;
}

export class ShareMicroCredentialScreen extends NavigationEnabledComponent<
	ShareMicroCredentialProps,
	ShareMicroCredentialState,
	ShareMicroCredentialNavigation
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
							<DidiText.Explanation.Emphasis>{strings.credentialShare.whichMicro}</DidiText.Explanation.Emphasis>
						}
					/>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderCard(document: CredentialDocument) {
		return (
			<TouchableOpacity onPress={() => this.navigate("ShareSpecificCredential", { document })}>
				{uPortDocumentToCard(liftToDerivedCredential(document), 0)}
			</TouchableOpacity>
		);
	}
}
