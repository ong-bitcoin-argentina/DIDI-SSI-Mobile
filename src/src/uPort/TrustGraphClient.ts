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

	async getJWTs(): Promise<Array<{ jwt: string; hash: string }>> {
		const response = await this.client.query({
			query: gql`
				query findEdges($toDID: String) {
					findEdges(toDID: $toDID) {
						jwt
					}
				}
			`,
			variables: {
				toDID: this.credentials.did
			}
		});
		if (response.errors) {
			throw response.errors;
		} else {
			return response.data.findEdges;
		}
	}

	async insertJWT(jwt: string): Promise<{ jwt: string; hash: string }> {
		const response = await this.client.mutate({
			mutation: gql`
				mutation addEdge($edgeJWT: String!, $did: String!) {
					addEdge(edgeJWT: $edgeJWT, did: $did) {
						jwt
					}
				}
			`,
			variables: {
				did: this.credentials.did,
				edgeJWT: jwt
			}
		});
		if (response.errors) {
			throw response.errors;
		} else {
			return response.data.addEdge;
		}
	}
}
