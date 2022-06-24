
export interface IShareRequestData {
    iat:      number;
    callback: string;
    type:     string;
    claims:   Claims;
    aud:      string;
    iss:      string;
}

interface Claims {
    verifiable: Verifiable;
}

interface Verifiable {
    nationalId: NationalID;
}

interface NationalID {
    reason:   string;
    issuers:  Issuer[];
    required: boolean;
}

interface Issuer {
    did: string;
    url: string;
}
