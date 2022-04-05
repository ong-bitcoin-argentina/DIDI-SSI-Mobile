import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DidiScrollScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import strings from "../../resources/strings";
import { DidiText } from '../../util/DidiText';
import colors from '../../resources/colors';
import { didiConnect } from '../../../store/store';
import { ActiveDid } from '../../../store/reducers/didReducer';
import { readFile } from 'react-native-fs';
import { addDocumentImage } from '../../../services/vuSecurity/addDocumentImage';
import { IReturnGetInformation } from '../../../model/VuGetInformation';
import { DataAlert } from '../../common/DataAlert';
import { finishOperation } from '../../../services/vuSecurity/finishOperation';


interface IDocumentData {
    birthDate:        string;
    dni:              string;
    documentSpecimen: string;
    firstNames:       string;
    gender:           string;
    issuanceDate:     string;
    lastNames:        string;
    tramitId:         string;
}


export interface IVuIdentitySubmitScreenProps {
	buttonAction: () => void,
	documentData: IDocumentData,
	documentDataVu: IReturnGetInformation,
	front: { uri: string },
	back: { uri: string },
	selfie: { uri: string },
}
interface VuSubmitStateProps {
	operationId: string,
	userName: string,
	did: ActiveDid,
	vuResponseFront: string,
	vuResponseBack: string,
	vuResponseSelfie: string,
	name: string,
	lastname: string
}
interface VuSubmitDispatchProps {
	vuSecurityDataSelfie: (operationId: string, userName: string, vuResponseSelfie: string) => void;
	vuSecurityDataCreateVerification:(operationId: number, userName: string) => void;
}
interface VuIdentitySubmitState {
	possibleError: string,
	checkFlag: string
}
type VuIdentitySubmitProps = IVuIdentitySubmitScreenProps&VuSubmitStateProps&VuSubmitDispatchProps;
class VuIdentitySubmitScreen extends NavigationEnabledComponent<VuIdentitySubmitProps, VuIdentitySubmitState, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	constructor(props: VuIdentitySubmitProps) {
		super(props);
		this.state = {
			possibleError: "success",
			checkFlag: "" 
		};
	}

	async componentDidMount(){
		if (this.props.selfie.uri) {
			const resultBase64 = await readFile(this.props.selfie.uri, "base64");
			const result = await addDocumentImage(this.props.userName,this.props.operationId,resultBase64,this.props.did,'selfie');
			this.props.vuSecurityDataSelfie(this.props.operationId,this.props.userName,result.status);
			this.setState({ possibleError: result.status });
		}
		if (this.props.vuResponseBack == 'success' && this.props.vuResponseFront == 'success' && this.props.vuResponseSelfie == 'success') {
			const resultFinish = await finishOperation(this.props.userName, this.props.operationId, this.props.did);
			this.setState({ checkFlag: resultFinish.status });
		}
	}

	onAgree = ()=>{
		if(this.state.checkFlag){
			DataAlert.alert(strings.vuIdentity.success.congrats,strings.vuIdentity.success.reminder);
			this.navigate("DashboardHome", {});
		} else  {
			DataAlert.alert(strings.vuIdentity.failure.retryButton,strings.vuIdentity.failure.congrats);		
		}
	}

	goToSelfieScreen = ()=>{
		this.navigate("VuIdentitySelfie", {});
	}

	onReset= async () =>{
		this.navigate("DashboardIdentity", {});
	}


	mapGetInfomationResponse = (documentDataVu : IReturnGetInformation): IDocumentData =>{
		try {
			return {
				birthDate: documentDataVu.data.barcode.data.birthDate, 
				dni: documentDataVu.data.barcode.data.number, 
				documentSpecimen: documentDataVu.data.barcode.data.copy, 
				firstNames: documentDataVu.data.ocr.names, 
				gender: documentDataVu.data.barcode.data.gender, 
				issuanceDate: documentDataVu.data.barcode.data.issueDate, 
				lastNames: documentDataVu.data.ocr.lastNames, 
				tramitId: documentDataVu.data.barcode.data.order
			}	
		} catch (error) {
			return this.props.documentData
		}
	}

	render() {
		const documentDataKeys = ["dni", "gender", "firstNames", "lastNames", "birthDate", "tramitId"] as const;
		const documentData = this.mapGetInfomationResponse(this.props.documentDataVu);
		return (
			<DidiScrollScreen style={{paddingVertical:2}}>
				<View>
				<DidiText.ValidateIdentity.Title style={styles.title}>INFORMACION</DidiText.ValidateIdentity.Title>
				<DidiText.ValidateIdentity.Normal style={styles.descriptionHeader}> 
				Estos son los datos que van a conformar su credencial de DNI.</DidiText.ValidateIdentity.Normal>
					{documentDataKeys.map((key, index) => (
						<>
						<View key={index}>
						<Text style={styles.itemTxt} >{strings.vuIdentity.submit.items[key]}</Text>
						<Text style={styles.resultItemTxt}>{documentData[key]}</Text>
						</View>
						
						</>
					))}
				</View> 

			<View style={styles.contentBtn}>
			{this.state.possibleError === "success"?
				<>
					<TouchableOpacity  style={styles.button} onPress={()=>this.onAgree()}>
							<DidiText.Button disabled={false} style={{alignSelf: "center"}}>
								Verificar
							</DidiText.Button>
					</TouchableOpacity>

					<TouchableOpacity  style={styles.button} onPress={()=>this.onReset()}>
							<DidiText.Button disabled={false} style={{alignSelf: "center"}}>
								Reiniciar
							</DidiText.Button>
					</TouchableOpacity>
				</>:
			<TouchableOpacity  style={styles.errorBtn} onPress={()=>this.goToSelfieScreen()}>
					<DidiText.Button disabled={false} style={{alignSelf: "center"}}>
						Verifica tu Selfie 
					</DidiText.Button>
			</TouchableOpacity>}
			</View>
			</DidiScrollScreen>
		);
	}
}


const connected = didiConnect(
	VuIdentitySubmitScreen,
	(state): VuSubmitStateProps => ({
		operationId: state.vuSecurityData.operationId,
		userName: state.vuSecurityData.userName,
		did: state.did.activeDid,
		vuResponseFront: state.vuSecurityData.vuResponseFront,
		vuResponseBack: state.vuSecurityData.vuResponseBack,
		vuResponseSelfie: state.vuSecurityData.vuResponseSelfie,
		name: state.persistedPersonalData.name,
		lastname: state.persistedPersonalData.lastname
	}),
	(dispatch): VuSubmitDispatchProps => ({
		vuSecurityDataSelfie:(operationId: string, userName: string, vuResponseSelfie: string)=>{
			dispatch({ type: "VU_SECURITY_RESPONSE_ADD_SELFIE", state: { operationId, userName, vuResponseSelfie } })
		},
		vuSecurityDataCreateVerification : (operationId: number, userName: string) =>
		dispatch({ type: "VU_SECURITY_DATA_SET", state: {operationId:`${operationId}`, userName } }),	
	})
);


export { connected as VuIdentitySubmitScreen };


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
	errorBtn: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 56,
		width: '100%',
		marginHorizontal: 5,
		marginVertical: 5,
		borderRadius: 5,
		backgroundColor:colors.dangerous,
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