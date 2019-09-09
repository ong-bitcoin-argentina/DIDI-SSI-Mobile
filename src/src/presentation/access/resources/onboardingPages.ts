import { ImageSourcePropType } from "react-native";
import { Color } from "../../resources/colors";

export interface OnboardingPage {
	image: ImageSourcePropType;
	backgroundColor: Color;
	backgroundTile: ImageSourcePropType;
	title: string;
	body: string;
}

const pages: OnboardingPage[] = [
	{
		image: require("../resources/images/onboarding1.png"),
		backgroundColor: "#8351C5",
		backgroundTile: require("../resources/images/onboardingTile1.png"),
		title: "¿Qué podes hacer?",
		body:
			"Con Didi vas a poder armar rondas comunitarias de plata y crear tu identidad digital sin intermediarios y de manera segura."
	},
	{
		image: require("../resources/images/onboarding2.png"),
		backgroundColor: "#CB296E",
		backgroundTile: require("../resources/images/onboardingTile2.png"),
		title: "Podés generar certificados",
		body: "Con Didi vas a poder acceder a todos tus certificados de cursos y propiedades."
	},
	{
		image: require("../resources/images/onboarding3.png"),
		backgroundColor: "#6ECD55",
		backgroundTile: require("../resources/images/onboardingTile3.png"),
		title: "Alcanzá tus metas de ahorro",
		body: "Podés crear Rondas y así conseguir la plata que estabas necesitando de manera fácil y confiable."
	}
];

export default pages;
