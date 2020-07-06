import React, { Fragment } from "react";
import { StatusBar, StyleSheet, View, Picker, Linking } from "react-native";

import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import Prestador, { PrestadorModel } from "./Prestador";
import DidiButton from "../../util/DidiButton";
import WhatsAppIcon from "../../resources/images/icon_whatsapp.svg";
import CallIcon from "../../resources/images/phone.svg";
import DidiButtonImage from "../../util/DidiButtonImage";
import { DashboardScreenProps } from "../home/Dashboard";

export type RequestFinishedProps = {};

interface RequestFinishedScreenProps {
	activePrestador: PrestadorModel;
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
		Linking.openURL(`tel:${activePrestador.phone}`);
	};

	onCall = () => {
		// TODO define text
		const { activePrestador } = this.props;
		Linking.openURL(`whatsapp://send?text=Hola&phone=${activePrestador}`);
	};

	render() {
		const { bottomButton, header, view } = commonStyles.benefit;
		const { activePrestador } = this.props;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<View style={view}>
					<DidiText.Explanation.Small style={header}>{strings.semillas.steps.third.title}</DidiText.Explanation.Small>

					<DidiText.Explanation.Small style={styles.description}>
						{strings.semillas.steps.third.prestador} {strings.semillas.steps.third.beneficiario}
					</DidiText.Explanation.Small>

					<View>
						<Prestador style={styles.prestador} item={activePrestador} active={false} onPress={() => {}} />

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
				</View>
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
	}
});
