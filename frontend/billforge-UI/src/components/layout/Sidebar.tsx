import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-black/30 p-4 space-y-4">
      <Link to="/">Dashboard</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/clients">Clients</Link>
    </div>
  );
}
