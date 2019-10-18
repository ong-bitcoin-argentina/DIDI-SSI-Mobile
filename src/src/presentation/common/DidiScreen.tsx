import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, View, ViewProps } from "react-native";

import commonStyles from "../access/resources/commonStyles";

import themes from "../resources/themes";

export type DidiScreenProps = ViewProps;

export class DidiScreen extends React.PureComponent<DidiScreenProps> {
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
