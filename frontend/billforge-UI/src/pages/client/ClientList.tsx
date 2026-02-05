import { useClients } from "../../features/client/clientHooks";

export default function ClientList() {
  const { data } = useClients();

  return (
    <div>
      <h2 className="text-xl mb-4">Clients</h2>
      {data?.map((c: any) => (
        <div key={c._id}>{c.name}</div>
      ))}
    </div>
  );
}
