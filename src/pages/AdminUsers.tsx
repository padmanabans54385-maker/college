import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllUsers } from "../services/userService";
import type { UserProfile } from "../types";

const AdminUsers = () => {
  const [items, setItems] = useState<UserProfile[]>([]);
  useEffect(() => {
    getAllUsers().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <header className="border-b border-[#cdddc9] bg-[#dce8da]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#577063] hover:text-[#143527]"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin Dashboard
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white">
              <Users size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
                User Management
              </h1>
              <p className="mt-1 text-sm text-[#577063]">
                Registered platform students, college representatives, and admins.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-bold text-[#143527] mb-4">Registered Accounts ({items.length})</h2>
        {items.length === 0 ? (
          <div className="rounded-3xl border border-[#cdddc9] bg-white p-8 text-center text-[#577063]">
            No user accounts found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-[#cdddc9] bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full text-sm">
                <thead>
                  <tr className="border-b border-[#cdddc9] bg-[#e6f0e4] text-left font-heading text-[#143527]">
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cdddc9]/60">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-[#edf4ec]/50 transition">
                      <td className="p-4 font-medium text-[#142e23] flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#143527] text-xs font-bold text-white">
                          {item.name ? item.name.charAt(0).toUpperCase() : <User size={14} />}
                        </div>
                        <span>{item.name || "Anonymous User"}</span>
                      </td>
                      <td className="p-4 text-[#577063]">{item.email}</td>
                      <td className="p-4">
                        <span className="rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#143527]">
                          {item.role || "Student"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminUsers;
