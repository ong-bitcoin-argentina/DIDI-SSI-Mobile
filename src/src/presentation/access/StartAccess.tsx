import React, {Fragment} from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import { LoginEnterPhoneProps } from "./login/LoginEnterPhone";
import { SignupOnboardingProps } from "./signup/SignupOnboarding";
import { RecoveryExplanationProps } from "./recovery/RecoveryExplanation";

export type StartAccessProps = {}

export interface StartAccessNavigation {
        Login: LoginEnterPhoneProps,
        Signup: SignupOnboardingProps,
        Recovery: RecoveryExplanationProps
}

export class StartAccessScreen extends NavigationEnabledComponent<StartAccessProps, {}, StartAccessNavigation> {
        render() {
		return (
			<Fragment>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView>
					<ScrollView
						contentInsetAdjustmentBehavior="automatic"
						style={styles.scrollView}>
						<Header />
						<View style={styles.body}>
							<View style={styles.sectionContainer}>
								<Text style={styles.sectionTitle}>Step One</Text>
								<Text style={styles.sectionDescription}>
									Edit <Text style={styles.highlight}>App.js</Text> to change this
									screen and then come back to see your edits.
								</Text>
							</View>
							<View style={styles.sectionContainer}>
								<Text style={styles.sectionTitle}>See Your Changes</Text>
								<Text style={styles.sectionDescription}>
									<ReloadInstructions />
								</Text>
							</View>
							<View style={styles.sectionContainer}>
								<Text style={styles.sectionTitle}>Debug</Text>
								<Text style={styles.sectionDescription}>
									<DebugInstructions />
								</Text>
							</View>
							<View style={styles.sectionContainer}>
								<Text style={styles.sectionTitle}>Learn More</Text>
								<Text style={styles.sectionDescription}>
									Read the docs to discover what to do next:
								</Text>
							</View>
							<LearnMoreLinks />
						</View>
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	engine: {
		position: 'absolute',
		right: 0,
	},
	body: {
		backgroundColor: Colors.white,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	highlight: {
		fontWeight: '700',
	},
	footer: {
		color: Colors.dark,
		fontSize: 12,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'right',
	},
	linkContainer: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 8,
	}
});