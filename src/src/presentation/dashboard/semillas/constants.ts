// si se cambian las imagenes de carpeta, cambiar
const basePath = `../../resources/images/semillas`;
const baseSembrando = `${basePath}-sembrando`;

const semillasCategories = [
	{
		label: "Finanzas",
		value: "Finanza"
	},
	{
		label: "Oportunidades",
		value: "Oportunidad"
	},
	{
		label: "Saberes",
		value: "Saber"
	},
	{
		label: "Salud",
		value: "Salud"
	},
	{
		label: "Sueños",
		value: "Sueño"
	}
];

export const semillasCategoriesFilters = [{ label: "Todas", value: "Todas" }, ...semillasCategories];

export default {
	["Salud"]: require(`${baseSembrando}-salud.png`),
	["Oportunidad"]: require(`${baseSembrando}-oportunidades.png`),
	["Saber"]: require(`${baseSembrando}-saberes.png`),
	["Sueño"]: require(`${baseSembrando}-suenos.png`),
	["Finanza"]: require(`${basePath}-finanzas-inclusivas.png`)
};
