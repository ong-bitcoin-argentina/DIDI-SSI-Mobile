import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View , ActivityIndicator, Text } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import themes from "../../resources/themes";
import Divider from "../common/Divider";
import colors from "../../resources/colors";
import { getShareRequest, IReturnError } from '../../../services/issuer/getShareRequest';
import { IIssuerShareRequest } from '@proyecto-didi/app-sdk/dist/src/model/ShareRequests';
import { DidiText } from '../../util/DidiText';
import DidiButton from '../../util/DidiButton';
import strings from '../../resources/strings';

interface DataShareRequest {
    iat: number;
    callback: string;
    type: string;
    claims: Claims;
    aud: string;
    iss: string;
}
interface Claims {
    verifiable: Verifiable;
}
interface Verifiable {
    nationalId: NationalID;
	emailMain: {
		issuers: Issuer[];
        reason:   string;
        required: boolean;
	}
}
interface NationalID {
    reason: string;
    issuers: Issuer[];
    required: boolean;
}
interface Issuer {
    did: string;
    url: string;
}

export interface IssuerScreenNavigation {
    miName: string;
}

export interface IssuerDetailProps {
    issuerName: string | null | undefined;
	idShareRequest: string[];
}
export interface IssuerDetilState {
    shareRequest: IIssuerShareRequest[] | IReturnError ;
}
interface IssuerDetilNavegation {
	ShareCredential:{}
}
export class IssuerDetailScreen extends NavigationEnabledComponent<
	IssuerDetailProps, 
	IssuerDetilState,
	IssuerDetilNavegation> {
	static navigationOptions = NavigationHeaderStyle.withDynamicTitle('issuerName');
	constructor(props: IssuerDetailProps) {
		super(props);
		this.state = {
			shareRequest: []
		};
	}
	
	async componentDidMount(){
		const { idShareRequest } = this.props
		const resultado = await getShareRequest(idShareRequest); 
		this.setState({shareRequest: resultado})	
	}

	render() {
		
		return (
			<Fragment >
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
                <SafeAreaView style={commonStyles.view.area}>
					<FlatList
					maxToRenderPerBatch={5}
					updateCellsBatchingPeriod={1}
					ListHeaderComponent={
						<View style={styles.descriptionTitle} >
							<DidiText.Explanation.Emphasis style={{marginVertical:10}}>{'Solicitar Credenciales'}</DidiText.Explanation.Emphasis>
							<DidiText.Explanation.Normal >{
							'Para poder emitir las credenciales de este emisor estos son los requisitos'}
							</DidiText.Explanation.Normal>
					</View>
					}
					style={styles.body}
					contentContainerStyle={styles.scrollContent}
					ItemSeparatorComponent={() => <Divider color={colors.transparent} />}
					data={this.state.shareRequest}
					keyExtractor={(_, index) => index.toString()}
					renderItem={item => this.renderItem(item.item.data)}
					ListEmptyComponent={
						<View style={{height:"20%"}}>
							<ActivityIndicator size="large" color='#5E49E2'/>
						</View>
					}
					ListFooterComponent={
						<DidiButton
							onPress={()=>{this.navigate("ShareCredential", {
								shareResp:true
							})}}
							title={"Compartir Credenciales"}
							style={styles.button} />}
						/>
				</SafeAreaView>
			</Fragment>
		);
	}


	credentialtypes = (type: string)=>{
		switch (type) {
			case 'semillaSembFamiliar':
				return 'Credencial de Sembrando Familiar'
			case 'semillaSancorSalud':
				return 'Credencial de Sancor Salud'
			case 'semillaSembTitular':
				return 'Credencial de Sembrando Titular';
			case 'semillaIdFamiliar':
				return 'Credencial de Semilla Familiar';
			case 'semillaIdTitular':
				return 'Credencial de Semilla Titular';
			case 'semillaCrediticia':
				return 'Credencial de Semilla Crediticia';
			case 'nationalId':
				return 'Credencial de Identidad';
			case 'legalAddress':
				return 'Credencial de Domicilio Legal';	
			case 'emailMain':
				return 'Credencial de Email';
			case 'mobilePhone':
				return 'Credencial de Telefono'; 
			case 'livingPlace':
				return 'Credencial de residencia';
			case 'semillaEmprendimiento':
				return 'Credencial de Semilla Emprendimiento';	
			default:
				return "Credencial nueva"
		}
	}

	private renderItem(data:DataShareRequest) {
		const description = Object.values(data.claims.verifiable);
		const types = Object.keys(data.claims.verifiable);
		const str = strings.dashboard.evolution;
		return (
				<Fragment>
					{types.map((type, key)=>{
						return(
							<View key={key} style={styles.listIssuers}>
								<View style={styles.title}>
									<Text style={styles.image} >{description[key].required?str.validationState.yes:str.validationState.no}</Text>
									<DidiText.Explanation.Emphasis>{this.credentialtypes(type)}</DidiText.Explanation.Emphasis>
								</View>
								<View style={styles.description}>
									<DidiText.Explanation.Normal>{'¿Por qué piden esta información?'}</DidiText.Explanation.Normal>
								</View>
								<View style={styles.description}>
									<DidiText.Explanation.Normal>{description[key].reason}</DidiText.Explanation.Normal>
								</View>
							</View>
						)
					})}
				</Fragment>
		);
	}
}
const styles = StyleSheet.create({
	button:{
		marginTop: '3%',
		paddingHorizontal: 30
    },
	descriptionTitle:{
		display: 'flex',
		flexDirection:"column",
		alignItems:"flex-start",
        fontSize: 14,
		marginBottom: '5%',
	},
	body: {
		width: "100%"
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingVertical: 8
	},
	headerData: {
		textAlign: "left",
		justifyContent: "center",
		marginBottom: 10
	},
    listIssuers: {
        marginBottom: 7,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#24CDD2",
    },
    title: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 8
    },
    image: {
        width: 20,
        height: 20,
        marginLeft: 0
    },
    description: {
        flexDirection: "row",
        alignItems: "flex-start",
        fontSize: 14,
        paddingLeft: 15,
        paddingBottom: 15
    },
});
