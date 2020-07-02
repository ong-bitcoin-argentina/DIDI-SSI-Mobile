import React, { Fragment } from "react";
import { StatusBar, StyleSheet, FlatList, View } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Prestador from './Prestador';
import { BeneficiarioProps } from './BeneficiarioScreen';


export type PrestadoresProps = {};

interface PrestadoresScreenStateProps { };

type PrestadoresScreenState = {
	activePrestador: object;
};

type PrestadoresScreenInternalProps = PrestadoresScreenStateProps;

export interface PrestadoresScreenNavigation {
	Beneficiario: BeneficiarioProps;
}

import { randomPrestadores } from './mockup';
const DATA = randomPrestadores(20);

class PrestadoresScreen extends NavigationEnabledComponent<PrestadoresScreenInternalProps, PrestadoresScreenState, PrestadoresScreenNavigation> {
	
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.detailBarTitle);
	
	constructor(props: PrestadoresScreenInternalProps) {
		super(props);
		this.state = {
			activePrestador: {},
		};
	}
	
	onSelect = (prestador: object) => {
		const same = (prestador.id === this.state.activePrestador.id);
		this.setState({
			activePrestador: same ? {} : prestador, 
		});
	}


	render() {
		const { bottomButton, header, view } = commonStyles.benefit;
		const { activePrestador } = this.state;
		const activeId = activePrestador.id;

		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<View style={view}>
					<DidiText.Explanation.Small style={header}>
						{strings.semillas.steps.first}
					</DidiText.Explanation.Small>

					<FlatList
						numColumns={2}
						data={DATA}
						renderItem={({ item }) => <Prestador item={item} active={(item.id === activeId)} onPress={() => this.onSelect(item)} />}
						keyExtractor={item => item.id}
					/>
					
					{
						(activeId == 0 || activeId) &&
						<DidiServiceButton
							onPress={() => this.navigate("Beneficiary", { activePrestador })}
							title="SIGUIENTE"
							style={bottomButton}
							isPending={false}
						/>
					}
				</View>

			</Fragment>
		);
	}

}

export default PrestadoresScreen;

const styles = StyleSheet.create({
	
});
