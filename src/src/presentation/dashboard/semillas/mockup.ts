// TODO: borrar cuando se traiga data de semillas
const categories = [ "Odontología", "Oftalmología", "Clinica Médica", "Dermatología" ];
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
        name: randomSelect(entities),
        phone: randomPhone(),
        benefit: '10%'
	}
}

export const randomPrestadores = function(length:number) {
    let array:object[] = [];
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
        DNI: randomDNI()
	}
}

export const randomBeneficiarios = function(length:number) {
    let array:object[] = [];
    for (let i = 0; i < length; i++) {
        array.push(randomBeneficiario(i));
    }
    return array;
}

