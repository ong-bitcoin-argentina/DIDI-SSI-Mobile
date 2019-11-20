import React, { Fragment } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import DropdownMenu from "../../util/DropdownMenu";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import CredentialCard from "../common/CredentialCard";
import { sampleDocumentToCard, uPortDocumentToCard } from "../common/documentToCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { DerivedCredential } from "../../../model/DerivedCredential";
import { RecentActivity } from "../../../model/RecentActivity";
import { SampleDocument } from "../../../model/SampleDocument";
import { recoverTokens } from "../../../services/trustGraph/recoverTokens";
import { ValidatedIdentity } from "../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../store/store";
import { StartAccessProps } from "../../access/StartAccess";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DocumentsScreenProps } from "../documents/DocumentsScreen";
import { UserDataProps } from "../settings/userData/UserData";
import { ValidateIdentityExplainWhatProps } from "../validateIdentity/ValidateIdentityExplainWhat";

import DidiActivity from "./DidiActivity";
import HomeHeader from "./HomeHeader";
import { NotificationScreenProps } from "./NotificationScreen";

export type DashboardScreenProps = {};
interface DashboardScreenStateProps {
	person: ValidatedIdentity;
	credentials: Array<DerivedCredential<CredentialDocument>>;
	samples: SampleDocument[];
	recentActivity: RecentActivity[];
}
interface DashboardScreenDispatchProps {
	login(): void;
}
type DashboardScreenInternalProps = DashboardScreenProps & DashboardScreenStateProps & DashboardScreenDispatchProps;

interface DashboardScreenState {
	isIdentityComplete: boolean;
}

export interface DashboardScreenNavigation {
	Access: StartAccessProps;
	DashboardDocuments: DocumentsScreenProps;
	ValidateID: ValidateIdentityExplainWhatProps;
	UserData: UserDataProps;
	NotificationScreen: NotificationScreenProps;
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
			isIdentityComplete: false
		};
	}

	componentDidMount() {
		this.props.login();
	}

	private evolutionCard(): JSX.Element {
		return (
			<CredentialCard
				icon=""
				image={require("../../resources/images/precentageSample.png")}
				category="Proceso"
				title="Mi Evolución"
				subTitle="16.06.2019"
				color={colors.primary}
				data={[
					{ label: "Validaciones:", value: " " },
					{ label: "Celu", value: "✓" },
					{ label: "Mail", value: "✓" },
					{ label: "ID", value: "ｘ" }
				]}
				columns={1}
			/>
		);
	}

	private incompleteIdentityCard(): JSX.Element {
		return (
			<CredentialCard
				icon=""
				category="Documento Identidad"
				title={this.props.person.visual.name}
				subTitle="Nombre"
				color={colors.secondary}
				hollow={true}
			>
				<DidiButton
					style={{ width: 100, height: 30, backgroundColor: colors.secondary }}
					title="Validar Id"
					onPress={() => this.navigate("ValidateID", {})}
				/>
			</CredentialCard>
		);
	}

	private completeIdentityCard(): JSX.Element {
		return (
			<CredentialCard
				icon=""
				category="Documento Identidad"
				title={this.props.person.visual.name}
				subTitle="Nombre"
				color={colors.secondary}
				data={[
					{ label: "Número", value: "25.390.189" },
					{ label: "Nacionalidad", value: "🇦🇷" },
					{ label: "Fecha Nac.", value: "16.06.76" },
					{ label: "Sexo", value: "F" }
				]}
				columns={2}
			/>
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
						<Text style={[commonStyles.text.emphasis, styles.loadMoreText]}>
							{strings.dashboard.recentActivities.loadMore + " +"}
						</Text>
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
							{this.evolutionCard()}
							{this.props.credentials.map(uPortDocumentToCard)}
							{this.props.samples.map(sampleDocumentToCard)}
							{this.state.isIdentityComplete ? this.completeIdentityCard() : this.incompleteIdentityCard()}
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
