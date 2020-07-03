import React, { Fragment } from "react";
import { StatusBar, StyleSheet, FlatList, View, Modal, Alert } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Prestador from './Prestador';
import { BeneficiarioProps } from './BeneficiarioScreen';
import { Validations } from '../../../model/Validations';


export type PrestadoresProps = {};

interface PrestadoresScreenStateProps { };

type PrestadoresScreenState = {
	activePrestador: object;
	modalVisible: boolean;
	customEmail: string;
};

type PrestadoresScreenInternalProps = PrestadoresScreenStateProps;

export interface PrestadoresScreenNavigation {
	Beneficiario: BeneficiarioProps;
}

import { randomPrestadores } from './mockup';
const DATA = randomPrestadores(10);

class PrestadoresScreen extends NavigationEnabledComponent<PrestadoresScreenInternalProps, PrestadoresScreenState, PrestadoresScreenNavigation> {
	
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.detailBarTitle);
	
	constructor(props: PrestadoresScreenInternalProps) {
		super(props);
		this.state = {
			activePrestador: {},
			modalVisible: false,
			customEmail: ''
		};
	}
	
	onSelect = (prestador: object) => {
		const same = (prestador.id === this.state.activePrestador.id);
		this.setState({
			activePrestador: same ? {} : prestador, 
		});
	}

	handleConfirmCustomEmail = () => {
		const { customEmail } = this.state;
		if (Validations.isEmail(customEmail)) {
			const activePrestador = { email: customEmail };
			this.setState({ 
				activePrestador,
				modalVisible: false
			});
			this.navigate("Beneficiario", { activePrestador });
		} else {
			Alert.alert('Por favor, escriba un email válido');
		}
	}

	render() {
		const { bottomButton, header, view } = commonStyles.benefit;
		const { modal } = commonStyles;
		const { activePrestador, modalVisible } = this.state;
		const activeId = activePrestador.id;

		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<View style={view}>
					<DidiText.Explanation.Small style={header}>
						{strings.semillas.steps.first.title}
					</DidiText.Explanation.Small>


					<FlatList
						numColumns={2}
						data={DATA}
						renderItem={({ item }) => <Prestador item={item} active={(item.id === activeId)} onPress={() => this.onSelect(item)} />}
						keyExtractor={item => item.id}
						ListFooterComponent={
							<Fragment>
								<DidiText.Explanation.Small>
									{strings.semillas.steps.first.email}
								</DidiText.Explanation.Small>
								<DidiServiceButton 
									onPress={() => this.setState({ modalVisible:true })}
									title="Escribir Mail"
									style={{ height:30 }}
									isPending={false}
								/>
							</Fragment>
						}
					/>
					
					{
						(activeId == 0 || activeId) &&
						<DidiServiceButton
							onPress={() => this.navigate("Beneficiario", { activePrestador })}
							title="SIGUIENTE"
							style={bottomButton}
							isPending={false}
						/>
					}

				</View>

				<Modal animationType="fade" transparent={true} visible={modalVisible} >
					<View style={modal.centeredView}>
						<View style={[modal.view, { height: '50%' }]}>
							
							<DidiTextInput.Email
								onChangeText={customEmail => this.setState({ customEmail })}								
							/>

							<View style={modal.footer}>
								<DidiServiceButton
									onPress={() => { this.setState({modalVisible:!modalVisible}) }}
									title="Cancelar"
									style={modal.smallButton}
									isPending={false}
								/>

								<DidiServiceButton
									onPress={() => { this.handleConfirmCustomEmail() }}
									title="Siguiente"
									style={modal.smallButton}
									isPending={false}
								/>
							</View>

						</View>
					</View>
				</Modal>

			</Fragment>
		);
	}

}

export default PrestadoresScreen;

const styles = StyleSheet.create({
	
});
