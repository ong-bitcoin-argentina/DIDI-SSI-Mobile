// si se cambian las imagenes de carpeta, cambiar la variable folder
const basePath = `./images/semillas`;
const baseSembrando = `${basePath}-sembrando`;

const salud = require(`${baseSembrando}-salud.png`);
const oportunidad = require(`${baseSembrando}-oportunidades.png`);
const saber = require(`${baseSembrando}-saberes.png`);
const sueno = require(`${baseSembrando}-suenos.png`);
const finanza = require(`${basePath}-finanzas-inclusivas.png`);

export default {
    salud,
    oportunidad,
    saber,
    sueno,
    finanza,
}
