import React, { Fragment } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View, ActivityIndicator, Text } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import themes from "../../resources/themes";
import Divider from "../common/Divider";
import colors from "../../resources/colors";
import { getShareRequest, getShareRequestName, IReturnError } from '../../../services/issuer/getShareRequest';
import { DidiText } from '../../util/DidiText';
import DidiButton from '../../util/DidiButton';
import strings from '../../resources/strings';
import { IShareRequestData } from '../../../model/ShareRequest';


export interface IssuerScreenNavigation {
	miName: string;
}

export interface IssuerDetailProps {
	issuerName: string | null | undefined;
	idShareRequest: string[];
}
export interface IssuerDetilState {
	shareRequests: IShareRequestData[] | IReturnError;
	shareRequestId: string
	ShareRequestsName: string[] | null[]
}
interface IssuerDetilNavegation {
	ShareCredential: {}
}
export class IssuerDetailScreen extends NavigationEnabledComponent<
	IssuerDetailProps,
	IssuerDetilState,
	IssuerDetilNavegation> {
	static navigationOptions = NavigationHeaderStyle.withDynamicTitle('issuerName');
	constructor(props: IssuerDetailProps) {
		super(props);
		this.state = {
			shareRequests: [],
			shareRequestId: "",
			ShareRequestsName: [],
		};
	}

	async componentDidMount() {
		const ShareRequestsName = await getShareRequestName();
		const { idShareRequest } = this.props
		const shareRequests = await getShareRequest(idShareRequest);
		this.setState({
			shareRequestId: idShareRequest[0],
			shareRequests,
			ShareRequestsName,
		})
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
								<DidiText.Explanation.Emphasis style={{ marginVertical: 10 }}>{'Solicitar Credenciales'}</DidiText.Explanation.Emphasis>
								<DidiText.Explanation.Normal >{
									'Para poder emitir las credenciales de este emisor estos son los requisitos'}
								</DidiText.Explanation.Normal>
							</View>
						}
						style={styles.body}
						contentContainerStyle={styles.scrollContent}
						ItemSeparatorComponent={() => <Divider color={colors.transparent} />}
						data={this.state.shareRequests}
						keyExtractor={(_, index) => index.toString()}
						renderItem={item => this.renderItem(item.item)}
						ListEmptyComponent={
							<View style={{ height: "20%" }}>
								<ActivityIndicator size="large" color='#5E49E2' />
							</View>
						}
						ListFooterComponent={
							<DidiButton
								onPress={() => {
									this.navigate("ShareCredential", {
										shareResp: true,
										shareRequests: this.state.shareRequests,
										shareRequestId: this.state.shareRequestId
									})
								}}
								title={"Compartir Credenciales"}
								style={styles.button} />}
					/>
				</SafeAreaView>
			</Fragment>
		);
	}


	credentialtypes = (type: string) => {
		try {
			return this.state.ShareRequestsName[type] ?? type;
		} catch (error) {	
			return type
		}
	}

	private renderItem(data: IShareRequestData) {
		const description = Object.values(data.claims.verifiable);
		const types = Object.keys(data.claims.verifiable);
		const str = strings.dashboard.evolution;
		return (
			<Fragment>
				{types.map((type, key) => {
					return (
						<View key={key} style={styles.listIssuers}>
							<View style={styles.title}>
								<Text style={styles.image} >{description[key].required ? str.validationState.yes : str.validationState.no}</Text>
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
	button: {
		marginTop: '3%',
		paddingHorizontal: 30
	},
	descriptionTitle: {
		display: 'flex',
		flexDirection: "column",
		alignItems: "flex-start",
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
