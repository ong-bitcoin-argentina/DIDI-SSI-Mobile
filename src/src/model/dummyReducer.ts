import StoreAction from "./StoreAction";
import StoreContent from "./StoreContent";

const defaultContent: StoreContent = {
	loggedIn: true,
	identity: {
		id: "<persona.id>",
		name: "<Nombre Persona>",
		image: require("../presentation/access/resources/images/arg.png")
	},
	documents: [
		{
			icon: require("../presentation/resources/images/placeIcon.png"),
			image: require("../presentation/resources/images/blankIcon.png"),
			category: "Cursos",
			title: "Maestro Pizzero",
			subtitle: "Anual",
			data: [{ label: "Horas acumuladas", value: "60 hs" }, { label: "Promedio", value: "7 / 10" }],
			isHorizontal: false
		},
		{
			icon: require("../presentation/resources/images/addressIcon.png"),
			image: require("../presentation/resources/images/blankIcon.png"),
			category: "Propiedad",
			title: "Liliana Martinez",
			subtitle: "Vivienda",
			data: [
				{ label: "Dirección", value: "M.Belgrano" },
				{ label: "Nro.", value: "0376" },
				{ label: "Barrio", value: "31" },
				{ label: "Folio", value: "#230495" },
				{ label: "Testigos", value: "4" },
				{ label: "Titulo", value: "En curso" }
			],
			isHorizontal: true
		},
		{
			icon: require("../presentation/dashboard/resources/images/roundIcon.png"),
			image: require("../presentation/resources/images/blankIcon.png"),
			category: "Ronda",
			title: "Los Martinez",
			subtitle: "Quincenal",
			data: [{ label: "Acumulado", value: "$12.000" }, { label: "Cuota", value: "6 / 6" }],
			isHorizontal: false
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
