import React from "react";
import {  DidiScrollScreen } from "./DidiScreen";
import NavigationHeaderStyle from "./NavigationHeaderStyle";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import text from "../resources/ShareCredentialsText";
import { DidiText } from "../util/DidiText";
import { View, CheckBox, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../resources/colors";
import { DidiServiceButton } from "../util/DidiServiceButton";
import strings from "../resources/strings";
export type ShareCredentialsScreenProps = {};
export type ShareCredentialsScreenNavigation = {
	DashboardHome: {},
	ShareCredential: {}
};

export class ShareCredentialsScreen extends NavigationEnabledComponent<ShareCredentialsScreenProps,{},ShareCredentialsScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
	ShareCredentialsScreenNavigation,
	"DashboardHome"
	>(strings.share.title, "DashboardHome", {});

	constructor(props: ShareCredentialsScreenProps) {
		super(props);
		this.state = {
			firstCheck: false,
			tooltip: false
		}
	}
	render() {		
	
		return(
			<DidiScrollScreen style={styles.scroll}>
			<View style={{width: "100%", height: "100%", justifyContent:'space-between'}}> 
				<View >
					<DidiText.Explanation.Emphasis style={{textAlign:'center', marginBottom: 10}} >
							{text.title}
						</DidiText.Explanation.Emphasis> 
						<DidiText.Explanation.Normal style={{textAlign:'left', marginBottom: 10}} >
							{text.description}
						</DidiText.Explanation.Normal>
					<DidiText.Explanation.Normal style={{textAlign:'left', marginBottom: 10}} >
						{text.paragraph1}
					</DidiText.Explanation.Normal>
						<Tooltip
							isVisible={this.state.tooltip}
							content={<Text>{text.tooltip}</Text>}
							placement="top"
							onClose={() => this.setState({ tooltip: false })}
						>
						<DidiText.Explanation.Normal style={{textAlign:'left', marginBottom: 10, position:'relative'}} >
						{text.paragraph2}
						<TouchableHighlight onPress={() => this.setState({ tooltip: true })}>
							<Icon  name="questioncircleo" color={colors.primary} size={22}  />
						</TouchableHighlight>
						</DidiText.Explanation.Normal>
						</Tooltip>
					
					<DidiText.Explanation.Normal style={{textAlign:'left', marginBottom: 10}} >
						{text.paragraph3}
					</DidiText.Explanation.Normal>

					<View style={{marginVertical:12}}>
						<View style={{flexDirection: 'row'}} >
							<CheckBox
							value={this.state.firstCheck}
							onValueChange={this.onCheck.bind(this, 'firstCheck', this.state.firstCheck)}
							/>
							<DidiText.Small style={{textAlign: 'left'}}>{text.agreement}</DidiText.Small>
						</View>
					</View>
				</View>
				<DidiServiceButton
					isPending={false} 
					disabled={(!this.state.firstCheck )}			
					onPress={() => this.navigate("ShareCredential", {})}
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

const styles = StyleSheet.create({
	scroll: {
		width: "100%",
		paddingHorizontal: '2%'		
	}
	
});
