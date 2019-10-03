import { RecentActivity } from "../data/RecentActivity";

export interface RecentActivityAction {
	type: never;
}

const defaultContent: RecentActivity[] = [
	{
		icon: "",
		title: "Documentos",
		description: "Documento Identidad",
		state: "Validado",
		date: "12/09/2018"
	},
	{
		icon: "",
		title: "Ronda Los Martinez",
		description: "Cuota 2/12",
		state: "Pagado",
		date: "12/09/2018"
	},
	{
		icon: "",
		title: "Cursos",
		description: "Maestro Pizzero",
		state: "Terminado",
		date: "12/09/2018"
	}
];

export function recentActivityReducer(
	state: RecentActivity[] | undefined,
	action: RecentActivityAction
): RecentActivity[] {
	return state || defaultContent;
}
