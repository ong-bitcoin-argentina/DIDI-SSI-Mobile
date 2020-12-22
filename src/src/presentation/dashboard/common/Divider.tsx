import React, { Component } from "react";
import { View, ViewStyle } from "react-native";

type Props = {
	style?: ViewStyle;
	height?: number;
};

export class Divider extends Component<Props> {
	render() {
		const { height } = this.props;
		return <View style={{ height: height || 12, ...this.props.style }}></View>;
	}
}

export default Divider;
