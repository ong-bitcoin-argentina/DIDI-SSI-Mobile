import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View, Picker, Modal, Alert, TouchableHighlight } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Beneficiary from './Beneficiario';
import { PrestadorModel } from './Prestador';
import { SemillasIdentityModel } from '../../../model/SemillasIdentity';

export type BeneficiarioProps = { };

interface BeneficiaryScreenStateProps { 
	activePrestador: PrestadorModel
};

type BeneficiaryScreenState = {
	selected:SemillasIdentityModel;
	selectedName:string;
	modalVisible:boolean;
};

type BeneficiaryScreenInternalProps = BeneficiaryScreenStateProps;

export interface BeneficiaryScreenNavigation {
    
}

import { randomBeneficiarios } from './mockup';
const DATA:BeneficiaryModel[] = randomBeneficiarios(20);

class BeneficiaryScreen extends NavigationEnabledComponent<BeneficiaryScreenInternalProps, BeneficiaryScreenState, BeneficiaryScreenNavigation> {
	
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.detailBarTitle);
	
	constructor(props: BeneficiaryScreenInternalProps) {
		super(props);
		this.state = {
			selected: DATA[0],
			selectedName: DATA[0].name,
			modalVisible: false
		};
	}

	handleChangePicker = (selectedName, index) => {
		this.setState({
			selectedName,
			selected: DATA[index]
		})
	}

	render() {
		const { bottomButton, header, view } = commonStyles.benefit;
		const { selected, selectedName, modalVisible } = this.state;
		const { activePrestador } = this.props;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<View style={view}>
					<DidiText.Explanation.Small style={header}>
						{strings.semillas.steps.second.title}
					</DidiText.Explanation.Small>

					<View style={styles.pickerContainer}>
						<DidiText.Explanation.Small>
							{strings.semillas.steps.second.detail}
						</DidiText.Explanation.Small>

						<Picker
							selectedValue={selectedName}
							style={{ height: 50 }}
							onValueChange={(value,index) => this.handleChangePicker(value,index)}
							mode="dialog"
						>
							{
								DATA.map(({id,name}) => <Picker.Item label={name} value={id} key={id} />)
							}
						</Picker>
					</View>
						
					<DidiServiceButton
						onPress={() => { this.setState({modalVisible:true}) }}
						title="SIGUIENTE"
						style={bottomButton}
						isPending={false}
					/>

				</View>
				
				<Modal animationType="fade" transparent={true} visible={modalVisible} >
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<DidiText.Explanation.Small>
								{strings.semillas.steps.second.modalTitle}
							</DidiText.Explanation.Small>
							
							<Beneficiary item={selected} />

							<DidiText.Explanation.Small>
								Caracter
							</DidiText.Explanation.Small>

							<View style={styles.modalFooter}>
								<DidiServiceButton
									onPress={() => { this.setState({modalVisible:!modalVisible}) }}
									title="Cancelar"
									style={styles.smallButton}
									isPending={false}
								/>

								<DidiServiceButton
									onPress={() => { console.log('navegar a siguiente paso') }}
									title="Compartir"
									style={styles.smallButton}
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

export default BeneficiaryScreen;

const styles = StyleSheet.create({
	pickerContainer: {
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 6,
		marginTop: 30,
		marginBottom: 50
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 20,
		width: '90%',
		height: '70%',
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	modalFooter: {
		flex: 1,
		flexDirection: 'row',
		bottom: 10,
		position: 'absolute'
	},
	smallButton: {
		height: 40,
		paddingHorizontal: 20
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
});
