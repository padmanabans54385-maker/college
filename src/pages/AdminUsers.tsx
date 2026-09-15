import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllUsers } from "../services/userService";
import type { UserProfile } from "../types";

const AdminUsers = () => {
  const [items, setItems] = useState<UserProfile[]>([]);
  useEffect(() => {
    getAllUsers().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Users</h1>
        <ul className="mt-6 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl border bg-white p-3 text-sm">
              {item.name} · {item.email} · {item.role}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminUsers;
