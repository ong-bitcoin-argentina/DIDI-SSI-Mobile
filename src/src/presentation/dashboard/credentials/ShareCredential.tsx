import React from "react";
import { Fragment } from "react";
import { View, Text, StatusBar, SafeAreaView, FlatList, TouchableOpacity } from "react-native";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { uPortDocumentToCard } from "../common/documentToCard";
import { UPortDocument } from "../../../model/data/UPortDocument";
import { StoreContent } from "../../../model/store";
import { connect } from "react-redux";
import { ShareSpecificCredentialProps } from "./ShareSpecificCredential";

export type ShareCredentialProps = {};
interface ShareCredentialInternalProps extends ShareCredentialProps {
	documents: UPortDocument[];
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
					{this.props.documents.length > 0 ? (
						<FlatList
							style={{ width: "100%" }}
							data={this.props.documents}
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

	private renderCard(document: UPortDocument) {
		return (
			<TouchableOpacity onPress={() => this.navigate("ShareSpecificCredential", { document })}>
				{uPortDocumentToCard(document)}
			</TouchableOpacity>
		);
	}
}

export default connect(
	(state: StoreContent): ShareCredentialInternalProps => {
		return {
			documents: state.documents
		};
	}
)(ShareCredentialScreen);
