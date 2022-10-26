import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View, Linking, Alert } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Prestador from "./Prestador";
import DidiButton from "../../util/DidiButton";
import WhatsAppIcon from "../../resources/images/icon_whatsapp.svg";
import CallIcon from "../../resources/images/phone.svg";
import DidiButtonImage from "../../util/DidiButtonImage";
import { DashboardScreenProps } from "../home/Dashboard";
import { ScrollView } from "react-native-gesture-handler";
import { PrestadorModel } from "../../../model/Prestador";

const { Small } = DidiText.Explanation;

const { needCoordinate, title, whatsappError, whatsappMessage } = strings.semillas.steps.third;
const { call, whatsApp, accept, detailBarTitle } = strings.semillas;

export type RequestFinishedProps = {};
export type RequestFinishedState = {
	selectedValue: string;
	haveContact: boolean;
};

interface RequestFinishedScreenProps {
	activePrestador?: PrestadorModel;
	customEmail?: string;
}

export interface RequestFinishedNavigation {
	DashboardHome: DashboardScreenProps;
}

class RequestFinishedScreen extends NavigationEnabledComponent<
	RequestFinishedScreenProps,
	RequestFinishedState,
	RequestFinishedNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(detailBarTitle);

	constructor(props: RequestFinishedScreenProps) {
		super(props);
		const { activePrestador } = props;
		this.state = {
			selectedValue: "",
			haveContact: !!(activePrestador?.phone || activePrestador?.whatsappNumber)
		};
	}

	handleWhatsappPress = () => {
		const { activePrestador } = this.props;
		if (activePrestador) {
			const link = `whatsapp://send?text=${whatsappMessage}&phone=${activePrestador.whatsappNumber}`;
			Linking.openURL(link).catch(err => {
				console.log(err);
				Alert.alert("Error", whatsappError);
			});
		}
	};

	handleCallPress = () => {
		const { activePrestador } = this.props;
		if (activePrestador) Linking.openURL(`tel:${activePrestador.phone}`);
	};

	renderPhone = () => {
		return <DidiButtonImage title={call} image={<CallIcon />} onPress={this.handleCallPress} />;
	};

	renderWhatsapp = () => {
		return <DidiButtonImage title={whatsApp} image={<WhatsAppIcon />} onPress={this.handleWhatsappPress} />;
	};

	render() {
		const { header, view } = commonStyles.benefit;
		const { activePrestador, customEmail } = this.props;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<ScrollView style={view}>
					<Small style={header}>{title}</Small>

					<View style={{ flex: 1 }}>
						<View style={styles.prestadorContainer}>
							{customEmail ? (
								<Small>Mail: {customEmail}</Small>
							) : (
								<Prestador style={styles.prestador} item={activePrestador} active={false} onPress={undefined} />
							)}
						</View>
					</View>
					<View style={styles.buttonsView}>
						{customEmail ? (
							<View style={{ marginTop: 10 }}>
								<DidiButton
									title={strings.buttons.ok}
									onPress={() => {
										this.navigate("DashboardHome", {});
									}}
								/>
							</View>
						) : (
							<View>
								{(!!activePrestador?.phone || !!activePrestador?.whatsappNumber) && (
									<Small style={{ marginVertical: 5 }}>{needCoordinate}</Small>
								)}
								<View style={styles.buttons}>
									{!!activePrestador?.phone && this.renderPhone()}
									{!!activePrestador?.whatsappNumber && this.renderWhatsapp()}
								</View>
								<DidiButton
									title={accept}
									onPress={() => {
										this.navigate("DashboardHome", {});
									}}
								/>
							</View>
						)}
					</View>
				</ScrollView>
			</Fragment>
		);
	}
}

export default RequestFinishedScreen;

const styles = StyleSheet.create({
	description: {
		marginTop: 22,
		marginBottom: 8,
		fontSize: 18
	},
	prestador: {
		margin: 10,
		marginHorizontal: 20,
		flex: 0,
		height: 180
	},
	buttons: {
		flexDirection: "row",
		justifyContent: "space-around"
	},
	prestadorContainer: {
		flex: 1,
		marginVertical: 6
	},
	buttonsView: {
		marginVertical: 14
	}
});
