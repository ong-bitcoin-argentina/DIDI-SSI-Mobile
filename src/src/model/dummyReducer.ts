import StoreAction from "./StoreAction";
import StoreContent, { ValidationState } from "./StoreContent";

const defaultContent: StoreContent = {
	loggedIn: true,
	identity: {
		id: "Lili.Martinez",
		name: "Liliana Martinez",
		image: require("../presentation/dashboard/resources/images/samplePerson.png"),

		fullName: {
			value: "Liliana Beatriz Martinez",
			state: ValidationState.None
		},
		cellPhone: {
			value: "15 3344 6677",
			state: ValidationState.Approved
		},
		email: {
			value: "lilita87@hotmail.com",
			state: ValidationState.Approved
		},
		document: {
			value: "30.000.111",
			state: ValidationState.Pending
		},
		nationality: {
			value: "Argentina",
			state: ValidationState.Pending
		},
		address: {
			value: "Manzana 24, Seccion 3, Edificio 1",
			state: ValidationState.Rejected
		}
	},
	documents: [
		{
			icon: require("../presentation/resources/images/placeIcon.png"),
			category: "Cursos",
			title: "Maestro Pizzero",
			subtitle: "Anual",
			filterType: "other",
			data: [{ label: "Horas acumuladas", value: "60 hs" }, { label: "Promedio", value: "7 / 10" }],
			columns: 1
		},
		{
			icon: require("../presentation/resources/images/addressIcon.png"),
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
			icon: require("../presentation/dashboard/resources/images/roundIcon.png"),
			category: "Ronda",
			title: "Los Martinez",
			subtitle: "Quincenal",
			filterType: "other",
			data: [{ label: "Acumulado", value: "$12.000" }, { label: "Cuota", value: "6 / 6" }],
			columns: 1
		},
		{
			icon: require("../presentation/dashboard/resources/images/documentIcon.png"),
			category: "Documento Identidad",
			title: "Liliana Martinez",
			subtitle: "Nombre",
			filterType: "identity",
			data: [
				{ label: "Número", value: "25.390.189" },
				{ label: "Nacionalidad", value: "🇦🇷" },
				{ label: "Fecha Nac.", value: "16.06.76" },
				{ label: "Sexo", value: "F" }
			],
			columns: 2
		}
	],
	recentActivity: [
		{
			icon: require("../presentation/resources/images/docsIcon.png"),
			title: "Documentos",
			description: "Documento Identidad",
			state: "Validado",
			date: "12/09/2018"
		},
		{
			icon: require("../presentation/resources/images/rondaIcon.png"),
			title: "Ronda Los Martinez",
			description: "Cuota 2/12",
			state: "Pagado",
			date: "12/09/2018"
		},
		{
			icon: require("../presentation/resources/images/coursesIcon.png"),
			title: "Cursos",
			description: "Maestro Pizzero",
			state: "Terminado",
			date: "12/09/2018"
		}
	]
};

function dummyReducer(state: StoreContent | undefined, action: StoreAction): StoreContent {
	if (state) {
		return state;
	} else {
		return defaultContent;
	}
}

export default dummyReducer;
