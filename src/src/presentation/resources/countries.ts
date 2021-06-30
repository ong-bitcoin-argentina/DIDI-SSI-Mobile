import { ImageSourcePropType } from "react-native";

interface Country {
	name: string;
	prefix: string;
	countryCode?: string;
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
		image: require("./images/countries/brasil.png")
	},
	{
		name: "Chile",
		prefix: "56",
		image: require("./images/countries/chile.png")
	},
	{
		name: "Colombia",
		prefix: "57",
		image: require("./images/countries/colombia.png")
	},
	{
		name: "Ecuador",
		prefix: "593",
		image: require("./images/countries/ecuador.png")
	},
	{
		name: "Islas Malvinas",
		prefix: "500",
		image: require("./images/countries/argentina.png")
	},
	{
		name: "Guinea Francesa",
		prefix: "594",
		image: require("./images/countries/francia.png")
	},
	{
		name: "Guyana",
		prefix: "592",
		image: require("./images/countries/guyana.png")
	},
	{
		name: "Paraguay",
		prefix: "595",
		image: require("./images/countries/paraguay.png")
	},
	{
		name: "Perú",
		prefix: "51",
		image: require("./images/countries/peru.png")
	},
	{
		name: "Suriname",
		prefix: "597",
		image: require("./images/countries/suriname.png")
	},
	{
		name: "Uruguay",
		prefix: "598",
		image: require("./images/countries/uruguay.png")
	},
	{
		name: "Venezuela",
		prefix: "58",
		image: require("./images/countries/venezuela.png")
	},
	{
		name: "Panama",
		prefix: "507",
		image: require("./images/countries/panama.png")
	},
	{
		name: "Mexico",
		prefix: "52",
		image: require("./images/countries/mexico.png")
	},
	{
		name: "Guatemala",
		prefix: "502",
		image: require("./images/countries/guatemala.png")
	},
	{
		name: "El Salvador",
		prefix: "503",
		image: require("./images/countries/el-salvador.png")
	},
	{
		name: "Costa Rica",
		prefix: "506",
		image: require("./images/countries/costa-rica.png")
	},
	{
		name: "Haití",
		prefix: "509",
		image: require("./images/countries/haiti.png")
	},
	{
		name: "Cuba",
		prefix: "53",
		image: require("./images/countries/cuba.png")
	},
	{
		name: "Antigua y Barbuda",
		prefix: "1268",
		image: require("./images/countries/antigua-barbuda.png")
	},
	{
		name: "Honduras",
		prefix: "504",
		image: require("./images/countries/honduras.png")
	},
	{
		name: "España",
		prefix: "34",
		image: require("./images/countries/espana.png")
	},
	{
		name: "Francia",
		prefix: "33",
		image: require("./images/countries/francia.png")
	},
	{
		name: "Rep. Dominicana",
		prefix: "1809201",
		image: require("./images/countries/dominican-republic.png")
	},
	{
		name: "Rep. Dominicana",
		prefix: "1809",
		image: require("./images/countries/dominican-republic.png")
	},
	{
		name: "Rep. Dominicana",
		prefix: "1849",
		image: require("./images/countries/dominican-republic.png")
	},
	{
		name: "Rep. Dominicana",
		prefix: "1829",
		image: require("./images/countries/dominican-republic.png")
	},
	{
		name: "Puerto Rico",
		prefix: "1787",
		image: require("./images/countries/puerto-rico.png")
	},
	{
		name: "Nicaragua",
		prefix: "505",
		image: require("./images/countries/nicaragua.png")
	},
];
