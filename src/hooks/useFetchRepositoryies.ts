import { useQuery } from "@tanstack/react-query";
import { fetchPerository } from "../services/repositoryService";

//кастомный хук, который будет использоваться для получения данных о репозиториях
export const useFetchRepositories = (searchText: string) => {
  return useQuery({
    queryKey: ["repos", searchText],
    queryFn: () =>
      fetchPerository({ query: searchText, first: 100, after: null }),
    enabled: !!searchText,
    staleTime: 1000 * 60 * 5, // Время, в течение которого данные считаются "свежими" и не будут заново запрашиваться
  });
};
