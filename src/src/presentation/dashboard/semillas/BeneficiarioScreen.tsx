import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View, Picker, Modal } from "react-native";

import { didiConnect } from "../../../store/store";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Beneficiario from './Beneficiario';
import { PrestadorModel } from './Prestador';
// import { SemillasIdentityModel } from '../../../model/SemillasIdentity';
import { getFullName, getDniBeneficiario } from '../../../util/semillasHelpers';
import { SemillasIdentityModel } from "../../../model/SemillasIdentity";

export type BeneficiarioProps = { 
	activePrestador: PrestadorModel;
};

interface BeneficiarioScreenStateProps { 
	semillasCredential?: SemillasIdentityModel;
	semillasBeneficiarios: SemillasIdentityModel[];
};

type BeneficiarioScreenState = {
	isOwner?: boolean;
	selected:SemillasIdentityModel;
	selectedName?:string;
	modalVisible:boolean;
};

type BeneficiarioScreenInternalProps = BeneficiarioScreenStateProps & BeneficiarioProps;

export interface BeneficiarioScreenNavigation {
    
}

class BeneficiarioScreen extends NavigationEnabledComponent<BeneficiarioScreenInternalProps, BeneficiarioScreenState, BeneficiarioScreenNavigation> {
	
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.detailBarTitle);
	
	constructor(props: BeneficiarioScreenInternalProps) {
		super(props);
		const selected = this.props.semillasBeneficiarios[0];
		this.state = {
			selected,
			selectedName: getFullName(selected),
			modalVisible: false
		};
	}

	handleChangePicker = (selectedName:string, index:number) => {
		const selected = this.props.semillasBeneficiarios[index];
		this.setState({
			selectedName,
			selected
		})
	}

	render() {
		const { bottomButton, header, view } = commonStyles.benefit;
		const { modal } = commonStyles;
		const { selected, selectedName, modalVisible } = this.state;
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
							itemStyle={{textAlign:'center'}}
							onValueChange={(value,index) => this.handleChangePicker(value,index)}
							mode="dialog"
						>
							{
								this.props.semillasBeneficiarios.map((credential) => (
									<Picker.Item 
										label={getFullName(credential)} 
										value={getDniBeneficiario(credential)} 
										key={getDniBeneficiario(credential)}
									/>
								))
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
					<View style={modal.centeredView}>
						<View style={modal.view}>
							<DidiText.Explanation.Small>
								{strings.semillas.steps.second.modalTitle}
							</DidiText.Explanation.Small>
							
							<Beneficiario item={selected} />

							<View style={modal.footer}>
								<DidiServiceButton
									onPress={() => { this.setState({modalVisible:!modalVisible}) }}
									title="Cancelar"
									style={modal.smallButton}
									isPending={false}
								/>

								<DidiServiceButton
									onPress={() => { console.log('navegar a siguiente paso') }}
									title="Compartir"
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

export default didiConnect(
	BeneficiarioScreen,
	(state): BeneficiarioScreenStateProps => ({
		semillasCredential: state.semillasCredential,
		semillasBeneficiarios: state.semillasBeneficiarios,
	})
);

const styles = StyleSheet.create({
	pickerContainer: {
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 6,
		marginTop: 30,
		marginBottom: 50
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
});
