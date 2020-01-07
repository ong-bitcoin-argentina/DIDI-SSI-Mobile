import React, { Fragment } from "react";
import { SafeAreaView, ScrollView, ScrollViewProps, StatusBar, View, ViewProps } from "react-native";

import commonStyles from "../resources/commonStyles";

import themes from "../resources/themes";

export class DidiScreen extends React.PureComponent<ViewProps> {
	render() {
		const mergedBodyStyle = this.props.style ? [commonStyles.view.body, this.props.style] : commonStyles.view.body;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View {...this.props} style={mergedBodyStyle} />
				</SafeAreaView>
			</Fragment>
		);
	}
}

export class DidiScrollScreen extends React.PureComponent<ScrollViewProps> {
	render() {
		const mergedContainerStyle = this.props.style
			? [commonStyles.view.scroll, this.props.style]
			: commonStyles.view.scroll;
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<ScrollView {...this.props} contentContainerStyle={mergedContainerStyle} />
				</SafeAreaView>
			</Fragment>
		);
	}
}
