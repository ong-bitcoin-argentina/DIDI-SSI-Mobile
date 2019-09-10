import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React, { Fragment } from "react";

import themes from "../resources/themes";
import commonStyles from "../access/resources/commonStyles";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";
import DidiButton from "../util/DidiButton";
import DidiCard from "./Card";

export type DashboardScreenNavigation = {};
export type DashboardScreenProps = {};
type DashboardScreenState = {};

export class DashboardScreen extends NavigationEnabledComponent<
	DashboardScreenProps,
	DashboardScreenState,
	DashboardScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.gone;

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
				{ label: "Promedio", value: "7 / 10" },
				{ label: "Horas 4", value: "60 hs" },
				{ label: "Promedio", value: "7 / 10" },
				{ label: "Horas 5", value: "60 hs" },
				{ label: "Promedio", value: "7 / 10" },
				{ label: "Horas 6", value: "60 hs" },
				{ label: "Promedio", value: "7 / 10" }
			]
		};

		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text style={[commonStyles.text.emphasis]}>Dashboard en construccion</Text>
						<DidiButton title="Log Out" onPress={() => this.goToRoot()} />

						<DidiCard
							icon={cardProps.icon}
							image={cardProps.image}
							category={cardProps.category}
							title={cardProps.title}
							timing={cardProps.timing}
							cardStyles={cardProps.cardStyles}
							data={cardProps.data}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	cardStyles: {
		backgroundColor: "#13c7e0"
	}
});
