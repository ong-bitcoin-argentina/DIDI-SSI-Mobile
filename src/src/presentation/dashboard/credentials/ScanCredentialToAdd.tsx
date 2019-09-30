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

import { Document } from "../../../model/data/Document";
import { VerifiedClaim } from "../../../uPort/VerifiedClaim";
import { documentToCard } from "../common/documentToCard";
import { StoreContent } from "../../../model/store";

export type ScanCredentialToAddProps = {
	jwt: string;
	credential: VerifiedClaim;
};
interface ScanCredentialToAddStateProps {
	documents: Document[];
}
interface ScanCredentialToAddDispatchProps {
	addCredential(credential: Document): void;
}
type ScanCredentialToAddInternalProps = ScanCredentialToAddProps &
	ScanCredentialToAddStateProps &
	ScanCredentialToAddDispatchProps;

type ScanCredentialToAddState = {};
export interface ScanCredentialToAddNavigation {}

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
						{documentToCard(this.documentToAdd(), 0)}
						<Text style={commonStyles.text.normal}>¿Agregar esta credencial?</Text>
						<DidiButton style={styles.button} title="Si" onPress={() => this.acceptCredential()} />
						<DidiButton style={styles.button} title="No" onPress={() => this.goBack()} />
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private documentToAdd(): Document {
		return {
			type: "uPort",
			claim: this.props.credential,
			filterType: "other",
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
			addCredential: (credential: Document) => dispatch({ type: "DOCUMENT_ENSURE", content: credential })
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
