import { DidiServerApiClient, EthrDID } from "@proyecto-didi/app-sdk";
import { AppConfig, PRIVATE_KEY_SEED_PASSWORD } from "../../AppConfig";
import { isRight } from "fp-ts/lib/Either";
import { convertError } from "../common/convertError";

function shareRequest(): DidiServerApiClient {
    return new DidiServerApiClient(
        { didiServerUri: AppConfig.defaultServiceSettings.didiUserServer },
        PRIVATE_KEY_SEED_PASSWORD
    );
}

function removeBlockchainFromDid(did: string): string {
    const didAsArray = did.split(":");
    if (didAsArray.length === 3) return did;
    didAsArray.splice(2, 1);
    return didAsArray.join(":");
}

export async function searchIssuerByName(IssuersEthrDID: EthrDID[], nameToSearch: string): Promise<boolean> {
    try {
        const result = convertError(await shareRequest().getIssuers());
        if (isRight(result)) {
            const issuers = result.right.data.issuersList;
            for (const issuer of issuers) {
                for ( const IssuerEthrDID  of IssuersEthrDID) {
                    let ethrDID = removeBlockchainFromDid(IssuerEthrDID.did());
                    let IssuerName = issuer.name?.split(" ");
                    if ( JSON.stringify(issuer.did).slice(1,-1) === ethrDID && IssuerName?.find(element => element.toLowerCase() === nameToSearch.toLowerCase())) {    
                        return true
                    }
                }
            }
        }
        return false
    } catch (error) {
        return false
    }
}
