import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);

  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <h2>Database</h2>
      <Database />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const updatedAtText = new Date(data.updated_at).toLocaleString("pt-br");

  return <div>Última atualização: {updatedAtText}</div>;
}

function Database() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const database = data.dependencies.database;

  return (
    <div>
      <div>Versão do Postgres: {database.version}</div>
      <div>Conecções maximas: {database.max_connections}</div>
      <div>Conecções abertas: {database.opened_connections}</div>
    </div>
  );
}
