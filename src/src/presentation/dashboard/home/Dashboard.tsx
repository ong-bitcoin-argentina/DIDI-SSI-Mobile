import { CredentialDocument, Identity } from "@proyecto-didi/app-sdk";
import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
/**	before delete.
*	verify its use correspond
import { downloadFile, DocumentDirectoryPath, readFile } from "react-native-fs";
*/
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import DropdownMenu from "../../util/DropdownMenu";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DocumentCredentialCard, DocumentCredentialCardContext, extractContext } from "../common/documentToCard"; 
import UserInactivity from 'react-native-user-inactivity';
import { RecentActivity } from "../../../model/RecentActivity";
import { getAllIssuerNames } from "../../../services/user/getIssuerNames";
import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DocumentDetailProps } from "../documents/DocumentDetail";

import DidiActivity from "./DidiActivity";
import { EvolutionCard } from "./EvolutionCard";
import HomeHeader from "./HomeHeader";
import { NotificationScreenProps } from "./NotificationScreen";
/* do not delete 
import { AuthModal } from "../common/AuthModal";
*/
import { DocumentsScreenProps } from "../documents/DocumentsScreen";
import {
	successfullyLogged,
	loginDenied,
	deepLinkHandler,
	dynamicLinkHandler,
	navigateToCredentials,
	askedForLogin,
	createToken,
	handleCredentialDeepLink
} from "../../util/appRouter";
import { PendingLinkingState } from "../../../store/reducers/pendingLinkingReducer";
import { EditProfileProps } from "../settings/userMenu/EditProfile";
import { userHasRonda } from "../../../services/user/userHasRonda";
import { getPersonalData } from "../../../services/user/getPersonalData";
import { ValidatedIdentity } from "../../../store/selector/combinedIdentitySelector";
import { IdentityVerificationCard } from './IdentityVerificationCard';
import { CommonQuestionsScreenProps } from "../../common/CommonQuestions";
import { PoliticsScreenProps } from "../../common/Politics";

const INACTIVITY_TIME_EXPIRATION = 1800000000; // 3min = 180000

export type DashboardScreenProps = {};
interface DashboardScreenStateProps {
	did: ActiveDid;
	credentials: CredentialDocument[];
	validCredentials: CredentialDocument[];
	recentActivity: RecentActivity[];
	credentialContext: DocumentCredentialCardContext;
	pendingLinking: PendingLinkingState;
	hasRonda: boolean;
	imageUrl: string;
	imageId: string;
	identity: ValidatedIdentity;
}
interface DashboardScreenDispatchProps {
	login(): void;
	logout():void;
	resetDniValidation: () => void;
	finishDniValidation: (statusDni : string) => void;
	resetPendingLinking: () => void;
	setRondaAccount: (hasAccount: boolean) => void;
	getPersonalData: (token: string) => void;
	saveProfileImage: (image: any) => void;
}
type DashboardScreenInternalProps = DashboardScreenProps & DashboardScreenStateProps & DashboardScreenDispatchProps;

interface DashboardScreenState {
	previewActivities: boolean;
	showModal: boolean;
	loadImage: boolean;
	checkedPersonalData: boolean;
	identity: Identity;
}

export interface DashboardScreenNavigation {
	ValidateIdentity: {};
	EditProfile: EditProfileProps;
	NotificationScreen: NotificationScreenProps;
	CommonQuestions: CommonQuestionsScreenProps;
	Politics:PoliticsScreenProps;
	DashDocumentDetail: DocumentDetailProps;
	DashboardDocuments: DocumentsScreenProps;
	__DashboardSettings: {};
	DashboardIdentity: {};
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
			showModal: false,
			loadImage: false,
			checkedPersonalData: false,
			identity: {
				address: {},
				personalData: {}
			},
		};
	}

	permissionDenied = async () => {
		this.setState({ showModal: false });
		await loginDenied();
	};

	permissionGranted = async () => {
		const { did } = this.props;

		const verification = await createToken(did);
		if (!verification) {
			return;
		}

		this.setState({ showModal: false });
		this.handleSuccessRondaLinking();
		successfullyLogged(verification);
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
		if (link && link.url) {
			if (askedForLogin(link)) this.setState({ showModal: true });
			if (navigateToCredentials(link)) {
				handleCredentialDeepLink(this.props.navigation);
			}
		}
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
				style={commonStyles.util.credentialCard}
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

	private setIdentityMerging(identity: Partial<Identity>) {
		this.setState({ identity: Identity.merge(identity, this.state.identity) }, () => {
			this.props.saveProfileImage(this.state.identity);
		});
	}

	private async runGetPersonalData() {
		const token = await createToken(this.props.did);
		if (!token) {
			return;
		}
		this.setState({
			checkedPersonalData: true
		});
		this.props.getPersonalData(token);
	}

	private async runGetImageProfile() {
		this.setState({
			loadImage: true
		});

		/**	before delete.
		*	verify its use correspond
		const imgPath = `${DocumentDirectoryPath}/${this.props.imageId}.jpeg`;
		const response = downloadFile({
			fromUrl: this.props.imageUrl,
			toFile: imgPath
		}).promise.then(async result => {
			const data = await readFile(imgPath, "base64");
			this.setIdentityMerging({ image: { mimetype: "image/jpeg", data } });
		});
		*/
	}

	async shouldComponentUpdate(nextState) {
		if (this.props.did && !this.state.checkedPersonalData && !nextState.checkedPersonalData) {
			this.runGetPersonalData();
		}

		if (this.props.imageUrl && this.state.checkedPersonalData && !nextState.loadImage && !this.props.identity.image) {
			this.runGetImageProfile();
		}

		return false;
	}

	private async logOutByInactivity(isActive: boolean) {
		if(!isActive) {
			this.props.resetPendingLinking();
			this.props.logout();
			this.navigate("ExpiredAccount", {});
		}
	}

	render() {
		
		return (
			<Fragment>
					<UserInactivity
						timeForInactivity={INACTIVITY_TIME_EXPIRATION}					
						onAction={isActive => { this.logOutByInactivity(isActive); }}			
					>		
					<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
					<SafeAreaView style={[commonStyles.view.area, { backgroundColor: themes.navigation }]}>
					<FlatList
						style={styles.body}
						data={this.props.validCredentials}
						keyExtractor={(_, index) => index.toString()}
						renderItem={item => this.renderCard(item.item, item.index)}
						maxToRenderPerBatch={5}
						updateCellsBatchingPeriod={30}
						windowSize={6}
						ListHeaderComponent={
							<Fragment>
								<HomeHeader
									onPersonPress={() => this.navigate("EditProfile", {})}
									onBellPress={() => this.navigate("NotificationScreen", {})}
									onMarkPress={() => this.navigate("CommonQuestions", {})}
								/>
								<View style={styles.headerCredentials}> 
									<IdentityVerificationCard
										onStartValidateId={() => this.navigate("ValidateIdentity", {})}
										style={{ marginBottom: styles.headerCredentials.marginBottom }}
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
				{/* do not delete 
				<AuthModal
					appName="ronda"
					onCancel={this.permissionDenied}
					onOk={this.permissionGranted}
					visible={this.state.showModal}
					alreadyHave={this.props.hasRonda}
					automatic
				/> */}
				</UserInactivity>
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
		validCredentials: state.validCredentials,
		imageUrl: state.persistedPersonalData.imageUrl,
		imageId: state.persistedPersonalData.imageId,
		identity: state.validatedIdentity,
	}),
	(dispatch): DashboardScreenDispatchProps => ({
		login: () => {
			dispatch({ type: "SESSION_LOGIN" });
			dispatch(getAllIssuerNames());
		},
		logout: () => dispatch({ type: "SESSION_LOGOUT" }),
		resetDniValidation: () => dispatch({ type: "VALIDATE_DNI_RESET" }),
		resetPendingLinking: () => dispatch({ type: "PENDING_LINKING_RESET" }),
		finishDniValidation: (statusDni : string) => dispatch({ type: "VALIDATE_DNI_RESOLVE", state: { state: statusDni } }),
		setRondaAccount: (hasAccount: Boolean) => dispatch({ type: "SET_RONDA_ACCOUNT", value: hasAccount }),
		getPersonalData: (token: string) => dispatch(getPersonalData("getPersonalData", token)),
		saveProfileImage: (identity: Identity) => {
			dispatch({
				type: "IDENTITY_PATCH",
				value: identity
			});
		}
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
	},
	headerCredentials: {
		marginTop: 20,
		marginBottom: 10,
		paddingHorizontal: 14
	},
});