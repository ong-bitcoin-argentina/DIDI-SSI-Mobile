import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, TouchableOpacity, ViewStyle } from "react-native";
import React, { Fragment } from "react";

import { StartAccessProps } from "../access/StartAccess";
import themes from "../resources/themes";
import commonStyles from "../access/resources/commonStyles";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import DidiButton from "../util/DidiButton";
import DidiCard, { DidiCardProps } from "./DidiCard";
import DidiActivity from "./DidiActivity";
import colors from "../resources/colors";
import DidiCardData from "./DidiCardData";
import strings from "../resources/strings";
import DropdownMenu from "../util/DropdownMenu";
import { connect } from "react-redux";
import { LoggedInStoreContent, RecentActivity, Document, Identity } from "../../model/StoreContent";
import { AddChildren } from "../../util/ReactExtensions";
import HomeHeader from "./home/HomeHeader";
import { DocumentsScreenProps } from "./documents/DocumentsScreen";
import { UserDataProps } from "./settings/UserData";

export type DashboardScreenProps = {};
interface DashboardScreenInternalProps extends DashboardScreenProps {
	person: Identity;
	documents: Document[];
	recentActivity: RecentActivity[];
}
export interface DashboardScreenNavigation {
	Access: StartAccessProps;
	DashboardDocuments: DocumentsScreenProps;
	ValidateID: {}; // TODO: Implement
	UserData: UserDataProps;
}
type DashboardScreenState = {};

class DashboardScreen extends NavigationEnabledComponent<
	DashboardScreenInternalProps,
	DashboardScreenState,
	DashboardScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.gone;

	private evolutionCard(): AddChildren<DidiCardProps> {
		return {
			icon: require("../resources/images/progressIcon.png"),
			image: require("../resources/images/precentageSample.png"),
			category: "Proceso",
			title: "Mi Evolución",
			subTitle: "16.06.2019",
			textStyle: styles.textStyleWhite,
			style: cardStyles.evolution,
			children: (
				<DidiCardData
					data={[
						{ label: "Validaciónes:", value: " " },
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
			icon: require("../resources/images/validationIcon.png"),
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
			this.incompleteIdentityCard()
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
	document: {
		...commonCardStyle,
		backgroundColor: colors.secondary
	}
});
