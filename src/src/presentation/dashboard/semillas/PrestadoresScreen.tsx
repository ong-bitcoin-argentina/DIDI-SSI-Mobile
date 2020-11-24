import React, { Fragment } from "react";
import {
	StatusBar,
	FlatList,
	View,
	Modal,
	Alert,
	Picker,
	StyleSheet,
	ActivityIndicator,
	ScrollView
} from "react-native";

import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Prestador from "./Prestador";
import CustomPicker from "../../common/CustomPicker";
import { PrestadorModel } from "../../../model/Prestador";
import { BeneficiarioProps } from "./BeneficiarioScreen";
import { Validations } from "../../../model/Validations";
import commonStyles from "../../resources/commonStyles";
import { didiConnect } from "../../../store/store";
import { getSemillasPrestadores } from "../../../services/semillas/getPrestadores";
import { semillasCategoriesFilters, categories } from "./constants";
import colors from "../../resources/colors";
import { haveValidIdentityAndBenefit } from "../../../util/semillasHelpers";
import { haveEmailAndPhone } from "../../../util/specialCredentialsHelpers";
import CustomPicker from "../../common/CustomPicker";
const { header, view } = commonStyles.benefit;
const { steps, writeEmail, program } = strings.semillas;
const { email, title, noCredentials } = steps.first;
const { modal } = commonStyles;
const { Small, Normal } = DidiText.Explanation;

export type PrestadoresProps = {};

interface PrestadoresScreenStateProps {
	prestadores: PrestadorModel[];
	prestadoresEnabled: boolean;
}

type PrestadoresScreenState = {
	activePrestador?: PrestadorModel;
	modalVisible: boolean;
	loading: boolean;
	customEmail: string;
	categoryFilter: string;
	actualList: PrestadorModel[];
};

interface PrestadoresScreenDispatchProps {
	getPrestadores: () => void;
}

type PrestadoresScreenInternalProps = PrestadoresScreenStateProps & PrestadoresScreenDispatchProps;

export interface PrestadoresScreenNavigation {
	Beneficiario: BeneficiarioProps;
}

class PrestadoresScreen extends NavigationEnabledComponent<
	PrestadoresScreenInternalProps,
	PrestadoresScreenState,
	PrestadoresScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.detailBarTitle);

	constructor(props: PrestadoresScreenInternalProps) {
		super(props);
		this.state = {
			actualList: this.props.prestadores,
			activePrestador: undefined,
			modalVisible: false,
			customEmail: "",
			categoryFilter: categories.all,
			loading: this.props.prestadores.length === 0
		};
	}

	componentDidMount() {
		if (this.props.prestadores.length === 0) {
			this.props.getPrestadores();
		}
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.prestadores !== this.props.prestadores) {
			this.setState({
				actualList: this.props.prestadores,
				loading: false
			});
		}
	}

	onSelect = (prestador: PrestadorModel) => {
		const same = prestador.id === this.state.activePrestador?.id;
		this.setState({
			activePrestador: same ? undefined : prestador,
			customEmail: ""
		});
	};

	handleConfirmCustomEmail = () => {
		const { customEmail } = this.state;
		if (Validations.isEmail(customEmail)) {
			this.setState({
				activePrestador: undefined,
				modalVisible: false
			});
			this.goNext({ customEmail });
		} else {
			Alert.alert("Por favor, escriba un email válido");
		}
	};

	goNext({ customEmail, activePrestador }: any) {
		if (this.props.prestadoresEnabled) {
			this.navigate("Beneficiario", { customEmail, activePrestador });
		} else {
			Alert.alert(program, noCredentials);
		}
	}

	handleChangeCustomEmail = (customEmail: string) => {
		this.setState({ customEmail });
	};

	handleFilterChange = (categoryFilter: string) => {
		const mustFilter = categoryFilter !== categories.all;
		const { prestadores } = this.props;
		this.setState({
			categoryFilter,
			actualList: prestadores.filter(item => !mustFilter || item.providerCategoryDto?.name === categoryFilter)
		});
	};

	getItemLayout = (data: any, index: number) => {
		const length = 120;
		return {
			offset: length * index,
			length,
			index
		};
	};

	renderPrestador = ({ item }: { item: PrestadorModel }) => {
		return (
			<Prestador item={item} active={item.id === this.state.activePrestador?.id} onPress={() => this.onSelect(item)} />
		);
	};

	renderLoading = () => {
		return <ActivityIndicator size="large" />;
	};

	renderList = () => {
		return (
			<FlatList
				numColumns={1}
				data={this.state.actualList}
				renderItem={this.renderPrestador}
				keyExtractor={({ id }) => `${id}`}
				maxToRenderPerBatch={8}
				updateCellsBatchingPeriod={30}
				windowSize={9}
				getItemLayout={this.getItemLayout}
				ListFooterComponent={
					!this.state.activePrestador && (
						<View style={{ marginTop: 20 }}>
							<Small
								onPress={() => this.setState({ modalVisible: true })}
								style={[{ textDecorationLine: "underline" }]}
							>
								{email}
							</Small>
						</View>
					)
				}
			/>
		);
	};

	render() {
		const { activePrestador, modalVisible, categoryFilter, loading } = this.state;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<View style={view}>
					<Small style={[header]} adjustsFontSizeToFit>
						{title}
					</Small>

					<CustomPicker
						selectedValue={categoryFilter}
						prefix={strings.general.filterBy.category}
						onValueChange={this.handleFilterChange}
						style={{ flex: 1.3 }}
					>
						{semillasCategoriesFilters.map(item => (
							<Picker.Item label={item.label} value={item.value} key={item.value} />
						))}
					</CustomPicker>

					<View style={{ flex: 8 }}>{loading ? this.renderLoading() : this.renderList()}</View>

					{activePrestador && activePrestador.id > -1 && (
						<DidiServiceButton
							onPress={() => this.goNext({ activePrestador })}
							title={strings.general.next.toUpperCase()}
							isPending={false}
						/>
					)}
				</View>

				<Modal animationType="fade" transparent visible={modalVisible}>
					<View style={modal.centeredView}>
						<View style={[modal.view, { maxHeight: 400, minHeight: 300 }]}>
							<ScrollView>
								<Normal style={styles.emailDescription}>{writeEmail}</Normal>
								<DidiTextInput.Email onChangeText={customEmail => this.handleChangeCustomEmail(customEmail)} />

								<View style={modal.footer}>
									<DidiServiceButton
										onPress={() => {
											this.setState({ modalVisible: !modalVisible });
										}}
										title={strings.general.cancel}
										style={modal.smallButton}
										isPending={false}
									/>

									<DidiServiceButton
										onPress={() => {
											this.handleConfirmCustomEmail();
										}}
										title={strings.general.next}
										style={modal.smallButton}
										isPending={false}
									/>
								</View>
							</ScrollView>
						</View>
					</View>
				</Modal>
			</Fragment>
		);
	}
}

export default didiConnect(
	PrestadoresScreen,
	(state): PrestadoresScreenStateProps => ({
		prestadores: state.prestadores,
		prestadoresEnabled:
			haveValidIdentityAndBenefit(state.activeSemillasCredentials) && haveEmailAndPhone(state.activeSpecialCredentials)
	}),
	(dispatch): PrestadoresScreenDispatchProps => ({
		getPrestadores: () => dispatch(getSemillasPrestadores("GetPrestadores"))
	})
);

const styles = StyleSheet.create({
	header: {
		flex: 1
	},
	emailDescription: {
		marginTop: 10,
		marginBottom: 22
	}
});
