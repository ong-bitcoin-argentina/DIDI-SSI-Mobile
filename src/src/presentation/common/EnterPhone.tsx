import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import commonStyles from "../resources/commonStyles";
import { DidiServiceButton } from "../util/DidiServiceButton";
import { DidiText } from "../util/DidiText";
import DidiTextInput from "../util/DidiTextInput";
import CountryPicker from "react-native-country-picker-modal";
import { Validations } from "../../model/Validations";
import strings from "../resources/strings";
import { DidiScreen } from "./DidiScreen";

const {Icon} = DidiText;


export interface EnterPhoneProps {
	explanation: string;
	contentImageSource: ImageSourcePropType;
	isPasswordRequired: boolean;
	onPressContinueButton(inputPhoneNumber: string, password: string | null): void;
	isContinuePending: boolean;
}

export interface EnterPhoneState {	
	inputCountryCode?: string;
	inputCountryCallingCode?: string;
	inputPhoneNumber?: string;
	inputPassword?: string;
	disabledButton?: boolean;
}

export class EnterPhoneScreen extends React.PureComponent<EnterPhoneProps, EnterPhoneState> {
	
	constructor(props: EnterPhoneProps) {
		super(props);	
		this.state = {
			inputCountryCode: "AR",
			inputCountryCallingCode: "54",
			disabledButton: false,
		};
	}
	render() {		
		return (
			<DidiScreen >
				<DidiText.Explanation.Emphasis>{this.props.explanation}</DidiText.Explanation.Emphasis>
				<DidiText.InputDescription style={{textAlign:"left"}}>{strings.accessCommon.enterPhone.countryPicker}</DidiText.InputDescription>
				<View style={styles.countryContainer}>
					<View style={{alignItems: 'center', width:"90%", flexDirection:"row",marginBottom:5}}>

						<CountryPicker
							onSelect={({ cca2, callingCode }) => this.setState({ inputCountryCode: cca2, inputCountryCallingCode: callingCode })}
							withEmoji={true}
							withCallingCode={true}
							withFlagButton={true}
							withCountryNameButton={true}
							withCallingCodeButton={true}
							withModal={true}
							withFilter={true}
							withCloseButton={true}
							translation="spa"
							countryCode={this.state.inputCountryCode}
							countryCodes={["AR", "BZ", "BO", "BR", "CL", "CO", "CR", "EC", "SV", "FK", "GF", "GT", "GY", "HN", "NI", "PA", "PY", "PE", "SR", "UY", "VE", "MX"]} />
					    
						<Icon fontSize={22} color="black" style={{justifyContent:"flex-end"}}>
							arrow_drop_down
					    	</Icon>

					</View>					
					</View>
					
					<View>
					<DidiTextInput.PhoneNumber 
						onChangeText={inputPhoneNumber => this.setState({ inputPhoneNumber: inputPhoneNumber })} 
					/>
					</View>
					

				{this.props.isPasswordRequired && (
					<DidiTextInput.Password
						descriptionType="BASIC"
						onChangeText={text => this.setState({ inputPassword: text })}
					/>
				)}

				<Image style={commonStyles.image.image} source={this.props.contentImageSource} />

				<DidiServiceButton
					isPending={this.props.isContinuePending || false}
					disabled={!this.canPressContinueButton()}					
					onPress={() => this.onPressContinueButton()}
					title={strings.accessCommon.validateButtonText}
				/>
			</DidiScreen>
		);
	}

	private canPressContinueButton(): boolean {
		if (
			Validations.isPhoneNumber(this.state.inputPhoneNumber, this.state.inputCountryCode) &&
			(!this.props.isPasswordRequired || Validations.isPassword(this.state.inputPassword))
		){
			if(this.state.disabledButton) return false;
			return true;
		} else this.setState({disabledButton: false})
	}

	private onPressContinueButton() {
		const countryPrefix = this.state.inputCountryCallingCode;
		const phoneNumber = `+${countryPrefix}${this.state.inputPhoneNumber}`;		
		this.props.onPressContinueButton(phoneNumber, this.state.inputPassword || null);
		this.setState({disabledButton:!this.state.disabledButton})
	}
}

const styles = StyleSheet.create({
	countryContainer: {
		alignSelf: "stretch",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start", 
		paddingHorizontal: 3,
		borderBottomWidth: 1,
		borderBottomColor: "#9b9b9b"

	},	
});
