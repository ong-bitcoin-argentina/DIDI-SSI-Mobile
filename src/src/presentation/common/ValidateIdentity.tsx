import React from "react";
import {  DidiScrollScreen } from "../common/DidiScreen";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import questions from "../resources/commonQuestionsCatalog";
import { DidiText } from "../util/DidiText";
import { View, CheckBox, StyleSheet, Image } from 'react-native';
import colors from "../resources/colors";
import { DidiServiceButton } from "../util/DidiServiceButton";
import ValidateIdentityText from "../resources/ValidateIdentityText";
import Link from "../util/Link";
import { SignupEnterPhoneProps } from "../access/signup/SignupEnterPhone";
export type ValidateIdentityScreenProps = {};
export type ValidateIdentityScreenNavigation = {
	SignupEnterPhone: SignupEnterPhoneProps;
};

export class ValidateIdentityScreen extends NavigationEnabledComponent<ValidateIdentityScreenProps,{},ValidateIdentityScreenNavigation> {
	static navigationOptions = {
		title: "Validar Identidad",
		  
	};

	constructor(props: ValidateIdentityScreenProps) {
		super(props);
		this.state = {
			firstCheck: false,
		}
	}
	render() {		
		const keys = Object.keys(questions);
		return(
			<DidiScrollScreen style={styles.scroll}>
			<View style={{width: "100%", height: "100%", justifyContent:'space-between'}} >
				
				<View>
				<DidiText.Explanation.Emphasis style={{textAlign:'center', marginBottom: 10}}>
				{ValidateIdentityText.title}
			</DidiText.Explanation.Emphasis>

			<DidiText.Explanation.Emphasis style={{textAlign:'center', backgroundColor:"#DDD"}}>
				{ValidateIdentityText.description}
			</DidiText.Explanation.Emphasis>

				<DidiText.Explanation.Small style={{textAlign:'left', marginTop: 10}}>
					{ValidateIdentityText.paragraph}
				</DidiText.Explanation.Small>

				<DidiText.Explanation.Small style={{textAlign:'left', marginTop: 10}}>
					{ValidateIdentityText.paragraph2}
				</DidiText.Explanation.Small>
		

				<View style={{marginVertical:12}}>
					<View style={{flexDirection: 'row'}} >
						<CheckBox
						value={this.state.firstCheck}
						onValueChange={this.onCheck.bind(this, 'firstCheck', this.state.firstCheck)}
						/>
						<DidiText.Small style={{textAlign: 'left'}}>{ValidateIdentityText.agreement}</DidiText.Small>
					</View>
				</View>
				</View>
				<View>
				<Image style={{width:180, height: 200,alignSelf:'center'}} source={require("../resources/images/validateIdentityHow.png")} />
				<DidiServiceButton
					isPending={false}
					disabled={(!this.state.firstCheck)}					
					onPress={() => {}}
					title={"Siguiente"}
				/>
				</View>
				
				</View>
										
			</DidiScrollScreen>
		)
	}
	private onCheck = (obj: string, value: boolean) => {
		this.setState({[obj]: !value});
	}
	
}

const styles = StyleSheet.create({
	scroll: {
		width: "100%",
		paddingHorizontal: '2%'		
	},
	titles: {
		fontSize: 15,
        fontFamily: "Roboto-Regular",
        fontWeight: "bold",
        color: colors.darkBlue, 
	},
    titlesInner: {
        fontFamily: "Roboto-Regular",
		fontSize: 14,
        color: colors.text, 
	},
	text: {
		fontSize: 12,
        fontFamily: "Roboto-Regular",
        fontWeight: "100",
        color: colors.text, 
	},
	titlesCard:{	
		paddingVertical:10,        
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	border: {
		borderBottomWidth:1,
		borderBottomColor: '#4A4A4A',
	}
	
});
