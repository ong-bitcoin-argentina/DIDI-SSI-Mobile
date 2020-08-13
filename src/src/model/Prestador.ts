import semillasImagesSources from "../presentation/dashboard/semillas/constants";

export type PrestadorModel = {
	id: number;
	category?: keyof typeof semillasImagesSources;
	name: string;
	phone: string;
	whatsappNumber: string;
	benefit: string;
	speciality: string;
};
