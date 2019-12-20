import React, { Fragment } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import DropdownMenu from "../../util/DropdownMenu";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import CredentialCard from "../common/CredentialCard";
import { DocumentCredentialCard, sampleDocumentToCard } from "../common/documentToCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { RecentActivity } from "../../../model/RecentActivity";
import { SampleDocument } from "../../../model/SampleDocument";
import { recoverTokens } from "../../../services/trustGraph/recoverTokens";
import { ValidatedIdentity } from "../../../store/selector/combinedIdentitySelector";
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
import { NotificationScreenProps } from "./NotificationScreen";

export type DashboardScreenProps = {};
interface DashboardScreenStateProps {
	person: ValidatedIdentity;
	credentials: CredentialDocument[];
	samples: SampleDocument[];
	recentActivity: RecentActivity[];
}
interface DashboardScreenDispatchProps {
	login(): void;
}
type DashboardScreenInternalProps = DashboardScreenProps & DashboardScreenStateProps & DashboardScreenDispatchProps;

export interface DashboardScreenNavigation {
	Access: StartAccessProps;
	DashboardDocuments: DocumentsScreenProps;
	ValidateID: ValidateIdentityExplainWhatProps;
	UserData: UserDataProps;
	NotificationScreen: NotificationScreenProps;
	DashDocumentDetail: DocumentDetailProps;
}

class DashboardScreen extends NavigationEnabledComponent<DashboardScreenInternalProps, {}, DashboardScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.gone;

	componentDidMount() {
		this.props.login();
	}

	private renderRegularDocuments() {
		return this.props.credentials.map((document, index) => (
			<TouchableOpacity key={`RG_${index}`} onPress={() => this.navigate("DashDocumentDetail", { document })}>
				<DocumentCredentialCard preview={true} document={document} />
			</TouchableOpacity>
		));
	}

	private renderSpecialDocuments() {
		if (!this.props.credentials.find(c => c.specialFlag?.type === "PersonalData")) {
			return this.incompleteIdentityCard();
		}
	}

	private incompleteIdentityCard(): JSX.Element {
		return (
			<CredentialCard
				icon=""
				category={strings.dashboard.identity.category}
				title={this.props.person.visual.name || ""}
				subTitle={strings.dashboard.identity.subTitle}
				color={colors.secondary}
				hollow={true}
			>
				<DidiButton
					style={{ width: 130, height: 36, backgroundColor: colors.secondary }}
					title={strings.dashboard.identity.validateButtonTitle}
					onPress={() => this.navigate("ValidateID", {})}
				/>
			</CredentialCard>
		);
	}

	private renderRecentActivities() {
		return (
			<View style={styles.dropdownContents}>
				{this.props.recentActivity.map((activity, index) => {
					return <DidiActivity key={index} activity={activity} style={styles.activities} />;
				})}
				<View>
					<TouchableOpacity onPress={() => {}}>
						<DidiText.Explanation.Emphasis style={styles.loadMoreText}>
							{strings.dashboard.recentActivities.loadMore + " +"}
						</DidiText.Explanation.Emphasis>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={[commonStyles.view.area, { backgroundColor: themes.navigation }]}>
					<ScrollView style={styles.body}>
						<HomeHeader
							person={this.props.person}
							onPersonPress={() => this.navigate("UserData", {})}
							onBellPress={() => this.navigate("NotificationScreen", {})}
						/>
						<View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
							<EvolutionCard credentials={this.props.credentials} />
							{this.renderRegularDocuments()}
							{this.props.samples.map(sampleDocumentToCard)}
							{this.renderSpecialDocuments()}
						</View>
						<DropdownMenu style={styles.dropdown} label={strings.dashboard.recentActivities.label}>
							{this.renderRecentActivities()}
						</DropdownMenu>
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}
}

export default didiConnect(
	DashboardScreen,
	(state): DashboardScreenStateProps => ({
		person: state.identity,
		recentActivity: state.recentActivity,
		credentials: state.credentials,
		samples: state.samples
	}),
	(dispatch): DashboardScreenDispatchProps => ({
		login: () => {
			dispatch({ type: "SESSION_LOGIN" });
			dispatch(recoverTokens());
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
	}
});
