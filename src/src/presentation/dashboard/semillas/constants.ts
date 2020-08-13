// si se cambian las imagenes de carpeta, cambiar
const basePath = `../../resources/images/semillas`;
const baseSembrando = `${basePath}-sembrando`;

const semillasCategories = ["Finanza", "Oportunidad", "Saber", "Salud", "Sueño"];

export const semillasCategoriesFilters = ["No filtrar", ...semillasCategories];

export default {
	["Salud"]: require(`${baseSembrando}-salud.png`),
	["Oportunidad"]: require(`${baseSembrando}-oportunidades.png`),
	["Saber"]: require(`${baseSembrando}-saberes.png`),
	["Sueño"]: require(`${baseSembrando}-suenos.png`),
	["Finanza"]: require(`${basePath}-finanzas-inclusivas.png`)
};
