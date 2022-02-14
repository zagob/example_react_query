// import { useFetch } from "./hooks/useFetch";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

type RepositoryProps = {
  full_name: string;
  description: string;
};

export function Repos() {
  const {
    data: repositories,
    isFetching,
    error,
  } = useQuery<RepositoryProps[]>(
    "repos",
    async () => {
      const response = await axios.get(
        "https://api.github.com/users/diego3g/repos"
      );

      return response.data;
    },
    {
      // quanto tempo para recarregar dados
      staleTime: 1000 * 60, // 1 min
    }
  );
  // const {
  //   data: repositories,
  //   isFetching,
  //   error,
  // } = useFetch<RepositoryProps[]>("https://api.github.com/users/diego3g/repos");

  return (
    <ul>
      {error && <p style={{ color: "red" }}>Erro ao carregar dados</p>}
      {isFetching && <p>Carregando...</p>}
      {repositories?.map((repo) => {
        return (
          <li key={repo.full_name}>
            <Link to={`/repos/${repo.full_name}`}>{repo.full_name}</Link>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
