import React from "react";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from '../../util/DidiText';
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import strings from "../../resources/strings";
import { SafeAreaView, StyleSheet, View } from 'react-native';


export class ShareRespScreen extends NavigationEnabledComponent<
	{},
	{},
	{}
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndRightButtonClose(strings.share.title);
	render() {
		return (
			<SafeAreaView>
                <View style={styles.title} >
                    <DidiText.ChangePassword.Emphasis>{strings.shareResp.shareTitle}</DidiText.ChangePassword.Emphasis>
                </View>
                <View style={styles.description} >
					<DidiText.Explanation.Normal style={{textAlign:"left"}} >{strings.shareResp.explanation}</DidiText.Explanation.Normal>
                </View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	title:{
        marginVertical:'5%'
	},
    description:{
        marginHorizontal: '5%'
	},
});
