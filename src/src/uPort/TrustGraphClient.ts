import Credentials from "uport-credentials/lib/Credentials";
import { getCredentials } from "./getCredentials";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

export class TrustGraphClient {
	private credentials: Credentials;
	private client: ApolloClient<unknown>;

	private constructor(credentials: Credentials) {
		this.credentials = credentials;

		const authLink = setContext(async (_, { headers }) => {
			const token = await credentials.signJWT({}, 100);
			return {
				headers: { ...headers, authorization: `Bearer ${token}` }
			};
		});
		const httpLink = new HttpLink({
			uri: "https://edge.uport.me/graphql"
		});
		this.client = new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache()
		});
	}

	static async create(): Promise<TrustGraphClient> {
		return new TrustGraphClient(await getCredentials());
	}

	async getJWTs(): Promise<string[]> {
		const query = gql`
			query findEdges($toDID: [String]) {
				findEdges(toDID: $toDID) {
					jwt
				}
			}
		`;
		const response = await this.client.query({
			query,
			variables: {
				toDID: [this.credentials.did]
			}
		});
		if (response.errors) {
			throw response.errors;
		} else {
			return response.data.findEdges.map((edge: { jwt: string }) => edge.jwt);
		}
	}
}
