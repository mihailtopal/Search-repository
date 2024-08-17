import axios from "axios";
import Cookies from "js-cookie";
import { IResponse } from "./repositoryService.types";

// Функция для получения токена из куки
// Это позволяет получить токен, необходимый для авторизации запроса
const getToken = () => Cookies.get("github_token");

// Запрос на сервер для получения репозитриев
export const fetchPerository = async ({
  query,
  first,
  after,
}: {
  query: string;
  first: number;
  after?: string | null;
}) => {
  const response = await axios.post<IResponse>(
    "https://api.github.com/graphql",
    {
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
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  // Преобразование ответа для удобства работы с данными
  return response.data.data.search.edges.map((el: any) => ({
    name: el.node.name,
    description: el.node.description,
    stargazerCount: el.node.stargazerCount,
    forkCount: el.node.forkCount,
    updatedAt: el.node.updatedAt,
    languages: el.node.languages.edges.map((el: any) => el.node.name),
    primaryLanguage: el.node.primaryLanguage?.name,
    licenseInfo: el.node.licenseInfo?.name,
  }));
};
