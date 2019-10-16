import React from "react";
import { Fragment } from "react";
import { View, Text, StatusBar, SafeAreaView, FlatList, TouchableOpacity } from "react-native";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { uPortDocumentToCard } from "../common/documentToCard";
import { CredentialDocument } from "../../../model/data/CredentialDocument";
import { didiConnect } from "../../../model/store";
import { ShareSpecificCredentialProps } from "./ShareSpecificCredential";

export type ShareCredentialProps = {};
interface ShareCredentialInternalProps extends ShareCredentialProps {
	credentials: CredentialDocument[];
}

type ShareCredentialState = {};

export interface ShareCredentialNavigation {
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
					{this.props.credentials.length > 0 ? (
						<FlatList
							style={{ width: "100%" }}
							contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8 }}
							data={this.props.credentials}
							keyExtractor={doc => doc.jwt}
							renderItem={item => this.renderCard(item.item)}
						/>
					) : (
						<View style={commonStyles.view.body}>
							<Text style={commonStyles.text.normal}>Primero obten credenciales de uPort</Text>
						</View>
					)}
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderCard(document: CredentialDocument) {
		return (
			<TouchableOpacity onPress={() => this.navigate("ShareSpecificCredential", { document })}>
				{uPortDocumentToCard(document)}
			</TouchableOpacity>
		);
	}
}

export default didiConnect(
	ShareCredentialScreen,
	(state): ShareCredentialInternalProps => {
		return {
			credentials: state.credentials
		};
	}
);
