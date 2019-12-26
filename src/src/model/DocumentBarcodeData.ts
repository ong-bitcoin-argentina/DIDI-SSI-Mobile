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

function fromNewPDF417(fields: string[]): DocumentBarcodeData | undefined {
	// format: tramitNumber@lastNames@firstNames@gender@dni@documentSpecimen@birthDate@issuanceDate
	if (fields.length < 8 || fields.find((val, index) => val.trim().length === 0 && index < 8)) {
		return undefined;
	}

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

function fromOldPDF417(fields: string[]): DocumentBarcodeData | undefined {
	//           0   1                2 3         4          5 6         7      8            9           10
	// format: ""@dni@documentSpecimen@_@lastNames@firstNames@_@birthDate@gender@issuanceDate@tramitNumber@...
	if (
		fields.length < 11 ||
		fields[0] !== "" ||
		fields.find((val, index) => val.trim().length === 0 && index > 0 && index < 11)
	) {
		return undefined;
	}

	return {
		tramitId: fields[10],
		lastNames: fields[4],
		firstNames: fields[5],
		gender: fields[8],
		dni: fields[1],
		documentSpecimen: fields[2],
		birthDate: fields[7],
		issuanceDate: fields[9]
	};
}

export const DocumentBarcodeData = {
	fromPDF417: (pdf417: string): DocumentBarcodeData | undefined => {
		const fields = pdf417.split("@").map(s => s.trim());
		return fromOldPDF417(fields) ?? fromNewPDF417(fields);
	}
};
