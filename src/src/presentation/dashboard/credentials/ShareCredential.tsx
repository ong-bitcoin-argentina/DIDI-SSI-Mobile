import { CredentialDocument } from "didi-sdk";
import React, { Fragment } from "react";
import { Alert, FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard } from "../common/documentToCard";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import ChevronBlueRight from "../../resources/images/chevronBlueRight.svg";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { ShareMicroCredentialProps } from "./ShareMicroCredential";
import { ShareSpecificCredentialProps } from "./ShareSpecificCredential";

export type ShareCredentialProps = {};
interface ShareCredentialInternalProps extends ShareCredentialProps {
	did: ActiveDid;
	credentials: CredentialDocument[];
	activeSpecialCredentials: SpecialCredentialMap;
}

interface ShareCredentialState {
	selectedCredentials: CredentialDocument[];
}

export interface ShareCredentialNavigation {
	ShareMicroCredential: ShareMicroCredentialProps;
	ShareSpecificCredential: ShareSpecificCredentialProps;
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
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<FlatList
						style={{ width: "100%" }}
						contentContainerStyle={{ paddingVertical: 8 }}
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
						extraData={this.state}
					/>
					{this.state.selectedCredentials.length === 0 ? (
						undefined
					) : (
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
					borderRadius: 10,
					backgroundColor: isSelected ? colors.primary : colors.background,
					marginHorizontal: 10,
					paddingHorizontal: 10,
					marginVertical: 2
				}}
				onPress={() => this.doSelect(document)}
			>
				<DocumentCredentialCard
					preview={false}
					document={document}
					context={{ activeDid: this.props.did, specialCredentials: this.props.activeSpecialCredentials }}
				/>
			</TouchableOpacity>
		);
	}

	private doSelect(document: CredentialDocument) {
		if (document.specialFlag && this.props.activeSpecialCredentials[document.specialFlag.type]?.jwt !== document.jwt) {
			Alert.alert(strings.credentialShare.notCurrent.title, strings.credentialShare.notCurrent.message);
		} else if (document.subject.did() !== this.props.did?.did()) {
			Alert.alert(strings.credentialShare.notOwned.title, strings.credentialShare.notOwned.message);
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
			this.navigate("ShareSpecificCredential", { documents });
		} else {
			this.navigate("ShareMicroCredential", {
				credentials: documents
					.map(doc => (doc.nested.length === 0 ? [doc] : doc.nested))
					.reduce((acc, next) => [...acc, ...next], [])
			});
		}
	}
}

export default didiConnect(
	ShareCredentialScreen,
	(state): ShareCredentialInternalProps => ({
		did: state.did,
		credentials: state.credentials,
		activeSpecialCredentials: state.activeSpecialCredentials
	})
);
