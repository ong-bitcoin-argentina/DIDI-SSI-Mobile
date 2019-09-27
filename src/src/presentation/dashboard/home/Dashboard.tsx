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
import { Document } from "../../../model/data/Document";
import { Identity } from "../../../model/data/Identity";
import { RecentActivity } from "../../../model/data/RecentActivity";
import { AddChildren } from "../../../util/ReactExtensions";
import HomeHeader from "./HomeHeader";
import { DocumentsScreenProps } from "../documents/DocumentsScreen";
import { UserDataProps } from "../settings/userData/UserData";
import { ValidateIdentityExplainWhatProps } from "../validateIdentity/ValidateIdentityExplainWhat";
import { StoreContent } from "../../../model/store";
import { flattenClaim } from "../../../uPort/VerifiedClaim";

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

	private evolutionCard(): JSX.Element {
		return (
			<DidiCard
				icon=""
				image={require("../../resources/images/precentageSample.png")}
				category="Proceso"
				title="Mi Evolución"
				subTitle="16.06.2019"
				textStyle={styles.textStyleWhite}
				style={cardStyles.evolution}
			>
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
			</DidiCard>
		);
	}

	private incompleteIdentityCard(): JSX.Element {
		return (
			<DidiCard
				icon=""
				category="Documento Identidad"
				title="Liliana Martinez"
				subTitle="Nombre"
				textStyle={styles.textStyleBlue}
				style={cardStyles.identityIncomplete}
			>
				<DidiButton
					style={{ width: 100, height: 30, backgroundColor: colors.secondary }}
					title="Validar Id"
					onPress={() => this.navigate("ValidateID", {})}
				/>
			</DidiCard>
		);
	}

	private completeIdentityCard(): JSX.Element {
		return (
			<DidiCard
				icon=""
				category="Documento Identidad"
				title="Liliana Martinez"
				subTitle="Nombre"
				textStyle={styles.textStyleBlue}
				style={cardStyles.identityIncomplete}
			>
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
			</DidiCard>
		);
	}

	private documentToCard(document: Document, index: number) {
		switch (document.type) {
			case "didi":
				return (
					<DidiCard
						key={index}
						icon={document.icon}
						image={document.image}
						category={document.category}
						title={document.title}
						subTitle={document.subtitle}
						textStyle={styles.textStyleWhite}
						style={cardStyles.document}
					>
						<DidiCardData data={document.data} textStyles={styles.textStyleWhite} columns={document.columns} />
					</DidiCard>
				);
			case "uPort":
				const { root, rest } = flattenClaim(document.claim.claims);
				const data = Object.entries(rest).map(([key, value]) => {
					return { label: key, value };
				});
				return (
					<DidiCard
						key={index}
						icon=""
						category="Credencial"
						title={root === "" ? "(Multiples credenciales)" : root}
						subTitle={document.claim.issuer}
						textStyle={styles.textStyleWhite}
						style={cardStyles.document}
					>
						<DidiCardData data={data} textStyles={styles.textStyleWhite} columns={1} />
					</DidiCard>
				);
		}
	}

	private renderCards() {
		return [
			this.evolutionCard(),
			...this.props.documents.map(this.documentToCard),
			this.state.isIdentityComplete ? this.completeIdentityCard() : this.incompleteIdentityCard()
		];
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
	(state: StoreContent): DashboardScreenInternalProps => {
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
