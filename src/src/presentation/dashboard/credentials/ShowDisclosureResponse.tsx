import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

const MAX_CHARS_PER_QR = 400;

export interface ShowDisclosureResponseProps {
	responseToken: string;
}

interface ShowDisclosureResponseState {
	index: number;
}

export type ShowDisclosureResponseNavigation = {};

export class ShowDisclosureResponseScreen extends NavigationEnabledComponent<
	ShowDisclosureResponseProps,
	ShowDisclosureResponseState,
	ShowDisclosureResponseNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.disclose.title);

	constructor(props: ShowDisclosureResponseProps) {
		super(props);
		this.state = {
			index: 0
		};
	}

	render() {
		const qrSegment =
			`_${this.state.index}/${this.maxIndex()}_:` +
			this.props.responseToken.slice(this.state.index * MAX_CHARS_PER_QR, (this.state.index + 1) * MAX_CHARS_PER_QR);
		return (
			<DidiScreen style={{ width: "90%" }}>
				<DidiText.Explanation.Normal>{strings.disclose.response.explanation}</DidiText.Explanation.Normal>
				<QRCode size={0.9 * Dimensions.get("window").width} value={qrSegment} />
				<View style={{ flexDirection: "row" }}>
					<DidiButton title="<" style={styles.arrowButton} onPress={() => this.changePosition(-1)} />
					<DidiText.Explanation.Normal style={styles.arrowText}>
						{this.state.index + 1}/{this.maxIndex() + 1}
					</DidiText.Explanation.Normal>
					<DidiButton title=">" style={styles.arrowButton} onPress={() => this.changePosition(+1)} />
				</View>
				<DidiButton title="Listo" disabled={this.state.index !== this.maxIndex()} onPress={() => this.goToRoot()} />
			</DidiScreen>
		);
	}

	private maxIndex() {
		return Math.ceil(this.props.responseToken.length / MAX_CHARS_PER_QR) - 1;
	}

	private changePosition(delta: number) {
		const freeNext = this.state.index + delta;
		const clampedNext = Math.max(0, Math.min(freeNext, this.maxIndex()));

		this.setState({ index: clampedNext });
	}
}

const styles = StyleSheet.create({
	arrowButton: {
		width: 80
	},
	arrowText: {
		textAlignVertical: "center",
		flex: 1
	}
});
