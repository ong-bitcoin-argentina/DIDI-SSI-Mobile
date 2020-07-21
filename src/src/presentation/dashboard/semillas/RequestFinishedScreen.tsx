import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View, Picker, Linking, Alert } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
// import semillasImagesSources from './imagesSources';

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Prestador, { PrestadorModel } from "./Prestador";
import DidiButton from "../../util/DidiButton";
import WhatsAppIcon from "../../resources/images/icon_whatsapp.svg";
import CallIcon from "../../resources/images/phone.svg";
import DidiButtonImage from "../../util/DidiButtonImage";
import { DashboardScreenProps } from "../home/Dashboard";
import { ScrollView } from "react-native-gesture-handler";

export type RequestFinishedProps = {};

interface RequestFinishedScreenProps {
	activePrestador?: PrestadorModel;
	customEmail?: string;
}

export interface RequestFinishedNavigation {
	DashboardHome: DashboardScreenProps;
}

class RequestFinishedScreen extends NavigationEnabledComponent<
	RequestFinishedScreenProps,
	{},
	RequestFinishedNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.semillas.detailBarTitle);

	constructor(props: RequestFinishedScreenProps) {
		super(props);
		this.state = {
			selectedValue: ""
		};
	}

	onWhatsAppMessage = () => {
		const { activePrestador } = this.props;
		if (activePrestador) {
			// TODO define whatsappMessage
			const { whatsappError, whatsappMessage } = strings.semillas.steps.third;
			const link = `whatsapp://send?text=${whatsappMessage}&phone=${activePrestador.phone}`;
			Linking.openURL(link).catch(err => {
				console.log(err);
				Alert.alert(whatsappError);
			});
		}
	};

	onCall = () => {
		const { activePrestador } = this.props;
		if (activePrestador) Linking.openURL(`tel:${activePrestador.phone}`);
	};

	render() {
		const { header, view } = commonStyles.benefit;
		const { activePrestador, customEmail } = this.props;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<ScrollView style={view}>
					<DidiText.Explanation.Small style={header}>{strings.semillas.steps.third.title}</DidiText.Explanation.Small>

					<DidiText.Explanation.Small style={styles.description}>
						{strings.semillas.steps.third.prestador} {strings.semillas.steps.third.beneficiario}
					</DidiText.Explanation.Small>

					<View style={{ flex: 1 }}>
						<View style={styles.prestadorContainer}>
							{customEmail ? (
								<DidiText.Explanation.Small>Mail: {customEmail}</DidiText.Explanation.Small>
							) : (
								<Prestador style={styles.prestador} item={activePrestador} active={false} onPress={() => {}} />
							)}
						</View>

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
								<View style={styles.buttons}>
									<DidiButtonImage
										title={strings.semillas.call}
										image={<CallIcon />}
										onPress={this.onCall}
									></DidiButtonImage>
									<DidiButtonImage
										title={strings.semillas.whatsApp}
										image={<WhatsAppIcon />}
										onPress={this.onWhatsAppMessage}
									></DidiButtonImage>
								</View>
								<DidiButton
									title={strings.semillas.callLater}
									onPress={() => {
										// this.navigate("DashboardHome", {});
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
		marginVertical: 10
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
	}
});
