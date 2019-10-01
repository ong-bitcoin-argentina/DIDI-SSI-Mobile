import { ImageSourcePropType } from "react-native";
import { SvgProps } from "react-native-svg";
import { Color } from "../../resources/colors";

import Image1 from "../resources/images/onboarding1.svg";
import Image2 from "../resources/images/onboarding2.svg";
import Image3 from "../resources/images/onboarding3.svg";

export interface OnboardingPage {
	image: React.FunctionComponent<SvgProps>;
	backgroundColor: Color;
	backgroundTile: ImageSourcePropType;
	title: string;
	body: string;
}

const pages: OnboardingPage[] = [
	{
		image: Image1,
		backgroundColor: "#8351C5",
		backgroundTile: require("../resources/images/onboardingTile1.png"),
		title: "¿Qué podes hacer?",
		body:
			"Con Didi vas a poder armar rondas comunitarias de plata y crear tu identidad digital sin intermediarios y de manera segura."
	},
	{
		image: Image2,
		backgroundColor: "#CB296E",
		backgroundTile: require("../resources/images/onboardingTile2.png"),
		title: "Podés generar certificados",
		body: "Con Didi vas a poder acceder a todos tus certificados de cursos y propiedades."
	},
	{
		image: Image3,
		backgroundColor: "#6ECD55",
		backgroundTile: require("../resources/images/onboardingTile3.png"),
		title: "Alcanzá tus metas de ahorro",
		body: "Podés crear Rondas y así conseguir la plata que estabas necesitando de manera fácil y confiable."
	}
];

export default pages;
