import React, {Fragment} from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';

import {
	Colors
} from 'react-native/Libraries/NewAppScreen';

import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import { LoginEnterPhoneProps } from "./login/LoginEnterPhone";
import { SignupOnboardingProps } from "./signup/SignupOnboarding";
import { RecoveryExplanationProps } from "./recovery/RecoveryExplanation";
import DidiButton from '../util/DidiButton';
import defaultNavigationHeaderStyle from '../styles/defaultNavigationHeaderStyle'

export type StartAccessProps = {}

export interface StartAccessNavigation {
        LoginEnterPhone: LoginEnterPhoneProps,
        SignupOnboarding: SignupOnboardingProps,
        RecoveryExplanation: RecoveryExplanationProps
}

export class StartAccessScreen extends NavigationEnabledComponent<StartAccessProps, {}, StartAccessNavigation> {
        static navigationOptions = defaultNavigationHeaderStyle({
                header: null
        })

        render() {
		return (
			<Fragment>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView style={styles.area}>
                                        <View style={styles.body}/>
                                        <View style={styles.body}>
                                                <DidiButton 
                                                        accessibilityRole={'button'}
                                                        onPress={() => this.navigate("LoginEnterPhone", {})}
                                                        title="Ingresar"/>
                                                <DidiButton 
                                                        accessibilityRole={'button'}
                                                        onPress={() => this.navigate("SignupOnboarding", {})}
                                                        title="Crear Cuenta"/>
                                                <DidiButton 
                                                        accessibilityRole={'button'}
                                                        onPress={() => this.navigate("RecoveryExplanation", {})}
                                                        title="Recuperar Cuenta"/>
                                        </View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
        area: {
                backgroundColor: Colors.red,
                flex: 1,
        },
	body: {
                backgroundColor: Colors.white,
                alignItems: "center",
                justifyContent: "space-evenly",
                flex: 1,
	}
});