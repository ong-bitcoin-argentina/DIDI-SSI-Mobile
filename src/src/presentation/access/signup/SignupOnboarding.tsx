import React, { Fragment } from "react";
import {
	Dimensions,
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import HollowDot from "../../resources/images/onboardingCircle.svg";
import FullDot from "../../resources/images/onboardingCircleActive.svg";
import NextDot from "../../resources/images/onboardingCircleNext.svg";
import CloseCross from "../../resources/images/onboardingClose.svg";
import onboardingPages, { OnboardingPage } from "../../resources/onboardingPages";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { SignupEnterPhoneProps } from "./SignupEnterPhone";
import { PoliticsScreenProps } from "../../common/Politics";

export type SignupOnboardingProps = {};

export interface SignupOnboardingNavigation {
	PoliticsScreen: PoliticsScreenProps;
	SignupEnterPhone: SignupEnterPhoneProps;
	Politics: {}
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
					{[
						...onboardingPages.map((page, index) => this.renderPage(page, index)),
						this.renderSkipPage()
					]}
				</ScrollView>
				{this.renderOverlay()}
			</Fragment>
		);
	}

	private backgroundImages() {
		const mainPage = Math.max(0, Math.min(onboardingPages.length - 1, Math.round(this.state.scrollPage)));
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
					<TouchableOpacity style={styles.closeContainer} onPress={() => this.nextScreen()}>
						<DidiText.SignupCloseButton>{strings.signup.onboarding.close}</DidiText.SignupCloseButton>
						<CloseCross width={22} height={22} style={styles.closeButtonImage} />
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

	private renderSkipPage() {
		return <View key={onboardingPages.length} style={{ width: Dimensions.get("window").width }} />;
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
						<DidiText.Explanation.Emphasis style={styles.cardTitle}>{page.title}</DidiText.Explanation.Emphasis>
						<DidiText.Explanation.Normal>{page.body}</DidiText.Explanation.Normal>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	private renderDots() {
		const size = 12;
		return (
			<View style={styles.dotContainer}>
				{onboardingPages.map((_, index) => {
					if (index === Math.round(this.state.scrollPage)) {
						return <FullDot width={size} height={size} style={styles.dot} />;
					} else {
						return <HollowDot width={size} height={size} style={styles.dot} />;
					}
				})}
				<NextDot width={size} height={size} style={styles.dot} />
			</View>
		);
	}

	private advancePage() {
		if (Math.round(this.state.scrollPage) === onboardingPages.length - 1) {
			this.nextScreen();
		} else if (this.scrollViewRef.current) {
			this.setPage(this.state.scrollPage + 1);
		}
	}

	private setPage(n: number) {
		if (this.scrollViewRef.current) {
			const pageStart = this.state.pageWidth * n;
			this.scrollViewRef.current.scrollTo({ animated: true, x: pageStart, y: 0 });
		}
	}

	private updateScrollPosition(event: NativeSyntheticEvent<NativeScrollEvent>) {
		const pageWidth = Dimensions.get("window").width;
		const maxPage = onboardingPages.length - 1;

		const freeScrollPage = event.nativeEvent.contentOffset.x / pageWidth;

		if (freeScrollPage > maxPage + 0.25) {
			this.nextScreen(() => {
				this.setPage(maxPage);
				this.setState({ pageWidth, scrollPage: maxPage });
			});
		} else {
			const scrollPage = Math.max(0, Math.min(maxPage, freeScrollPage));
			this.setState({ pageWidth, scrollPage });
		}
	}

	private nextScreen = (andThen?: () => void) => {
		this.replace("Politics", {}, andThen);
	};
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
		flexDirection: "row",
		marginHorizontal: 20,
		justifyContent: "flex-end"
	},

	// CARD
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
		padding: 30,
		paddingBottom: 32,
		alignSelf: "stretch",
		alignItems: "stretch",
		justifyContent: "space-evenly",
		flex: 1
	},
	cardTitle: {
		marginTop: 20,
		marginBottom: 10,
		fontSize: 20
	},
	imageContainer: {
		flexGrow: 1,
		flexShrink: 1
	},
	image: {
		alignSelf: "center"
	},
	// FIN CARD

	closeContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end"
	},
	closeButtonImage: {
		marginHorizontal: 10
	},
	progressArea: {
		flex: 1,
		marginHorizontal: 20,
		justifyContent: "center"
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
		marginHorizontal: 4
	}
});