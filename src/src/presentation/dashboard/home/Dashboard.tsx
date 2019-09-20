import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, TouchableOpacity, ViewStyle } from "react-native";
import React, { Fragment } from "react";

import { StartAccessProps } from "../../access/StartAccess";
import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import DidiCard, { DidiCardProps } from "../common/DidiCard";
import DidiActivity from "./DidiActivity";
import colors from "../../resources/colors";
import DidiCardData from "../common/DidiCardData";
import strings from "../../resources/strings";
import DropdownMenu from "../../util/DropdownMenu";
import { connect } from "react-redux";
import { LoggedInStoreContent, RecentActivity, Document, Identity } from "../../../model/StoreContent";
import { AddChildren } from "../../../util/ReactExtensions";
import HomeHeader from "./HomeHeader";
import { DocumentsScreenProps } from "../documents/DocumentsScreen";
import { UserDataProps } from "../settings/userData/UserData";
import { ValidateIdentityExplainWhatProps } from "../validateIdentity/ValidateIdentityExplainWhat";

export type DashboardScreenProps = {};
interface DashboardScreenInternalProps extends DashboardScreenProps {
	person: Identity;
	documents: Document[];
	recentActivity: RecentActivity[];
}
export interface DashboardScreenNavigation {
	Access: StartAccessProps;
	DashboardDocuments: DocumentsScreenProps;
	ValidateID: ValidateIdentityExplainWhatProps;
	UserData: UserDataProps;
}
interface DashboardScreenState {
	isIdentityComplete: boolean;
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

	private evolutionCard(): AddChildren<DidiCardProps> {
		return {
			icon: "",
			image: require("../../resources/images/precentageSample.png"),
			category: "Proceso",
			title: "Mi Evolución",
			subTitle: "16.06.2019",
			textStyle: styles.textStyleWhite,
			style: cardStyles.evolution,
			children: (
				<DidiCardData
					data={[
						{ label: "Validaciones:", value: " " },
						{ label: "Celu", value: "✓" },
						{ label: "Mail", value: "ｘ" },
						{ label: "ID", value: "✓" }
					]}
					textStyles={styles.textStyleWhite}
					columns={1}
				/>
			)
		};
	}

	private incompleteIdentityCard(): AddChildren<DidiCardProps> {
		return {
			icon: "",
			category: "Documento Identidad",
			title: "Liliana Martinez",
			subTitle: "Nombre",
			textStyle: styles.textStyleBlue,
			style: cardStyles.identityIncomplete,
			children: (
				<DidiButton
					style={{ width: 100, height: 30, backgroundColor: colors.secondary }}
					title="Validar Id"
					onPress={() => this.navigate("ValidateID", {})}
				/>
			)
		};
	}

	private completeIdentityCard(): AddChildren<DidiCardProps> {
		return {
			icon: "",
			category: "Documento Identidad",
			title: "Liliana Martinez",
			subTitle: "Nombre",
			textStyle: styles.textStyleWhite,
			style: cardStyles.identityComplete,
			children: (
				<DidiCardData
					data={[
						{ label: "Número", value: "25.390.189" },
						{ label: "Nacionalidad", value: "🇦🇷" },
						{ label: "Fecha Nac.", value: "16.06.76" },
						{ label: "Sexo", value: "F" }
					]}
					textStyles={styles.textStyleWhite}
					columns={2}
				/>
			)
		};
	}

	private documentToCard(document: Document): AddChildren<DidiCardProps> {
		return {
			icon: document.icon,
			image: document.image,
			category: document.category,
			title: document.title,
			subTitle: document.subtitle,
			textStyle: styles.textStyleWhite,
			style: cardStyles.document,
			children: <DidiCardData data={document.data} textStyles={styles.textStyleWhite} columns={document.columns} />
		};
	}

	private renderCards() {
		const cards: Array<AddChildren<DidiCardProps>> = [
			this.evolutionCard(),
			...this.props.documents.map(this.documentToCard),
			this.state.isIdentityComplete ? this.completeIdentityCard() : this.incompleteIdentityCard()
		];
		return cards.map((card, index) => {
			return <DidiCard key={index} {...card} />;
		});
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
							onBellPress={() => this.navigate("DashboardDocuments", {})}
						/>
						{this.renderCards()}
						<DropdownMenu style={styles.dropdown} label={strings.dashboard.recentActivities.label}>
							{this.renderRecentActivities()}
						</DropdownMenu>
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}
}

export default connect(
	(state: LoggedInStoreContent): DashboardScreenInternalProps => {
		return {
			person: state.identity,
			recentActivity: state.recentActivity,
			documents: state.documents
		};
	}
)(DashboardScreen);

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
		width: "100%",
		marginTop: 20
	},
	dropdownContents: {
		marginTop: 0
	},
	activities: {
		backgroundColor: "#FFF",
		marginBottom: 2
	},
	textStyleWhite: {
		color: "#FFF"
	},
	textStyleBlue: {
		color: colors.secondary
	}
});

const commonCardStyle: ViewStyle = {
	marginHorizontal: 20,
	marginTop: 15
};
const cardStyles = StyleSheet.create({
	evolution: {
		...commonCardStyle,
		backgroundColor: colors.primary
	},
	identityIncomplete: {
		...commonCardStyle,
		backgroundColor: "#FFF",
		borderColor: colors.secondary,
		borderWidth: 2
	},
	identityComplete: {
		...commonCardStyle,
		backgroundColor: colors.secondary
	},
	document: {
		...commonCardStyle,
		backgroundColor: colors.secondary
	}
});
