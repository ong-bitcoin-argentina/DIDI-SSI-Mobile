import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView } from "react-native";
import React, { Fragment } from "react";

import themes from "../resources/themes";
import commonStyles from "../access/resources/commonStyles";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import DidiButton from "../util/DidiButton";
import DidiCard from "./Card";
import { StartAccessProps } from "../access/StartAccess";

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
		let cardProps = {
			icon: require("../resources/images/placeIcon.png"),
			image: require("../access/resources/images/arg.png"),
			category: "Cursos",
			title: "Maestro Pizzero",
			timing: "Anual",
			cardStyles: styles.cardStyles,
			data: [
				{ label: "Horas 1", value: "60 hs" },
				{ label: "Promedio", value: "7 / 10" },
				{ label: "Horas 2", value: "60 hs" },
				{ label: "Promedio", value: "7 / 10" },
				{ label: "Horas 3", value: "60 hs" },
				{ label: "Promedio", value: "7 / 10" }
			]
		};

		let cardProps2 = {
			icon: require("../resources/images/placeIcon.png"),
			image: require("../access/resources/images/arg.png"),
			category: "Cursos",
			title: "Maestro Pizzero",
			timing: "Anual",
			cardStyles: styles.cardStyles2,
			data: [{ label: "Horas 1", value: "60 hs" }, { label: "Promedio", value: "7 / 10" }]
		};

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

							<DidiCard
								icon={cardProps.icon}
								image={cardProps.image}
								category={cardProps.category}
								title={cardProps.title}
								timing={cardProps.timing}
								cardStyles={cardProps.cardStyles}
								data={cardProps.data}
							/>

							<DidiCard
								icon={cardProps2.icon}
								image={cardProps2.image}
								category={cardProps2.category}
								title={cardProps2.title}
								timing={cardProps2.timing}
								cardStyles={cardProps2.cardStyles}
								data={cardProps2.data}
							/>

							<DidiCard
								icon={cardProps.icon}
								image={cardProps.image}
								category={cardProps.category}
								title={cardProps.title}
								timing={cardProps.timing}
								cardStyles={cardProps.cardStyles}
								data={cardProps.data}
							/>

							<DidiCard
								icon={cardProps2.icon}
								image={cardProps2.image}
								category={cardProps2.category}
								title={cardProps2.title}
								timing={cardProps2.timing}
								cardStyles={cardProps2.cardStyles}
								data={cardProps2.data}
							/>

							<DidiCard
								icon={cardProps.icon}
								image={cardProps.image}
								category={cardProps.category}
								title={cardProps.title}
								timing={cardProps.timing}
								cardStyles={cardProps.cardStyles}
								data={cardProps.data}
							/>

							<DidiCard
								icon={cardProps2.icon}
								image={cardProps2.image}
								category={cardProps2.category}
								title={cardProps2.title}
								timing={cardProps2.timing}
								cardStyles={cardProps2.cardStyles}
								data={cardProps2.data}
							/>

							<DidiCard
								icon={cardProps.icon}
								image={cardProps.image}
								category={cardProps.category}
								title={cardProps.title}
								timing={cardProps.timing}
								cardStyles={cardProps.cardStyles}
								data={cardProps.data}
							/>
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
