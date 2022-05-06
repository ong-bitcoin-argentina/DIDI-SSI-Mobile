import React from "react";
import { DidiScreen } from "./DidiScreen";
import NavigationHeaderStyle from "./NavigationHeaderStyle";
import DidiButton from "../util/DidiButton";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import { DidiText } from "../util/DidiText";
import { StyleSheet, View } from 'react-native';
import colors from "../resources/colors";
import Icon from "react-native-vector-icons/AntDesign";
export type ExpiredAccountScreenProps = {};
export type ExpiredAccountScreenNavigation = {};

export class ExpiredAccountScreen extends NavigationEnabledComponent<ExpiredAccountScreenProps,{},ExpiredAccountScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.gone;

	render() {		
		return(
			<DidiScreen style={{justifyContent:'flex-start', paddingVertical: 30}}>
				<View style={{ alignItems: "center", marginBottom: 20 }}>
					<Icon name="warning" color={colors.yellow} size={70}  />
				</View>

				<DidiText.Explanation.Normal>
					Tiempo de sesión expirado
				</DidiText.Explanation.Normal>
				<DidiText.Explanation.Normal style={styles.marginTop30} >
					Por seguridad hemos finalizado tu sesión por inactividad
				</DidiText.Explanation.Normal>
				<DidiButton
						onPress={this.goToLogin}
						style={[styles.primaryButton, styles.marginTop80]} 
						title={"Aceptar"}
					/>
			</DidiScreen>
		)
	}

	private goToLogin = async() => {
		this.navigate("Login", {});
	}
}

const styles = StyleSheet.create({
	primaryButton: {
		backgroundColor: colors.primaryShadow
	},
	marginTop30: {
		marginTop: 30,
	},
	marginTop80: {
		marginTop: 80,
	}
});