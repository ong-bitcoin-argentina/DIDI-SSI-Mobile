import { Document } from "../data/Document";

interface DocumentActionEnsure {
	type: "DOCUMENT_ENSURE";
	content: Document;
}
interface DocumentActionDelete {
	type: "DOCUMENT_DELETE";
	content: Document;
}
export type DocumentAction = DocumentActionEnsure | DocumentActionDelete;

const defaultContent: Document[] = [
	{
		type: "didi",
		icon: "",
		category: "Cursos",
		title: "Maestro Pizzero",
		subtitle: "Anual",
		filterType: "other",
		data: [{ label: "Horas acumuladas", value: "60 hs" }, { label: "Promedio", value: "7 / 10" }],
		columns: 1
	},
	{
		type: "didi",
		icon: "",
		category: "Propiedad",
		title: "Liliana Martinez",
		subtitle: "Vivienda",
		filterType: "livingPlace",
		data: [
			{ label: "Dirección", value: "M.Belgrano" },
			{ label: "Nro.", value: "0376" },
			{ label: "Barrio", value: "31" },
			{ label: "Folio", value: "#230495" },
			{ label: "Testigos", value: "4" },
			{ label: "Titulo", value: "En curso" }
		],
		columns: 3
	},
	{
		type: "didi",
		icon: "",
		category: "Ronda",
		title: "Los Martinez",
		subtitle: "Quincenal",
		filterType: "other",
		data: [{ label: "Acumulado", value: "$12.000" }, { label: "Cuota", value: "6 / 6" }],
		columns: 1
	},
	{
		type: "didi",
		icon: "",
		category: "Licencia de Conducir",
		title: "Liliana Martinez",
		subtitle: "Titular",
		filterType: "identity",
		data: [
			{ label: "Número", value: "25.390.189" },
			{ label: "Fecha Nac.", value: "16.06.76" },
			{ label: "Categoría", value: "B.1" },
			{ label: "Nacionalidad", value: "Argentina" },
			{ label: "Sexo", value: "F" },
			{ label: "Vencimiento", value: "24.07.24" }
		],
		columns: 3
	}
];

export function documentReducer(state: Document[] | undefined, action: DocumentAction): Document[] {
	if (state === undefined) {
		return defaultContent;
	}

	switch (action.type) {
		case "DOCUMENT_ENSURE":
			return [...state, action.content];
		case "DOCUMENT_DELETE":
			return [];
	}
}
