import React, { Fragment } from "react";
import {
	Dimensions,
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from "react-native";

import commonStyles from "../../resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import onboardingPages, { OnboardingPage } from "../../resources/onboardingPages";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { SignupEnterPhoneProps } from "./SignupEnterPhone";

export type SignupOnboardingProps = {};

export interface SignupOnboardingNavigation {
	SignupEnterPhone: SignupEnterPhoneProps;
}

interface SignupOnboardingState {
	scrollPage: number;
	pageWidth: number;
}

export class SignupOnboardingScreen extends NavigationEnabledComponent<
	SignupOnboardingProps,
	SignupOnboardingState,
	SignupOnboardingNavigation
> {
	static navigationOptions = NavigationHeaderStyle.gone;

	private scrollViewRef: React.RefObject<ScrollView>;

	constructor(props: SignupOnboardingProps) {
		super(props);
		this.state = { scrollPage: 0, pageWidth: Dimensions.get("window").width };

		this.scrollViewRef = React.createRef();
	}

	render() {
		const { mainBackground, offBackground, offOpacity } = this.backgroundImages();
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<Image source={mainBackground} style={styles.backgroundImage} />
				<Image source={offBackground} style={[styles.backgroundImage, { opacity: offOpacity }]} />
				<ScrollView
					style={{ backgroundColor: "transparent" }}
					ref={this.scrollViewRef}
					pagingEnabled={true}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					scrollEventThrottle={1}
					onScroll={event => this.updateScrollPosition(event)}
				>
					{onboardingPages.map((page, index) => this.renderPage(page, index))}
				</ScrollView>
				{this.renderOverlay()}
			</Fragment>
		);
	}

	private backgroundImages() {
		const mainPage = Math.round(this.state.scrollPage);
		const mainBackground = onboardingPages[mainPage].backgroundTile;
		const offOpacity = this.state.scrollPage - mainPage;
		if (offOpacity !== 0) {
			const otherPage = offOpacity > 0 ? mainPage + 1 : mainPage - 1;
			if (0 <= otherPage && otherPage < onboardingPages.length) {
				return {
					mainBackground,
					offBackground: onboardingPages[otherPage].backgroundTile,
					offOpacity: Math.abs(offOpacity)
				};
			}
		}
		return { mainBackground, offOpacity: 0, offBackground: mainBackground };
	}

	private renderOverlay() {
		return (
			<View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
				<View pointerEvents="box-none" style={styles.closeArea}>
					<TouchableOpacity style={styles.closeContainer} onPress={() => this.goBack()}>
						<Text style={styles.closeButtonText}>{strings.signup.onboarding.close}</Text>
						<Image style={styles.closeButtonImage} source={require("../../resources/images/onboardingExit.png")} />
					</TouchableOpacity>
				</View>
				<View pointerEvents="box-none" style={styles.cardArea} />
				<View pointerEvents="box-none" style={styles.progressArea}>
					{this.renderDots()}
				</View>
			</View>
		);
	}

	private renderPage(page: OnboardingPage, index: number) {
		return (
			<View key={index} style={{ width: Dimensions.get("window").width }}>
				<View style={styles.closeArea} />
				{this.renderCard(page)}
				<View style={styles.progressArea} />
			</View>
		);
	}

	private renderCard(page: OnboardingPage) {
		const CardBackground = page.image;
		return (
			<TouchableWithoutFeedback onPress={() => this.advancePage()}>
				<View style={[commonStyles.view.area, styles.card, styles.cardArea]}>
					<View style={styles.cardContainer}>
						<View style={styles.imageContainer}>
							<CardBackground width="100%" height="100%" style={styles.image} />
						</View>
						<Text style={commonStyles.text.emphasis}>{page.title}</Text>
						<Text style={commonStyles.text.normal}>{page.body}</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	private renderDots() {
		const emptyDot = require("../../resources/images/onboardingCircle.png");
		const selectedDot = require("../../resources/images/onboardingCircleActive.png");
		return (
			<View style={styles.dotContainer}>
				{onboardingPages.map((_, index) => {
					const source = index === Math.round(this.state.scrollPage) ? selectedDot : emptyDot;
					return <Image key={index} source={source} style={styles.dot} />;
				})}
			</View>
		);
	}

	private advancePage() {
		if (Math.round(this.state.scrollPage) === onboardingPages.length - 1) {
			this.navigate("SignupEnterPhone", {});
		} else if (this.scrollViewRef.current) {
			const nextPageStart = this.state.pageWidth * (this.state.scrollPage + 1);
			this.scrollViewRef.current.scrollTo({ animated: true, x: nextPageStart, y: 0 });
		}
	}

	private updateScrollPosition(event: NativeSyntheticEvent<NativeScrollEvent>) {
		const contentWidth = event.nativeEvent.contentSize.width;
		const pageWidth = contentWidth / onboardingPages.length;
		const scrollPage = event.nativeEvent.contentOffset.x / pageWidth;

		if (scrollPage <= 0) {
			this.setState({ pageWidth, scrollPage: 0 });
		} else if (scrollPage > onboardingPages.length) {
			this.setState({ pageWidth, scrollPage: onboardingPages.length });
		} else {
			this.setState({ pageWidth, scrollPage });
		}
	}
}

const styles = StyleSheet.create({
	area: {
		flex: 1
	},
	body: {
		alignItems: "center",
		justifyContent: "space-evenly",
		flex: 1
	},
	closeArea: {
		flex: 1,
		marginHorizontal: 20
	},
	cardArea: {
		flex: 4,
		marginHorizontal: 20
	},
	card: {
		borderRadius: 10,
		// iOS
		shadowOpacity: 0.3,
		shadowRadius: 30,
		// Android
		elevation: 5
	},
	cardContainer: {
		padding: 20,
		alignItems: "stretch",
		justifyContent: "space-evenly",
		flex: 1
	},
	closeContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		flex: 1
	},
	closeButtonText: {
		color: "#FFF",
		fontSize: 20
	},
	closeButtonImage: {
		marginLeft: 10,
		width: 22,
		height: 22
	},
	progressArea: {
		flex: 1,
		marginHorizontal: 20,
		justifyContent: "center"
	},
	imageContainer: {
		flexGrow: 1,
		flexShrink: 1
	},
	image: {
		alignSelf: "center"
	},
	backgroundImage: {
		width: "100%",
		height: "100%",
		position: "absolute",
		resizeMode: "repeat"
	},
	dotContainer: {
		flexDirection: "row",
		alignSelf: "center"
	},
	dot: {
		width: 12,
		height: 12,
		marginHorizontal: 2
	}
});
