import React from "react";
import { Fragment } from "react";
import { View, Text, StatusBar, SafeAreaView, FlatList, TouchableOpacity } from "react-native";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { uPortDocumentToCard } from "../common/documentToCard";
import { CredentialDocument } from "../../../model/CredentialDocument";
import { didiConnect } from "../../../store/store";
import { ShareSpecificCredentialProps } from "./ShareSpecificCredential";
import { DerivedCredential } from "../../../model/DerivedCredential";
import { ShareMicroCredentialProps } from "./ShareMicroCredential";

export type ShareCredentialProps = {};
interface ShareCredentialInternalProps extends ShareCredentialProps {
	credentials: Array<DerivedCredential<CredentialDocument>>;
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
								<Text style={commonStyles.text.normal}>Primero obten credenciales</Text>
							</View>
						}
						ListHeaderComponent={<Text style={commonStyles.text.emphasis}>¿Qué credencial deseas compartir?</Text>}
					/>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderCard(document: DerivedCredential<CredentialDocument>) {
		return (
			<TouchableOpacity onPress={() => this.doShare(document)}>{uPortDocumentToCard(document, 0)}</TouchableOpacity>
		);
	}

	private doShare(document: DerivedCredential<CredentialDocument>) {
		if (document.sources.length === 1) {
			this.navigate("ShareSpecificCredential", { document: document.sources[0] });
		} else {
			this.navigate("ShareMicroCredential", {
				credentials: document.sources.sort((l, r) => {
					const ax = Object.values(l.content.claims);
					const bx = Object.values(r.content.claims);
					const a = Object.keys(ax[0] as object).length;
					const b = Object.keys(bx[0] as object).length;
					return b - a;
				})
			});
		}
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
