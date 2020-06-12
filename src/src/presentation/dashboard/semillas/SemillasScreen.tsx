import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DashboardScreenProps } from "../home/Dashboard";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";

export interface SemillasScreenNavigation {
	DashboardHome: DashboardScreenProps;
};

class SemillasScreen extends NavigationEnabledComponent<{}, {}, {}> {

	// navigationOptions makes reference to the topbar navigation, in this case, with a left arrow which function is return to home
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<SemillasScreenNavigation, "DashboardHome">(
		strings.semillas.detailBarTitle,
		"DashboardHome",
		{}
	);

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView  style={{...commonStyles.view.area, ...styles.scrollContent}}>
					<DidiText.Title style={{ marginVertical: 20 }}>
						Programa Semillas
					</DidiText.Title>
					<DidiText.Explanation.Small style={styles.paragraph}>
						Si sos parte del programa Semillas ahora podes tener tus credenciales que certifican y validan tus datos personales.
					</DidiText.Explanation.Small>
					<DidiText.Explanation.Small style={styles.paragraph}>
						Tus credenciales son privadas, con ellas vas a poder guardar y proteger tu información de manera segura y confiable.
					</DidiText.Explanation.Small>
					<DidiText.Explanation.Small style={styles.paragraph}>
						Gracias a que son portables, las podes llevar con vos, acceder a ellas siempre que lo necesites y compartirlas con quién vos quieras.
					</DidiText.Explanation.Small>
					<DidiButton title={'Quiero mis Credenciales'} style={styles.button} titleStyle={styles.buttonText}/>
				</SafeAreaView>
			</Fragment>
		);
	}

}

export default didiConnect(
	SemillasScreen,
	(state): {} => ({})
);

const styles = StyleSheet.create({
	body: {
		width: "100%"
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingVertical: 8
	},
	paragraph: {
		marginVertical: 10
	},
	button: {
		marginTop: 30,
		paddingHorizontal: 20
	},
	buttonText: {
		fontSize: 16
	}
});
