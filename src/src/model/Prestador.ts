import semillasImagesSources from "../presentation/dashboard/semillas/imagesSources";

export type PrestadorModel = {
	id: number;
	category: keyof typeof semillasImagesSources;
	name: string;
	phone: string;
	benefit: string;
	speciality: string;
};