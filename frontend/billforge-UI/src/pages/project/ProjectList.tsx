import { useProjects } from "../../features/project/projectHooks";

export default function ProjectList() {
  const { data } = useProjects();

  return (
    <div>
      <h2 className="text-xl mb-4">Projects</h2>
      {data?.map((p: any) => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}
