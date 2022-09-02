import React from "react";
import {  DidiScrollScreen } from "../common/DidiScreen";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import { DidiText } from "../util/DidiText";
import { View, CheckBox, Image } from 'react-native';
import { DidiServiceButton } from "../util/DidiServiceButton";
import ValidateIdentityText from "../resources/ValidateIdentityText";
import { SignupEnterPhoneProps } from "../access/signup/SignupEnterPhone";
import commonStyles from "../resources/commonStyles";
const styles = commonStyles.consentScreen;
export type ValidateIdentityScreenProps = {};
export type ValidateIdentityScreenNavigation = {
	SignupEnterPhone: SignupEnterPhoneProps;
	DashboardHome:{};
	ValidateID:{}
};
import NavigationHeaderStyle from "../common/NavigationHeaderStyle";
import strings from "../resources/strings";
export class ValidateIdentityScreen extends NavigationEnabledComponent<ValidateIdentityScreenProps,{},ValidateIdentityScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
	ValidateIdentityScreenNavigation,
	"DashboardHome"
>(strings.tabNames.identity, "DashboardHome", {});


	constructor(props: ValidateIdentityScreenProps) {
		super(props);
		this.state = {
			firstCheck: false,
		}
	}
	render() {		
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
					onPress={() => this.navigate("ValidateID", {})}
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
