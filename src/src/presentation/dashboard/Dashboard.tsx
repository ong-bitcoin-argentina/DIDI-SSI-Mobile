import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView } from "react-native";
import React, { Fragment } from "react";

import themes from "../resources/themes";
import commonStyles from "../access/resources/commonStyles";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import DidiButton from "../util/DidiButton";
import DidiCard from "./Card";
import { StartAccessProps } from "../access/StartAccess";
import colors from "../resources/colors";

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

	
	render() {
		let cards = [
			{
				icon: require("../resources/images/progressIcon.png"),
				image: require("../resources/images/precentageSample.png"),
				category: "Proceso",
				title: "Mi Evolución",
				timing: "16.06.2019",
				cardStyles: StyleSheet.create({
					textStyle: {
						color: "#FFF"
					},
					style: {
						backgroundColor: colors.primary
					}
				}),
				data: [
					{ id: "1", label: "Validaciónes:", value: " " },
					{ id: "2", label: "Celu", value: "✓" },
					{ id: "3", label: "Mail", value: "X " },
					{ id: "4", label: "ID", value: "✓" }
				],
				horizontal: false
			},
			{
				icon: require("../resources/images/placeIcon.png"),
				image: require("../resources/images/blankIcon.png"),
				category: "Cursos",
				title: "Maestro Pizzero",
				timing: "Anual",
				cardStyles: StyleSheet.create({
					textStyle: {
						color: "#FFF"
					},
					style: {
						backgroundColor: colors.secondary
					}
				}),
				data: [{ id: "1", label: "Horas acumuladas", value: "60 hs" }, { id: "2", label: "Promedio", value: "7 / 10" }],
				horizontal: false
			},
			{
				icon: require("../resources/images/addressIcon.png"),
				image: require("../resources/images/blankIcon.png"),
				category: "Propiedad",
				title: "Liliana Martinez",
				timing: "Vivienda",
				cardStyles: StyleSheet.create({
					textStyle: {
						color: "#FFF"
					},
					style: {
						backgroundColor: "#13c7e0"
					}
				}),
				data: [
					{ id: "1", label: "Dirección", value: "M. Belgrano" },
					{ id: "2", label: "Nro.", value: "0376" },
					{ id: "3", label: "Barrio", value: "31" },
					{ id: "4", label: "Folio", value: "#230495" },
					{ id: "5", label: "Testigos", value: "4" },
					{ id: "6", label: "Titulo", value: "En curso" }
				],
				horizontal: true
			},
			{
				icon: require("../resources/images/rondaIcon.png"),
				image: require("../resources/images/blankIcon.png"),
				category: "Ronda",
				title: "Los Martinez",
				timing: "Quincenal",
				cardStyles: StyleSheet.create({
					textStyle: {
						color: "#FFF"
					},
					style: {
						backgroundColor: "#906ecd"
					}
				}),
				data: [{ id: "1", label: "Acumulado", value: "$12.000" }, { id: "2", label: "Cuota", value: "6 / 6" }],
				horizontal: false
			},
			{
				icon: require("../resources/images/validationIcon.png"),
				image: require("../resources/images/blankIcon.png"),
				category: "Documento Identidad",
				title: "Liliana Martinez",
				timing: "Nombre",
				cardStyles: StyleSheet.create({
					textStyle: {
						color: colors.secondary
					},
					style: {
						backgroundColor: "#FFF",
						borderColor: colors.secondary,
						borderWidth: 2
					}
				}),
				data: [],
				child: (
					<DidiButton
						style={{ width: 100, height: 30, backgroundColor: colors.secondary }}
						title="ValidarId"
						onPress={() => {}}
					/>
				),
				horizontal: false
			}
		];

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

							{cards.map((card, index) => {
								return (
									<DidiCard
										key={index}
										icon={card.icon}
										image={card.image}
										category={card.category}
										title={card.title}
										timing={card.timing}
										cardStyles={card.cardStyles.style}
										textStyles={card.cardStyles.textStyle}
										data={card.data}
										showDataHorizontally={card.horizontal}
										child={card.child}
									/>
								);
							})}
						</ScrollView>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	cardStyles: {
		backgroundColor: "#13c7e0",
		marginBottom: 10
	},
	cardStyles2: {
		backgroundColor: "#aab245",
		marginBottom: 10
	},
	scroll: {
		justifyContent: "space-evenly"
	},
	menu: {
		marginBottom: 10
	}
});
