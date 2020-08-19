import semillasImagesSources from "../presentation/dashboard/semillas/constants";

export type PrestadorModel = {
	id: number | string;
	providerCategoryDto?: {
		id: number;
		name: keyof typeof semillasImagesSources;
	};
	name: string;
	phone: string;
	whatsappNumber: string;
	benefit: string;
	speciality: string;
};
