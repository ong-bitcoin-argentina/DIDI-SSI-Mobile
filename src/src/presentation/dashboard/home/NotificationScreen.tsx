import { CredentialDocument, SelectiveDisclosureRequest } from "didi-sdk";
import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { assertUnreachable } from "../../../util/assertUnreachable";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard, DocumentCredentialCardContext, extractContext } from "../common/documentToCard";
import { RequestCard } from "../common/RequestCard";

import { recoverTokens } from "../../../services/trustGraph/recoverTokens";
import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { ScanDisclosureRequestProps } from "../credentials/ScanDisclosureRequest";
import { DocumentDetailProps, DocumentDetailScreen } from "../documents/DocumentDetail";

export type NotificationScreenProps = {};
interface NotificationScreenStateProps {
	did: ActiveDid;
	parsedTokens: Array<CredentialDocument | SelectiveDisclosureRequest>;
	seenTokens: string[];
	credentialContext: DocumentCredentialCardContext;
}
interface NotificationScreenDispatchProps {
	onOpen: () => void;
	markAsJustSeen: (tokens: string[]) => void;
}
type NotificationScreenInternalProps = NotificationScreenProps &
	NotificationScreenStateProps &
	NotificationScreenDispatchProps;

type NotificationScreenState = {
	showExpired: boolean;
	initialSeenTokens: string[];
};
export interface NotificationScreenNavigation {
	ScanDisclosureRequest: ScanDisclosureRequestProps;
	DocumentDetail: DocumentDetailProps;
}

class NotificationScreen extends NavigationEnabledComponent<
	NotificationScreenInternalProps,
	NotificationScreenState,
	NotificationScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.notifications.barTitle);

	constructor(props: NotificationScreenInternalProps) {
		super(props);
		this.state = {
			showExpired: false,
			initialSeenTokens: props.seenTokens
		};
	}

	componentDidMount() {
		this.props.onOpen();
	}

	render() {
		const toShow = this.props.parsedTokens.filter(tk => {
			if (!this.state.initialSeenTokens.includes(tk.jwt)) {
				return true;
			}
			switch (tk.type) {
				case "CredentialDocument":
					return false;
				case "SelectiveDisclosureRequest":
					return this.state.showExpired || SelectiveDisclosureRequest.isValidNow(tk);
				default:
					assertUnreachable(tk);
			}
		});
		this.props.markAsJustSeen(this.props.parsedTokens.map(tk => tk.jwt));

		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<FlatList
						style={styles.body}
						contentContainerStyle={styles.scrollContent}
						data={toShow}
						keyExtractor={req => req.jwt}
						renderItem={item => this.renderItem(item.item)}
						ListHeaderComponent={
							<DidiButton
								title={this.state.showExpired ? strings.notifications.hideExpired : strings.notifications.showExpired}
								onPress={() => this.setState({ showExpired: !this.state.showExpired })}
							/>
						}
						ListEmptyComponent={
							<View style={styles.empty}>
								<DidiText.Explanation.Normal>{strings.notifications.noRequestsAvailable}</DidiText.Explanation.Normal>
							</View>
						}
					/>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderItem(item: CredentialDocument | SelectiveDisclosureRequest) {
		switch (item.type) {
			case "CredentialDocument":
				return this.renderCredential(item);
			case "SelectiveDisclosureRequest":
				return this.renderRequest(item);
			default:
				assertUnreachable(item);
		}
	}

	private renderCredential(document: CredentialDocument) {
		return (
			<TouchableOpacity
				onPress={() =>
					this.navigate("DocumentDetail", {
						document,
						credentialContext: this.props.credentialContext
					})
				}
			>
				<DocumentCredentialCard preview={true} document={document} context={this.props.credentialContext} />
			</TouchableOpacity>
		);
	}

	private renderRequest(request: SelectiveDisclosureRequest) {
		const now = Math.floor(Date.now() / 1000);
		const isActive = request.expireAt ? now < request.expireAt : true;
		return (
			<RequestCard key={request.jwt} request={request} context={this.props.credentialContext}>
				<View style={{ marginTop: 10 }}>
					{isActive ? (
						<DidiButton
							title={strings.notifications.sendResponse}
							style={{ width: 100, height: 30, backgroundColor: colors.secondary }}
							onPress={() => this.onSendResponse(request)}
						/>
					) : (
						<Text>{strings.notifications.requestExpired}</Text>
					)}
				</View>
			</RequestCard>
		);
	}

	private onSendResponse(request: SelectiveDisclosureRequest) {
		this.navigate("ScanDisclosureRequest", {
			request,
			onGoBack: screen => screen.goBack()
		});
	}
}

const connected = didiConnect(
	NotificationScreen,
	(state): NotificationScreenStateProps => ({
		did: state.did,
		parsedTokens: state.parsedTokens,
		seenTokens: state.seenTokens,
		credentialContext: extractContext(state)
	}),
	(dispatch): NotificationScreenDispatchProps => ({
		onOpen: () => dispatch(recoverTokens()),
		markAsJustSeen: (tokens: string[]) => dispatch({ type: "SEEN_TOKEN_ADD", content: tokens })
	})
);

export { connected as NotificationScreen };

const styles = StyleSheet.create({
	body: {
		width: "100%"
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingVertical: 8
	},
	empty: {
		marginVertical: 20
	}
});
