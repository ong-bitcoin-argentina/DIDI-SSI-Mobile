import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, StyleProp, TextStyle } from "react-native";
import React, { Fragment } from "react";

import { StartAccessProps } from "../access/StartAccess";
import themes from "../resources/themes";
import commonStyles from "../access/resources/commonStyles";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import DidiButton from "../util/DidiButton";
import DidiCard from "./Card";
import DidiActivity from "./Activity";
import colors from "../resources/colors";
import DidiCardData from "./CardData";
import strings from "../resources/strings";
import DropdownMenu from "../util/DropdownMenu";

export interface DashboardScreenNavigation {
	Access: StartAccessProps;
}
export type DashboardScreenProps = {};
type DashboardScreenState = {};

export class DashboardScreen extends NavigationEnabledComponent<
	DashboardScreenProps,
	DashboardScreenState,
	DashboardScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Home");

	private getCards() {
		return [
			{
				icon: require("../resources/images/progressIcon.png"),
				image: require("../resources/images/precentageSample.png"),
				category: "Proceso",
				title: "Mi Evolución",
				subTitle: "16.06.2019",
				textStyle: styles.textStyleWhite,
				cardStyles: StyleSheet.create({
					style: {
						backgroundColor: colors.primary
					}
				}),
				child: (
					<DidiCardData
						data={[
							{ id: "1", label: "Validaciónes:", value: " " },
							{ id: "2", label: "Celu", value: "✓" },
							{ id: "3", label: "Mail", value: "X " },
							{ id: "4", label: "ID", value: "✓" }
						]}
						textStyles={styles.textStyleWhite}
						isHorizontal={false}
					/>
				)
			},
			{
				icon: require("../resources/images/placeIcon.png"),
				image: require("../resources/images/blankIcon.png"),
				category: "Cursos",
				title: "Maestro Pizzero",
				subTitle: "Anual",
				textStyle: styles.textStyleWhite,
				cardStyles: StyleSheet.create({
					style: {
						backgroundColor: colors.secondary
					}
				}),
				child: (
					<DidiCardData
						data={[
							{ id: "1", label: "Horas acumuladas", value: "60 hs" },
							{ id: "2", label: "Promedio", value: "7 / 10" }
						]}
						textStyles={styles.textStyleWhite}
						isHorizontal={false}
					/>
				)
			},
			{
				icon: require("../resources/images/addressIcon.png"),
				image: require("../resources/images/blankIcon.png"),
				category: "Propiedad",
				title: "Liliana Martinez",
				subTitle: "Vivienda",
				textStyle: styles.textStyleWhite,
				cardStyles: StyleSheet.create({
					style: {
						backgroundColor: "#13c7e0"
					}
				}),
				child: (
					<DidiCardData
						data={[
							{ id: "1", label: "Dirección", value: "M.Belgrano" },
							{ id: "2", label: "Nro.", value: "0376" },
							{ id: "3", label: "Barrio", value: "31" },
							{ id: "4", label: "Folio", value: "#230495" },
							{ id: "5", label: "Testigos", value: "4" },
							{ id: "6", label: "Titulo", value: "En curso" }
						]}
						textStyles={styles.textStyleWhite}
						isHorizontal={true}
					/>
				)
			},
			{
				icon: require("../resources/images/rondaIcon.png"),
				image: require("../resources/images/blankIcon.png"),
				category: "Ronda",
				title: "Los Martinez",
				subTitle: "Quincenal",
				textStyle: styles.textStyleWhite,
				cardStyles: StyleSheet.create({
					style: {
						backgroundColor: "#906ecd"
					}
				}),
				child: (
					<DidiCardData
						data={[{ id: "1", label: "Acumulado", value: "$12.000" }, { id: "2", label: "Cuota", value: "6 / 6" }]}
						textStyles={styles.textStyleWhite}
						isHorizontal={false}
					/>
				)
			},
			{
				icon: require("../resources/images/validationIcon.png"),
				image: require("../resources/images/blankIcon.png"),
				category: "Documento Identidad",
				title: "Liliana Martinez",
				subTitle: "Nombre",
				textStyle: styles.textStyleBlue,
				cardStyles: StyleSheet.create({
					style: {
						backgroundColor: "#FFF",
						borderColor: colors.secondary,
						borderWidth: 2
					}
				}),
				child: (
					<DidiButton
						style={{ width: 100, height: 30, backgroundColor: colors.secondary }}
						title="Validar Id"
						onPress={() => {}}
					/>
				)
			}
		];
	}

	private renderCards() {
		let cards = this.getCards();
		return cards.map((card, index) => {
			return (
				<DidiCard
					key={index}
					icon={card.icon}
					image={card.image}
					category={card.category}
					title={card.title}
					subTitle={card.subTitle}
					cardStyles={card.cardStyles.style}
					textStyles={card.textStyle}
				>
					{card.child}
				</DidiCard>
			);
		});
	}

	private getRecentActivities() {
		return [
			{
				icon: require("../resources/images/docsIcon.png"),
				title: "Documentos",
				description: "Documento Identidad",
				state: "Validado",
				date: "12/09/2018"
			},
			{
				icon: require("../resources/images/rondaIcon.png"),
				title: "Ronda Los Martinez",
				description: "Cuota 2/12",
				state: "Pagado",
				date: "12/09/2018"
			},
			{
				icon: require("../resources/images/coursesIcon.png"),
				title: "Cursos",
				description: "Maestro Pizzero",
				state: "Terminado",
				date: "12/09/2018"
			}
		];
	}

	private renderRecentActivities() {
		let activities = this.getRecentActivities();
		return (
			<View>
				{activities.map((activity, index) => {
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
			</View>
		);
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<ScrollView>
							<View style={styles.menu}>
								<Text style={[commonStyles.text.emphasis]}>Dashboard en construccion</Text>
								<DidiButton title="Log Out" onPress={() => this.navigate("Access", {})} />
							</View>

							{this.renderCards()}

							<DropdownMenu label={strings.dashboard.recentActivities}>{this.renderRecentActivities()}</DropdownMenu>
						</ScrollView>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	scroll: {
		justifyContent: "space-evenly"
	},
	menu: {
		marginBottom: 10
	},
	activities: {
		backgroundColor: "#FFF",
		marginBottom: 10
	},
	textStyleWhite: {
		color: "#FFF"
	},
	textStyleBlue: {
		color: colors.secondary
	}
});
