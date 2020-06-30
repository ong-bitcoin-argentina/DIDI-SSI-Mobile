import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View, Picker } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";

export type BeneficiaryProps = { };

interface BeneficiaryScreenStateProps { 
	activePrestador: object
};

type BeneficiaryScreenState = {
	selectedValue:string;
};

type BeneficiaryScreenInternalProps = BeneficiaryScreenStateProps;

export interface BeneficiaryScreenNavigation {
    
}

import { randomBeneficiarios } from './mockup';
const DATA:object = randomBeneficiarios(20);

class BeneficiaryScreen extends NavigationEnabledComponent<BeneficiaryScreenInternalProps, BeneficiaryScreenState, BeneficiaryScreenNavigation> {
	
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.detailBarTitle);
	
	constructor(props: BeneficiaryScreenInternalProps) {
		super(props);
		this.state = {
			selectedValue: '',
		};
	}

	render() {
		const { bottomButton, header, view } = commonStyles.benefit;
		const { selectedValue } = this.state;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<View style={view}>
					<DidiText.Explanation.Small style={header}>
						{strings.semillas.steps.second.title}
					</DidiText.Explanation.Small>

					<DidiText.Explanation.Small style={styles.description}>
						{strings.semillas.steps.second.detail}
					</DidiText.Explanation.Small>

					<Picker
						selectedValue={selectedValue}
						style={{ height: 50, width: 150 }}
						onValueChange={itemValue => this.setState({selectedValue: itemValue})}
						mode="dialog"
					>
						{
							DATA.map(({id,name}) => <Picker.Item label={name} value={id} />)
						}
					</Picker>
						
					<DidiServiceButton
                        onPress={() => { console.log('desde seleccionar turno') }}
                        title="SIGUIENTE"
                        style={bottomButton}
                        isPending={false}
					/>
				</View>
						
			</Fragment>
		);
	}

}

export default BeneficiaryScreen;

const styles = StyleSheet.create({
	description: {
		marginVertical: 10
	}
});
