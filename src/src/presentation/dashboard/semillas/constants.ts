// si se cambian las imagenes de carpeta, cambiar
const basePath = `../../resources/images/semillas`;
const baseSembrando = `${basePath}-sembrando`;

export const categories = {
	finance: "Finanza",
	oportunity: "Oportunidad",
	health: "Salud",
	dream: "Sueño",
	knowledge: "Saber",
	all: "Todas"
};

const semillasCategories = [
	{
		label: "Finanzas",
		value: categories.finance
	},
	{
		label: "Oportunidades",
		value: categories.oportunity
	},
	{
		label: "Saberes",
		value: categories.knowledge
	},
	{
		label: "Salud",
		value: categories.health
	},
	{
		label: "Sueños",
		value: categories.dream
	}
];

export const semillasCategoriesFilters = [{ label: "Todas", value: categories.all }, ...semillasCategories];

export default {
	["Salud"]: require(`${baseSembrando}-salud.png`),
	["Oportunidad"]: require(`${baseSembrando}-oportunidades.png`),
	["Saber"]: require(`${baseSembrando}-saberes.png`),
	["Sueño"]: require(`${baseSembrando}-suenos.png`),
	["Finanza"]: require(`${basePath}-finanzas-inclusivas.png`)
};

export enum RenaperValidationStates {
	inProgress = "In Progress",
	failure = "Failure",
	success = "Success",
	finished = "Finished"
}

export enum ValidationStates {
	inProgress = "IN_PROGRESS",
	failure = "FAILURE",
	success = "SUCCESS",
	requested = "REQUESTED"
}
