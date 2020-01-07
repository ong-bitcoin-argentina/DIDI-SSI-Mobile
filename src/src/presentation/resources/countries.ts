import { ImageSourcePropType } from "react-native";

interface Country {
	name: string;
	prefix: string;
	image?: ImageSourcePropType;
}

export const countries: Country[] = [
	{
		name: "Argentina",
		prefix: "54",
		image: require("./images/arg.png")
	},
	{
		name: "Perú",
		prefix: "51"
	},
	{
		name: "Brasil",
		prefix: "55"
	},
	{
		name: "Chile",
		prefix: "56"
	},
	{
		name: "Colombia",
		prefix: "57"
	},
	{
		name: "Venezuela",
		prefix: "58"
	},
	{
		name: "Bolivia",
		prefix: "591"
	},
	{
		name: "Guyana",
		prefix: "592"
	},
	{
		name: "Ecuador",
		prefix: "593"
	},
	{
		name: "Guayana Francesa",
		prefix: "594"
	},
	{
		name: "Paraguay",
		prefix: "595"
	},
	{
		name: "Surinam",
		prefix: "597"
	},
	{
		name: "Uruguay",
		prefix: "598"
	}
];
