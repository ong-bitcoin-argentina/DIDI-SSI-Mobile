import { CredentialDocument } from "didi-sdk";
import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import DropdownMenu from "../../util/DropdownMenu";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard } from "../common/documentToCard";

import { RecentActivity } from "../../../model/RecentActivity";
import { reloadDid } from "../../../services/internal/reloadDid";
import { recoverTokens } from "../../../services/trustGraph/recoverTokens";
import { checkValidateDni } from "../../../services/user/checkValidateDni";
import { getAllIssuerNames, getIssuerNames } from "../../../services/user/getIssuerNames";
import { ActiveDid } from "../../../store/reducers/didReducer";
import { IssuerRegistry } from "../../../store/reducers/issuerReducer";
import { ValidatedIdentity } from "../../../store/selector/combinedIdentitySelector";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { didiConnect } from "../../../store/store";
import { StartAccessProps } from "../../access/StartAccess";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DocumentDetailProps } from "../documents/DocumentDetail";
import { DocumentsScreenProps } from "../documents/DocumentsScreen";
import { UserDataProps } from "../settings/userData/UserData";
import { ValidateIdentityExplainWhatProps } from "../validateIdentity/ValidateIdentityExplainWhat";

import DidiActivity from "./DidiActivity";
import { EvolutionCard } from "./EvolutionCard";
import HomeHeader from "./HomeHeader";
import { IncompleteIdentityCard } from "./IncompleteIdentityCard";
import { NotificationScreenProps } from "./NotificationScreen";

export type DashboardScreenProps = {};
interface DashboardScreenStateProps {
	did: ActiveDid;
	person: ValidatedIdentity;
	knownIssuers: IssuerRegistry;
	credentials: CredentialDocument[];
	recentActivity: RecentActivity[];
	activeSpecialCredentials: SpecialCredentialMap;
}
interface DashboardScreenDispatchProps {
	login(): void;
	resetDniValidation: () => void;
}
type DashboardScreenInternalProps = DashboardScreenProps & DashboardScreenStateProps & DashboardScreenDispatchProps;

interface DashboardScreenState {
	previewActivities: boolean;
}

export interface DashboardScreenNavigation {
	Access: StartAccessProps;
	DashboardDocuments: DocumentsScreenProps;
	ValidateID: ValidateIdentityExplainWhatProps;
	UserData: UserDataProps;
	NotificationScreen: NotificationScreenProps;
	DashDocumentDetail: DocumentDetailProps;
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
			previewActivities: true
		};
	}

	componentDidMount() {
		this.props.login();
	}

	private renderCard(document: CredentialDocument, index: number) {
		return (
			<TouchableOpacity
				key={`RG_${index}`}
				style={{ marginHorizontal: 20 }}
				onPress={() =>
					this.navigate("DashDocumentDetail", {
						document,
						did: this.props.did,
						knownIssuers: this.props.knownIssuers,
						activeSpecialCredentials: this.props.activeSpecialCredentials
					})
				}
			>
				<DocumentCredentialCard
					preview={true}
					document={document}
					context={{
						activeDid: this.props.did,
						knownIssuers: this.props.knownIssuers,
						specialCredentials: this.props.activeSpecialCredentials
					}}
				/>
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
						data={this.props.credentials}
						keyExtractor={(_, index) => index.toString()}
						renderItem={item => this.renderCard(item.item, item.index)}
						ListHeaderComponent={
							<Fragment>
								<HomeHeader
									person={this.props.person}
									onPersonPress={() => this.navigate("UserData", {})}
									onBellPress={() => this.navigate("NotificationScreen", {})}
								/>
								<View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
									<IncompleteIdentityCard
										onStartValidateId={() => this.navigate("ValidateID", {})}
										onValidateIdSuccess={() => {
											this.props.resetDniValidation();
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
			</Fragment>
		);
	}
}

export default didiConnect(
	DashboardScreen,
	(state): DashboardScreenStateProps => ({
		did: state.did,
		person: state.validatedIdentity,
		recentActivity: state.combinedRecentActivity,
		knownIssuers: state.knownIssuers,
		credentials: state.credentials,
		activeSpecialCredentials: state.activeSpecialCredentials
	}),
	(dispatch): DashboardScreenDispatchProps => ({
		login: () => {
			dispatch({ type: "SESSION_LOGIN" });
			dispatch(reloadDid());
			dispatch(recoverTokens());
			dispatch(checkValidateDni());
			dispatch(getAllIssuerNames());
		},
		resetDniValidation: () => dispatch({ type: "VALIDATE_DNI_RESET" })
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
