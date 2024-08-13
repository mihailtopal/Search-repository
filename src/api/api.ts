import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Интерфейс для представления структуры узла (node) в ответе GraphQL
interface IEdges {
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

// Интерфейс для структуры основного ответа от GraphQL
interface IResponse {
  data: {
    search: {
      edges: IEdges[];
    };
  };
}

// Функция для получения токена из куки
// Это позволяет получить токен, необходимый для авторизации запроса
const getToken = () => Cookies.get("github_token");

// Создание API с помощью RTK Query
export const reposAPI = createApi({
  reducerPath: "reposAPI",
  tagTypes: ["Repos"],
  baseQuery: fetchBaseQuery({
    // Подготовка заголовков запроса
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${getToken()}`); // Добавляем токен в заголовок
      return headers;
    },
    baseUrl: "https://api.github.com/graphql", // Базовый URL для GraphQL запросов
  }),
  endpoints: (build) => ({
    // Определение запроса на получение репозиториев
    getRepos: build.query({
      query: ({ query, first, after }) => ({
        url: "", // URL пуст, так как используется GraphQL и запрос идет в базовый URL
        method: "POST",
        body: JSON.stringify({
          // Тело запроса GraphQL
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
          variables: { query, first, after }, // Передача переменных в запрос
        }),
      }),
      // Преобразование ответа для удобства работы с данными
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

// Хук для выполнения запроса и получения данных о репозиториях
export const { useGetReposQuery } = reposAPI;
