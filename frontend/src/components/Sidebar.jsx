import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-8">Jibon Jatra</h1>
      <nav className="space-y-4">
        <Link to="/lostfound" className="block hover:text-red-300">
          Home
        </Link>
        <Link to="/lostfound" className="block hover:text-red-300">
          Register lost items
        </Link>
        <Link to="/lostfound" className="block hover:text-red-300">
          Register found items
        </Link>
      </nav>
    </aside>
  );
}
