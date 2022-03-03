import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DidiScrollScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import strings from "../../resources/strings";
import { DidiText } from '../../util/DidiText';
import colors from '../../resources/colors';


interface IVuIdentitySubmitScreenProps {
	documentData: any,
	buttonAction: () => void
}
export class VuIdentitySubmitScreen extends NavigationEnabledComponent<IVuIdentitySubmitScreenProps, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	onAgree = function(){
		console.log('Agree');
		// VUS-166 [aidi] End operation implementacion
		this.navigate("DashboardHome", {});
	}

	onReset = function(){
		console.log('Reset');
		// VUS-166 [aidi] End operation implementacion	
		this.navigate("VuIdentityID", {});
	}


	render() {
		const documentDataKeys = ["dni", "gender", "firstNames", "lastNames", "birthDate", "tramitId"] as const;
		const documentData = this.props.documentData;
		return (
			<DidiScrollScreen style={{paddingVertical:2}}>
				<View>
				<DidiText.ValidateIdentity.Title style={styles.title}>INFORMACION</DidiText.ValidateIdentity.Title>
				<DidiText.ValidateIdentity.Normal style={styles.descriptionHeader}> 
				Estos son los datos que van a conformar su credencial de DNI.</DidiText.ValidateIdentity.Normal>
					{documentDataKeys.map(key => (
						<>
						<View key={key}>
						<Text style={styles.itemTxt} >{strings.validateIdentity.submit.items[key]}</Text>
						<Text style={styles.resultItemTxt}>{documentData[key]}</Text>
						</View>
						
						</>
					))}
				</View>	
			<View style={styles.contentBtn}>
			<TouchableOpacity  style={styles.button} onPress={()=>this.onAgree()}>
					<DidiText.Button disabled={false} style={{alignSelf: "center"}}>
						Aceptar
					</DidiText.Button>
			</TouchableOpacity>
			<TouchableOpacity  style={styles.button} onPress={()=>this.onReset()}>
					<DidiText.Button disabled={false} style={{alignSelf: "center"}}>
						Reinicio
					</DidiText.Button>
			</TouchableOpacity>
			</View>
			</DidiScrollScreen>
		);
	}
}


const styles = StyleSheet.create({
	title: {
		fontSize: 20
	},
	descriptionHeader: {
		fontSize: 14,
		marginBottom: 10,
	},
	itemTxt: {
		marginLeft: '7%',
		fontWeight: "bold",
	},
	resultItemTxt: {
		marginLeft: '15%',
	},
	
	button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 56,
		width: 145,
		marginHorizontal: 5,
		marginVertical: 5,
		borderRadius: 5,
		backgroundColor:colors.primary,
		
	},
	small: {
		height: 40,
		paddingHorizontal: 16
	},
	text: {
		marginHorizontal: 10
	},
	contentBtn:{
		display:'flex',
		flexDirection:"row",
		justifyContent:"center"
	}
});