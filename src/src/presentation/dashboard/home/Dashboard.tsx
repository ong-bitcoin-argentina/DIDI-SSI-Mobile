import { CredentialDocument } from "didi-sdk";
import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View, Linking } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import DropdownMenu from "../../util/DropdownMenu";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard, DocumentCredentialCardContext, extractContext } from "../common/documentToCard";

import { RecentActivity } from "../../../model/RecentActivity";
import { checkValidateDni } from "../../../services/user/checkValidateDni";
import { getAllIssuerNames } from "../../../services/user/getIssuerNames";
import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DocumentDetailProps } from "../documents/DocumentDetail";
import { ValidateIdentityExplainWhatProps } from "../validateIdentity/ValidateIdentityExplainWhat";

import DidiActivity from "./DidiActivity";
import { EvolutionCard } from "./EvolutionCard";
import HomeHeader from "./HomeHeader";
import { IncompleteIdentityCard } from "./IncompleteIdentityCard";
import { NotificationScreenProps } from "./NotificationScreen";
import dynamicLinks from "@react-native-firebase/dynamic-links";

import { AuthModal } from "../common/AuthModal";
import { DocumentsScreenProps } from "../documents/DocumentsScreen";
import {
	successfullyLogged,
	loginDenied,
	deepLinkHandler,
	dynamicLinkHandler,
	navigateToCredentials,
	askedForLogin,
	createToken
} from "../../util/appRouter";
import { PendingLinkingState } from "../../../store/reducers/pendingLinkingReducer";
import { EditProfileProps } from "../settings/userMenu/EditProfile";
import { userHasRonda } from "../../../services/user/userHasRonda";

export type DashboardScreenProps = {};
interface DashboardScreenStateProps {
	did: ActiveDid;
	credentials: CredentialDocument[];
	validCredentials: CredentialDocument[];
	recentActivity: RecentActivity[];
	credentialContext: DocumentCredentialCardContext;
	pendingLinking: PendingLinkingState;
	hasRonda: Boolean;
}
interface DashboardScreenDispatchProps {
	login(): void;
	resetDniValidation: () => void;
	finishDniValidation: () => void;
	resetPendingLinking: () => void;
	setRondaAccount: (hasAccount: Boolean) => void;
}
type DashboardScreenInternalProps = DashboardScreenProps & DashboardScreenStateProps & DashboardScreenDispatchProps;

interface DashboardScreenState {
	previewActivities: boolean;
	showModal: boolean;
}

export interface DashboardScreenNavigation {
	ValidateID: ValidateIdentityExplainWhatProps;
	EditProfile: EditProfileProps;
	NotificationScreen: NotificationScreenProps;
	DashDocumentDetail: DocumentDetailProps;
	DashboardDocuments: DocumentsScreenProps;
	__DashboardSettings: {};
}

class DashboardScreen extends NavigationEnabledComponent<
	DashboardScreenInternalProps,
	DashboardScreenState,
	DashboardScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.gone;

	constructor(props: DashboardScreenInternalProps) {
		super(props);
		this.state = {
			previewActivities: true,
			showModal: false
		};
	}

	permissionDenied = async () => {
		this.setState({ showModal: false });
		await loginDenied();
	};

	permissionGranted = async () => {
		const { did } = this.props;

		createToken(did).then(async (verification: string) => {
			this.setState({ showModal: false });
			this.handleSuccessRondaLinking();
			successfullyLogged(verification);
		});
	};

	handleSuccessRondaLinking = async () => {
		const { did, hasRonda, setRondaAccount } = this.props;
		if (!hasRonda) {
			const response = await userHasRonda(did);
			const hasAccount = response._tag ? true : false;
			setRondaAccount(hasAccount);
		}
	};

	urlHandler = (link: { url: string } | null | undefined) => {
		if (!link) return;
		if (askedForLogin(link)) this.setState({ showModal: true });
		if (navigateToCredentials(link)) this.navigate("DashboardDocuments", {});
	};

	componentDidMount() {
		const { pendingLinking } = this.props;
		this.props.login();
		deepLinkHandler(this.urlHandler);
		dynamicLinkHandler(this.urlHandler);
		if (pendingLinking) {
			this.props.resetPendingLinking();
			this.urlHandler({ url: pendingLinking });
		}
	}

	private renderCard(document: CredentialDocument, index: number) {
		return (
			<TouchableOpacity
				key={`RG_${index}`}
				style={{ marginHorizontal: 20 }}
				onPress={() =>
					this.navigate("DashDocumentDetail", {
						document,
						credentialContext: this.props.credentialContext
					})
				}
			>
				<DocumentCredentialCard preview={true} document={document} context={this.props.credentialContext} />
			</TouchableOpacity>
		);
	}

	private renderRecentActivities() {
		const activities = this.state.previewActivities ? this.props.recentActivity.slice(0, 5) : this.props.recentActivity;
		return (
			<View style={styles.dropdownContents}>
				{activities.map((activity, index) => {
					return <DidiActivity key={index} activity={activity} style={styles.activities} />;
				})}
				{this.state.previewActivities && (
					<View>
						<TouchableOpacity onPress={() => this.setState({ previewActivities: !this.state.previewActivities })}>
							<DidiText.Explanation.Emphasis style={styles.loadMoreText}>
								{strings.dashboard.recentActivities.loadMore + " +"}
							</DidiText.Explanation.Emphasis>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={[commonStyles.view.area, { backgroundColor: themes.navigation }]}>
					<FlatList
						style={styles.body}
						data={this.props.validCredentials}
						keyExtractor={(_, index) => index.toString()}
						renderItem={item => this.renderCard(item.item, item.index)}
						ListHeaderComponent={
							<Fragment>
								<HomeHeader
									onPersonPress={() => this.navigate("EditProfile", {})}
									onBellPress={() => this.navigate("NotificationScreen", {})}
								/>
								<View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
									<IncompleteIdentityCard
										onStartValidateId={() => this.navigate("ValidateID", {})}
										onValidateIdSuccess={() => {
											this.props.finishDniValidation();
										}}
										onValidateIdFailure={() => {
											this.props.resetDniValidation();
										}}
									/>
									<EvolutionCard credentials={this.props.credentials} />
								</View>
							</Fragment>
						}
						ListFooterComponent={
							<DropdownMenu style={styles.dropdown} label={strings.dashboard.recentActivities.label}>
								{this.renderRecentActivities()}
							</DropdownMenu>
						}
					/>
				</SafeAreaView>
				<AuthModal
					appName="ronda"
					onCancel={this.permissionDenied}
					onOk={this.permissionGranted}
					visible={this.state.showModal}
					alreadyHave={this.props.hasRonda}
					automatic
				/>
			</Fragment>
		);
	}
}

export default didiConnect(
	DashboardScreen,
	(state): DashboardScreenStateProps => ({
		did: state.did.activeDid,
		recentActivity: state.combinedRecentActivity,
		credentials: state.credentials,
		credentialContext: extractContext(state),
		pendingLinking: state.pendingLinking,
		hasRonda: state.authApps.ronda,
		validCredentials: state.validCredentials
	}),
	(dispatch): DashboardScreenDispatchProps => ({
		login: () => {
			dispatch({ type: "SESSION_LOGIN" });
			dispatch(checkValidateDni());
			dispatch(getAllIssuerNames());
		},
		resetDniValidation: () => dispatch({ type: "VALIDATE_DNI_RESET" }),
		resetPendingLinking: () => dispatch({ type: "PENDING_LINKING_RESET" }),
		finishDniValidation: () => dispatch({ type: "VALIDATE_DNI_RESOLVE", state: { state: "Finished" } }),
		setRondaAccount: (hasAccount: Boolean) => dispatch({ type: "SET_RONDA_ACCOUNT", value: hasAccount })
	})
);

const styles = StyleSheet.create({
	body: {
		backgroundColor: colors.background,
		width: "100%"
	},
	menu: {
		marginBottom: 10
	},
	loadMoreText: {
		fontSize: 14,
		marginVertical: 16
	},
	dropdown: {
		backgroundColor: colors.darkBackground,
		width: "100%"
	},
	dropdownContents: {
		marginTop: 0
	},
	activities: {
		backgroundColor: "#FFF",
		marginBottom: 2
	}
});
