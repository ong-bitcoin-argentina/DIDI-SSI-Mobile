export interface DocumentBarcodeData {
	tramitId: string;
	lastNames: string;
	firstNames: string;
	gender: string;
	dni: string;
	documentSpecimen: string;
	birthDate: string;
	issuanceDate: string;
}

export function fromPDF417(pdf417: string): DocumentBarcodeData | undefined {
	// format: tramitNumber@lastNames@firstNames@gender@dni@documentSpecimen@birthDate@issuanceDate
	const fields = pdf417.split("@");

	return {
		tramitId: fields[0],
		lastNames: fields[1],
		firstNames: fields[2],
		gender: fields[3],
		dni: fields[4],
		documentSpecimen: fields[5],
		birthDate: fields[6],
		issuanceDate: fields[7]
	};
}
