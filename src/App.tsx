import { useFetch } from "./hooks/useFetch";

type RepositoryProps = {
  full_name: string;
  description: string;
};

function App() {
  const {
    data: repositories,
    isFetching,
    error,
  } = useFetch<RepositoryProps[]>(
    "https://api.github.com/users/diego3g/repos"
  );

  return (
    <ul>
      {error && <p style={{ color: "red" }}>Erro ao carregar dados</p>}
      {isFetching && <p>Carregando...</p>}
      {repositories?.map((repo) => {
        return (
          <li key={repo.full_name}>
            <strong>{repo.full_name}</strong>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default App;
