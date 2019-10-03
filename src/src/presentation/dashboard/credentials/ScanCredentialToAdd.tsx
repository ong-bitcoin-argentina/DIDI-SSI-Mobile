import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import { StatusBar, View, Modal, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";

import { UPortDocument } from "../../../model/data/UPortDocument";
import { VerifiedClaim } from "../../../uPort/VerifiedClaim";
import { uPortDocumentToCard } from "../common/documentToCard";
import { StoreContent } from "../../../model/store";
import { ScanCredentialProps } from "./ScanCredential";

export type ScanCredentialToAddProps = {
	jwt: string;
	credential: VerifiedClaim;
};
interface ScanCredentialToAddStateProps {
	documents: UPortDocument[];
}
interface ScanCredentialToAddDispatchProps {
	addCredential(credential: UPortDocument): void;
}
type ScanCredentialToAddInternalProps = ScanCredentialToAddProps &
	ScanCredentialToAddStateProps &
	ScanCredentialToAddDispatchProps;

type ScanCredentialToAddState = {};
export interface ScanCredentialToAddNavigation {
	ScanCredential: ScanCredentialProps;
}

class ScanCredentialToAddScreen extends NavigationEnabledComponent<
	ScanCredentialToAddInternalProps,
	ScanCredentialToAddState,
	ScanCredentialToAddNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={styles.body}>
						{uPortDocumentToCard(this.documentToAdd())}
						{this.props.documents.find(doc => doc.jwt === this.props.jwt) ? this.renderExisting() : this.renderNew()}
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderExisting() {
		return <Text style={commonStyles.text.normal}>Ya dispones de esta credencial</Text>;
	}

	private renderNew() {
		return (
			<Fragment>
				<Text style={commonStyles.text.normal}>¿Agregar esta credencial?</Text>
				<DidiButton style={styles.button} title="Si" onPress={() => this.acceptCredential()} />
				<DidiButton style={styles.button} title="No" onPress={() => this.replace("ScanCredential", {})} />
			</Fragment>
		);
	}

	private documentToAdd(): UPortDocument {
		return {
			claim: this.props.credential,
			jwt: this.props.jwt
		};
	}

	private acceptCredential() {
		this.props.addCredential(this.documentToAdd());
		this.goBack();
	}
}

export default connect(
	(state: StoreContent): ScanCredentialToAddStateProps => {
		return {
			documents: state.documents
		};
	},
	(dispatch): ScanCredentialToAddDispatchProps => {
		return {
			addCredential: (credential: UPortDocument) => dispatch({ type: "DOCUMENT_ENSURE", content: credential })
		};
	}
)(ScanCredentialToAddScreen);

const styles = StyleSheet.create({
	body: {
		width: "100%",
		alignItems: "stretch",
		justifyContent: "space-evenly",
		flex: 1
	},
	button: {
		width: "80%",
		alignSelf: "center"
	}
});
