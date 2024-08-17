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
export interface IResponse {
  data: {
    search: {
      edges: IEdges[];
    };
  };
}
