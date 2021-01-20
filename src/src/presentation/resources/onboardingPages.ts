import { ImageSourcePropType } from "react-native";
import { SvgProps } from "react-native-svg";

import { Color } from "./colors";
import Image1 from "./images/onboarding1.svg";
import Image2 from "./images/onboarding2.svg";
import Image3 from "./images/onboarding3.svg";

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
		backgroundTile: require("./images/onboardingTile1.png"),
		title: "¿Qué podés hacer?",
		body: "Podés crear tu identidad digital sin intermediarios y de manera segura."
	},
	{
		image: Image2,
		backgroundColor: "#CB296E",
		backgroundTile: require("./images/onboardingTile2.png"),
		title: "Podés generar credenciales",
		body:
			"Podés acceder a todas tus credenciales, certificando tus datos, cursos realizados, domicilios, propiedades."
	},
	{
		image: Image3,
		backgroundColor: "#6ECD55",
		backgroundTile: require("./images/onboardingTile3.png"),
		title: "Alcanzá tus metas de ahorro",
		body: "Podés crear Rondas y así conseguir el dinero que estabas necesitando de manera confiable."
	}
];

export default pages;
