import { CredentialDocument } from "@proyecto-didi/app-sdk";
import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard, DocumentCredentialCardContext } from "../common/documentToCard";

import colors from "../../resources/colors";
import ChevronBlueRight from "../../resources/images/chevronBlueRight.svg";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { ShareExplanationProps } from "./ShareExplanationScreen";

export interface ShareMicroCredentialProps {
	credentials: CredentialDocument[];
	credentialContext: DocumentCredentialCardContext;
}

interface ShareMicroCredentialState {
	selectedCredentials: CredentialDocument[];
}

export interface ShareMicroCredentialNavigation {
	ShareExplanation: ShareExplanationProps;
}

export class ShareMicroCredentialScreen extends NavigationEnabledComponent<
	ShareMicroCredentialProps,
	ShareMicroCredentialState,
	ShareMicroCredentialNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose("Compartir");

	constructor(props: ShareMicroCredentialProps) {
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
							<DidiText.Explanation.Emphasis>{strings.credentialShare.whichMicro}</DidiText.Explanation.Emphasis>
						}
						extraData={this.state}
					/>
					{this.state.selectedCredentials.length === 0 ? undefined : (
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

	private renderCard(document: CredentialDocument) {
		const isSelected = this.state.selectedCredentials.find(doc => doc.jwt === document.jwt);
		return (
			<TouchableOpacity
				style={{
					borderRadius: 10,
					backgroundColor: isSelected ? colors.primary : colors.background,
					...commonStyles.util.credentialCard
				}}
				onPress={() => this.doSelect(document)}
			>
				<DocumentCredentialCard preview={false} document={document} context={this.props.credentialContext} />
			</TouchableOpacity>
		);
	}

	private doSelect(document: CredentialDocument) {
		if (this.state.selectedCredentials.find(doc => doc.jwt === document.jwt)) {
			const selectedCredentials = this.state.selectedCredentials.filter(doc => doc.jwt !== document.jwt);
			this.setState({ selectedCredentials });
		} else {
			const selectedCredentials = [...this.state.selectedCredentials, document];
			this.setState({ selectedCredentials });
		}
	}

	private doShare(documents: CredentialDocument[]) {
		this.navigate("ShareExplanation", { documents });
	}
}
