import {
	Text,
	View,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	ScrollView,
	StyleProp,
	TextStyle,
	TouchableOpacity,
	ViewStyle
} from "react-native";
import React, { Fragment } from "react";

import { StartAccessProps } from "../access/StartAccess";
import themes from "../resources/themes";
import commonStyles from "../access/resources/commonStyles";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import DidiButton from "../util/DidiButton";
import DidiCard, { DidiCardProps } from "./Card";
import DidiActivity from "./Activity";
import colors from "../resources/colors";
import DidiCardData from "./CardData";
import strings from "../resources/strings";
import DropdownMenu from "../util/DropdownMenu";
import { connect } from "react-redux";
import { LoggedInStoreContent, RecentActivity, Document } from "../../model/StoreContent";
import { AddChildren } from "../../util/ReactExtensions";

export type DashboardScreenProps = {};
interface DashboardScreenInternalProps extends DashboardScreenProps {
	documents: Document[];
	recentActivity: RecentActivity[];
}
export interface DashboardScreenNavigation {
	Access: StartAccessProps;
}
type DashboardScreenState = {};

class DashboardScreen extends NavigationEnabledComponent<
	DashboardScreenInternalProps,
	DashboardScreenState,
	DashboardScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Home");

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
						{ label: "Mail", value: "X " },
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
					onPress={() => {}}
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
					return (
						<DidiActivity
							key={index}
							icon={activity.icon}
							title={activity.title}
							description={activity.description}
							state={activity.state}
							date={activity.date}
							style={styles.activities}
						/>
					);
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
				<SafeAreaView style={commonStyles.view.area}>
					<ScrollView style={styles.body} contentContainerStyle={styles.scrollContainer}>
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
		return { recentActivity: state.recentActivity, documents: state.documents };
	}
)(DashboardScreen);

const styles = StyleSheet.create({
	body: {
		width: "100%"
	},
	scrollContainer: {
		paddingTop: 15
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
		marginTop: -20
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
	marginHorizontal: 20
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
