import { ImageSourcePropType } from "react-native";

interface Country {
	name: string;
	prefix: string;
	countryCode: string;
	image?: ImageSourcePropType;
}

export const countries: Country[] = [
	{
		name: "Argentina",
		prefix: "54",
		countryCode: "AR",
		image: require("./images/countries/argentina.png")
	},
	{
		name: "Bolivia",
		prefix: "591",
		countryCode: "BO",
		image: require("./images/countries/bolivia.png")
	},
	{
		name: "Brasil",
		prefix: "55",
		countryCode: "BR",
		image: require("./images/countries/brasil.png")
	},
	{
		name: "Chile",
		prefix: "56",
		countryCode: "CL",
		image: require("./images/countries/chile.png")
	},
	{
		name: "Colombia",
		prefix: "57",
		countryCode: "CO",
		image: require("./images/countries/colombia.png")
	},
	{
		name: "Ecuador",
		prefix: "593",
		countryCode: "EC",
		image: require("./images/countries/ecuador.png")
	},
	{
		name: "Islas Malvinas",
		prefix: "500",
		countryCode: "FK",
		image: require("./images/countries/argentina.png")
	},
	{
		name: "Guayana Francesa",
		prefix: "594",
		countryCode: "GF",
		image: require("./images/countries/francia.png")
	},
	{
		name: "Guyana",
		prefix: "592",
		countryCode: "GY",
		image: require("./images/countries/guyana.png")
	},
	{
		name: "Paraguay",
		prefix: "595",
		countryCode: "PY",
		image: require("./images/countries/paraguay.png")
	},
	{
		name: "Perú",
		prefix: "51",
		countryCode: "PE",
		image: require("./images/countries/peru.png")
	},
	{
		name: "Suriname",
		prefix: "597",
		countryCode: "SR",
		image: require("./images/countries/suriname.png")
	},
	{
		name: "Uruguay",
		prefix: "598",
		countryCode: "UY",
		image: require("./images/countries/uruguay.png")
	},
	{
		name: "Venezuela",
		prefix: "58",
		countryCode: "VE",
		image: require("./images/countries/venezuela.png")
	},
	{
		name: "Panama",
		prefix: "507",
		countryCode: "PA",
		image: require("./images/countries/panama.png")
	},
	{
		name: "Mexico",
		prefix: "52",
		countryCode: "MX",
		image: require("./images/countries/mexico.png")
	},
	{
		name: "Guatemala",
		prefix: "502",
		countryCode: "GT",
		image: require("./images/countries/guatemala.png")
	},
	{
		name: "El Salvador",
		prefix: "503",
		countryCode: "SV",
		image: require("./images/countries/el-salvador.png")
	},
	{
		name: "Costa Rica",
		prefix: "506",
		countryCode: "CR",
		image: require("./images/countries/costa-rica.png")
	},
	{
		name: "Haití",
		prefix: "509",
		countryCode: "HT",
		image: require("./images/countries/haiti.png")
	},
	{
		name: "Cuba",
		prefix: "53",
		countryCode: "CU",
		image: require("./images/countries/cuba.png")
	},
	{
		name: "Antigua y Barbuda",
		prefix: "1268",
		countryCode: "AG",
		image: require("./images/countries/antigua-barbuda.png")
	},
	{
		name: "Honduras",
		prefix: "504",
		countryCode: "HN",
		image: require("./images/countries/honduras.png")
	},
	{
		name: "España",
		prefix: "34",
		countryCode: "ES",
		image: require("./images/countries/espana.png")
	},
	{
		name: "Francia",
		prefix: "33",
		countryCode: "FR",
		image: require("./images/countries/francia.png")
	},
	{
		name: "Rep. Dominicana",
		prefix: "1809201",
		countryCode: "DO",
		image: require("./images/countries/dominican-republic.png")
	},
	{
		name: "Rep. Dominicana",
		prefix: "1809",
		countryCode: "DO",
		image: require("./images/countries/dominican-republic.png")
	},
	{
		name: "Rep. Dominicana",
		prefix: "1849",
		countryCode: "DO",
		image: require("./images/countries/dominican-republic.png")
	},
	{
		name: "Rep. Dominicana",
		prefix: "1829",
		countryCode: "DO",
		image: require("./images/countries/dominican-republic.png")
	},
	{
		name: "Puerto Rico",
		prefix: "1787",
		countryCode: "PR",
		image: require("./images/countries/puerto-rico.png")
	},
	{
		name: "Nicaragua",
		prefix: "505",
		countryCode: "NI",
		image: require("./images/countries/nicaragua.png")
	},
];
