import React from "react";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import {  DidiScrollScreen } from "../common/DidiScreen";
import NavigationHeaderStyle from "../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import questions from "../resources/commonQuestionsCatalog";
import { DidiText } from "../util/DidiText";
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";


export class CommonQuestionsScreen extends NavigationEnabledComponent<null,{},null> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Ayuda");

	render() {		
		const keys = Object.keys(questions);
		return(
			<DidiScrollScreen style={styles.scroll}>
			<View>
				<DidiText.Explanation.Emphasis style={{textAlign:'left'}}>Preguntas más frecuentes</DidiText.Explanation.Emphasis>
				<DidiText.Explanation.Normal style={{textAlign:'left'}} >Aquí respondemos algunas de las preguntas más frecuented en el uso de ai.di.</DidiText.Explanation.Normal>
				{ keys.map((key, index) => {				
						return (
							<Collapse key={index}>
							<CollapseHeader style={[styles.titlesCard, styles.border]}>							
								<Text style={[styles.titles,{ width:'90%' }]}>{key}</Text>							
								<Icon name="down" size={20}  />
							</CollapseHeader>
							<CollapseBody key={index} >
								{ questions[key].map((question, index) => {
									return(
										<Collapse style={{ paddingHorizontal: 10}}>
											<CollapseHeader style={[styles.titlesCard]}>
												<Text style={[styles.titles,{ width:'90%' }]}>{question.title}</Text>		
												<Icon name="down" size={20}  />
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
					<Collapse onToggle={this.goToSendEmail}>
						<CollapseHeader style={[styles.titlesCard, styles.border]}>
							<View style={{flexDirection:'row', width:'90%'}}>
								<Icon name="mail" size={20}  />							
								<Text style={[styles.titles,{ width:'90%', paddingLeft: 5 }]}>Contáctanos</Text>
							</View>
							<Icon name="right" size={20}  />	
						</CollapseHeader>
					</Collapse>
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
		fontSize: 20,
	},
	text: {
		fontSize: 18,
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

