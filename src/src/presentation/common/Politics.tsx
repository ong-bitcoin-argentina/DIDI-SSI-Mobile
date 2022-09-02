import React from "react";
import {  DidiScrollScreen } from "../common/DidiScreen";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import { DidiText } from "../util/DidiText";
import { View, CheckBox, StyleSheet } from 'react-native';
import colors from "../resources/colors";
import { DidiServiceButton } from "../util/DidiServiceButton";
import PoliticsTexts from "../resources/PoliticsTexts";
import Link from "../util/Link";
import { SignupEnterPhoneProps } from "../access/signup/SignupEnterPhone";
export type PoliticsScreenProps = {};
import commonStyles from "../resources/commonStyles";
const styles = commonStyles.consentScreen;

export type PoliticsScreenNavigation = {
	SignupEnterPhone: SignupEnterPhoneProps;
};


export class PoliticsScreen extends NavigationEnabledComponent<PoliticsScreenProps,{},PoliticsScreenNavigation> {
	static navigationOptions = {
		title: PoliticsTexts.title,
		  headerTitleStyle: {
			fontSize: 14
		  }
	};

	constructor(props: PoliticsScreenProps) {
		super(props);
		this.state = {
			firstCheck: false,
			secondCheck: false
		}
	}
	render() {		
		return(
			<DidiScrollScreen style={styles.scroll}>
			<View style={{width: "100%", height: "100%"}} >
				
				<DidiText.Explanation.Small style={{textAlign:'left', marginBottom: 10}} >
					{PoliticsTexts.description}
					<Link url="https://didi.org.ar/aidi/terminos-condiciones.html" style={{textAlign:'left', fontSize: 17, color:colors.darkBlue}}>
						{`Términos y Condiciones`}
					</Link>
						{` y `}
					<Link url="https://didi.org.ar/privacidad/" style={{textAlign:'left', fontSize: 17, color:colors.darkBlue}}>
						{`Política de Privacidad`}
					</Link>
					{PoliticsTexts.description2}
				</DidiText.Explanation.Small>
				{
					PoliticsTexts.data.map((politic, index) => {
						return(
							<View key={index} style={{backgroundColor: "white" , padding: 5, marginBottom:8}}>
							<DidiText.Title style={{textAlign:'left', fontWeight: 'bold', fontSize: 17, color:colors.darkBlue}}>{politic.title}</DidiText.Title>
							<DidiText.Explanation.Small style={{textAlign: 'left'}}>
								{politic.description}
							</DidiText.Explanation.Small>
						</View>
						)
					})
				}

				<View style={{marginVertical:12}}>
					<View style={{flexDirection: 'row'}} >
						<CheckBox
						value={this.state.firstCheck}
						onValueChange={this.onCheck.bind(this, 'firstCheck', this.state.firstCheck)}
						/>
						<DidiText.Small style={{textAlign: 'left'}}>He leído y acepto los términos y condiciones.</DidiText.Small>
					</View>
					<View style={{flexDirection: 'row', marginVertical: 6}} >
						<CheckBox
						value={this.state.secondCheck}
						onValueChange={this.onCheck.bind(this, 'secondCheck', this.state.secondCheck)}
						/>
						<DidiText.Small style={{textAlign: 'left', marginBottom:5}}>He leído la politica de privacidad y otorgo mi consentimiento para el tratamiento de mis datos para las finalidades informadas.</DidiText.Small>

					</View>
				</View>
				<DidiServiceButton
					isPending={false}
					disabled={(!this.state.firstCheck || !this.state.secondCheck)}					
					onPress={() => this.navigate("SignupEnterPhone", {})}
					title={"Siguiente"}
				/>
				</View>
			</DidiScrollScreen>
		)
	}
	private onCheck = (obj: string, value: boolean) => {
		this.setState({[obj]: !value});
	}
	
}
