import { PrestadorModel } from "./Prestador";
import { semillasCategories } from "../../resources/constants";

const categories = Object.keys(semillasCategories);

// TODO: borrar cuando se traiga data de semillas
const specialities = [ "Odontología", "Clínica Médica", "Oftalmología", "Dermatología", "Otorrinolaringología" ];
const entities = [
    "Sunny Walkway",
    "Dental Total",
    "Zambrano",
    "Reparando codos largos",
    "Blue Sunny",
    "Yellow Scenic",
    "Historic",
    "Greeny",
    "Dusty Stream",
    "Fixeo de Ojos"
];

const names = [
    "Sunny Walkway",
    "Diego Armando Maradona",
    "Ines Zambrano",
    "Billie Ellish",
    "Baltazar King",
    "Chris Martin",
    "Rodolfo Martin Martin",
    "Armando Esteban Quito",
    "Dylan Martimore",
    "Adalmiro Joggin"
];

function randomSelect(items:string[]) {
    return items[Math.floor(Math.random() * items.length)];
}

function randomPhone() {
    const first = Math.floor(Math.random() * 10000);
    const second = Math.floor(Math.random() * 10000);
    return  `${first}-${second}`;
}

function randomDNI() {
    return Math.floor(Math.random() * 100000000);
}

const randomPrestador = function (index:number) {
	return {
        id: index,
        category: randomSelect(categories),
        speciality: randomSelect(specialities),
        name: randomSelect(entities),
        phone: randomPhone(),
        benefit: '10%'
	}
}

export const randomPrestadores = function(length:number):PrestadorModel[] {
    let array:PrestadorModel[] = [];
    for (let i = 0; i < length; i++) {
        array.push(randomPrestador(i));
    }
    return array;
}

const randomBeneficiario = function (index:number) {
	return {
        id: index,
        name: randomSelect(names),
        phone: randomPhone(),
        DNI: randomDNI(),
        birthday: '03/03/4456',
        email: 'example@atix.com'
	}
}

export const randomBeneficiarios = (length:number) => {
    let array:object[] = [];
    for (let i = 0; i < length; i++) {
        array.push(randomBeneficiario(i));
    }
    return array;
}

