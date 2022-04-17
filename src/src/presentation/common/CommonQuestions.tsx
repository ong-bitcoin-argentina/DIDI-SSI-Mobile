import React from "react";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import {  DidiScrollScreen } from "../common/DidiScreen";
import NavigationHeaderStyle from "../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import questions from "../resources/commonQuestionsCatalog";
import { DidiText } from "../util/DidiText";
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../resources/colors";

export type CommonQuestionsScreenProps = {};
export type CommonQuestionsScreenNavigation = {};

export class CommonQuestionsScreen extends NavigationEnabledComponent<CommonQuestionsScreenProps,{},CommonQuestionsScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ayuda");

	render() {		
		const keys = Object.keys(questions);
		return(
			<DidiScrollScreen style={styles.scroll}>
			<View style={{width: "100%", height: "100%"}} >
				<DidiText.Explanation.Emphasis style={{textAlign:'left'}}>Preguntas más frecuentes</DidiText.Explanation.Emphasis>
				<DidiText.Explanation.Normal style={{textAlign:'left', marginTop: 10, marginBottom: 10}} >Aquí respondemos algunas de las preguntas más frecuented en el uso de ai.di.</DidiText.Explanation.Normal>
				{ keys.map((key, index) => {				
						return (
							<Collapse key={index}>
							<CollapseHeader style={[styles.titlesCard, styles.border]}>							
								<Text style={[styles.titles,{ width:'90%' }]}>{key}</Text>							
								<Icon name="down" color={colors.text} size={15}  />
							</CollapseHeader>
							<CollapseBody key={index} >
								{ questions[key].map((question, index) => {
									return(
										<Collapse style={{ paddingHorizontal: 0 }}>
											<CollapseHeader style={[styles.titlesCard]}>
												<Text style={[styles.titlesInner,{ width:'90%' }]}>{question.title}</Text>		
												<Icon name="down" color={colors.text} size={15}  />
											</CollapseHeader>
											<CollapseBody >
												<Text style={styles.text}>{ question.body }</Text>
											</CollapseBody>
										</Collapse>
									)})}
							</CollapseBody> 
						</Collapse>
					)})					
				}
					{/* <Collapse onToggle={this.goToSendEmail} style={{ position: 'absolute', bottom: 0 }}>
						<CollapseHeader style={[styles.titlesCard, styles.border]}>
							<View style={{flexDirection:'row', width:'90%'}}>
								<Icon name="mail" size={20}  />							
								<Text style={[styles.titles,{ width:'90%', paddingLeft: 5, color: colors.text }]}>Contáctanos</Text>
							</View>
							<Icon name="right" size={15}  />	
						</CollapseHeader>
					</Collapse> */}
				</View>			
			</DidiScrollScreen>
		)
	}

	private goToSendEmail = async () => {		
		this.navigate("OpenEmail", {});
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

