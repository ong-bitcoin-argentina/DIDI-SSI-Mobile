import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import Credentials from "uport-credentials/lib/Credentials";

import { getCredentials } from "./getCredentials";

export class TrustGraphClient {
	private credentials: Credentials;
	private client: ApolloClient<unknown>;

	private constructor(trustGraphUri: string, credentials: Credentials) {
		this.credentials = credentials;

		const authLink = setContext(async (_, { headers }) => {
			const token = await credentials.signJWT({}, 100);
			return {
				headers: { ...headers, authorization: `Bearer ${token}` }
			};
		});
		const httpLink = new HttpLink({
			uri: trustGraphUri
		});
		this.client = new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache()
		});
	}

	static async create(trustGraphUri: string): Promise<TrustGraphClient> {
		return new TrustGraphClient(trustGraphUri, await getCredentials());
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
