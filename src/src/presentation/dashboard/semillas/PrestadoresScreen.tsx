import React, { Fragment } from "react";
import { StatusBar, FlatList, View, Modal, Alert, Picker, StyleSheet, ActivityIndicator } from "react-native";

import { DidiText } from "../../util/DidiText";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { DidiServiceButton } from "../../util/DidiServiceButton";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Prestador from "./Prestador";
import { PrestadorModel } from "../../../model/Prestador";
import { BeneficiarioProps } from "./BeneficiarioScreen";
import { Validations } from "../../../model/Validations";
import commonStyles from "../../resources/commonStyles";
import { didiConnect } from "../../../store/store";
import { getSemillasPrestadores } from "../../../services/semillas/getPrestadores";
import { semillasCategoriesFilters } from "./constants";
const { bottomButton, header, view } = commonStyles.benefit;
const { steps, writeEmail } = strings.semillas;
const { email, title } = steps.first;
const { modal } = commonStyles;
const { Small } = DidiText.Explanation;

export type PrestadoresProps = {};

interface PrestadoresScreenStateProps {
	prestadores: PrestadorModel[];
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
			categoryFilter: "noFilter",
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
			this.navigate("Beneficiario", { customEmail });
		} else {
			Alert.alert("Por favor, escriba un email válido");
		}
	};

	handleChangeCustomEmail = (customEmail: string) => {
		this.setState({ customEmail });
	};

	handleFilterChange = (categoryFilter: string) => {
		const mustFilter = categoryFilter !== "No filtrar";
		const { prestadores } = this.props;
		this.setState({
			categoryFilter,
			actualList: prestadores.filter(item => !mustFilter || item.category === categoryFilter)
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
					<View style={{ marginTop: 20 }}>
						<Small>{email}</Small>
						<DidiServiceButton
							onPress={() => this.setState({ modalVisible: true })}
							title={writeEmail}
							style={{ height: 30 }}
							isPending={false}
						/>
					</View>
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

					<View style={styles.filter}>
						<View style={{ flex: 1 }}>
							<Small style={styles.pickerLabel}>{strings.general.filterBy.category}</Small>
						</View>
						<View style={{ flex: 1 }}>
							<Picker
								selectedValue={categoryFilter}
								style={{ height: "100%" }}
								onValueChange={this.handleFilterChange}
								mode="dialog"
							>
								{semillasCategoriesFilters.map((value: string) => (
									<Picker.Item label={value} value={value} key={value} />
								))}
							</Picker>
						</View>
					</View>

					<View style={{ flex: 8 }}>{loading ? this.renderLoading() : this.renderList()}</View>

					{activePrestador && activePrestador.id > -1 && (
						<DidiServiceButton
							onPress={() => this.navigate("Beneficiario", { activePrestador })}
							title={strings.general.next.toUpperCase()}
							style={bottomButton}
							isPending={false}
						/>
					)}
				</View>

				<Modal animationType="fade" transparent={true} visible={modalVisible}>
					<View style={modal.centeredView}>
						<View style={[modal.view, { height: "50%" }]}>
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
		prestadores: state.prestadores
	}),
	(dispatch): PrestadoresScreenDispatchProps => ({
		getPrestadores: () => dispatch(getSemillasPrestadores("GetPrestadores"))
	})
);

const styles = StyleSheet.create({
	header: {
		flex: 1
	},
	pickerLabel: {
		textAlign: "left",
		fontSize: 14
	},
	filter: {
		marginTop: -10,
		marginBottom: 14,
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	}
});
