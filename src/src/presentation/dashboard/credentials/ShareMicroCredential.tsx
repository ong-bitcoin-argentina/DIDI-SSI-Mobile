import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";

import commonStyles from "../../resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { uPortDocumentToCard } from "../common/documentToCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { liftToDerivedCredential } from "../../../model/DerivedCredential";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
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
								<Text style={commonStyles.text.normal}>Primero obten credenciales</Text>
							</View>
						}
						ListHeaderComponent={
							<Text style={commonStyles.text.emphasis}>¿Qué parte de la credencial deseas compartir?</Text>
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
