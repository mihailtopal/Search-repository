import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export interface IEdges {
  node: {
    name: string;
    primaryLanguage: {
      name: string;
    } | null;
    description: string;
    forkCount: number;
    languages: {
      edges: {
        node: {
          name: string;
        };
      }[];
    };
    licenseInfo: {
      name: string;
    } | null;
    stargazerCount: number;
    updatedAt: string;
  };
}

export interface IResponse {
  data: {
    search: {
      edges: IEdges[];
    };
  };
}

// Функция для получения токена из куки
const getToken = () => Cookies.get("github_token");

export const reposAPI = createApi({
  reducerPath: "reposAPI",
  tagTypes: ["Repos"],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${getToken()}`);
      return headers;
    },
    baseUrl: "https://api.github.com/graphql",
  }),
  endpoints: (build) => ({
    getRepos: build.query({
      query: ({ query, first, after }) => ({
        url: "",
        method: "POST",
        body: JSON.stringify({
          query: `
            query SearchRepositories($query: String!, $first: Int!, $after: String) {
              search(query: $query, type: REPOSITORY, first: $first, after: $after) {
                repositoryCount
                edges {
                  cursor
                  node {
                    ... on Repository {
                      name
                      description
                      stargazerCount
                      forkCount
                      updatedAt
                      languages(first: 100) {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                      primaryLanguage {
                        name
                      }
                      licenseInfo {
                        name
                      }
                    }
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
              }
            }
          `,
          variables: { query, first, after },
        }),
      }),
      transformResponse: (response: IResponse) => {
        return response.data.search.edges.map((el) => ({
          name: el.node.name,
          description: el.node.description,
          stargazerCount: el.node.stargazerCount,
          forkCount: el.node.forkCount,
          updatedAt: el.node.updatedAt,
          languages: el.node.languages.edges.map((el) => el.node.name),
          primaryLanguage: el.node.primaryLanguage?.name,
          licenseInfo: el.node.licenseInfo?.name,
        }));
      },
    }),
  }),
});

export const { useGetReposQuery } = reposAPI;
