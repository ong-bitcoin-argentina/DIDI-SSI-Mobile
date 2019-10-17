import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import { StatusBar, View, Modal, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { uPortDocumentToCard } from "../common/documentToCard";
import { ScanCredentialProps } from "./ScanCredential";
import { didiConnect } from "../../../store/store";

export interface ScanCredentialToAddProps {
	credential: CredentialDocument;
}
interface ScanCredentialToAddStateProps {
	existingTokens: string[];
}
interface ScanCredentialToAddDispatchProps {
	addCredential(credential: CredentialDocument): void;
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
						{uPortDocumentToCard(this.props.credential)}
						{this.props.existingTokens.includes(this.props.credential.jwt) ? this.renderExisting() : this.renderNew()}
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

	private acceptCredential() {
		this.props.addCredential(this.props.credential);
		this.goBack();
	}
}

const connected = didiConnect(
	ScanCredentialToAddScreen,
	(state): ScanCredentialToAddStateProps => {
		return {
			existingTokens: state.tokens
		};
	},
	(dispatch): ScanCredentialToAddDispatchProps => {
		return {
			addCredential: (credential: CredentialDocument) => dispatch({ type: "TOKEN_ENSURE", content: [credential.jwt] })
		};
	}
);
export { connected as ScanCredentialToAddScreen };

const styles = StyleSheet.create({
	body: {
		width: "100%",
		alignItems: "stretch",
		justifyContent: "space-evenly",
		flex: 1,
		paddingHorizontal: 20
	},
	button: {
		width: "80%",
		alignSelf: "center"
	}
});
