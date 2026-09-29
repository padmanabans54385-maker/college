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
    <div className="min-h-screen bg-[#F5F9FC] font-sans text-[#075B63]">
      <Navbar />

      <header className="border-b border-[#E2ECF3] bg-[#E8F4FA]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5A6E78] hover:text-[#075B63]"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin Dashboard
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#075B63] text-white">
              <Users size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#075B63]">
                User Management
              </h1>
              <p className="mt-1 text-sm text-[#5A6E78]">
                Registered platform students, college representatives, and admins.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-bold text-[#075B63] mb-4">Registered Accounts ({items.length})</h2>
        {items.length === 0 ? (
          <div className="rounded-3xl border border-[#E2ECF3] bg-white p-8 text-center text-[#5A6E78]">
            No user accounts found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-[#E2ECF3] bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2ECF3] bg-[#F0F8FD] text-left font-heading text-[#075B63]">
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF3]/60">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F5F9FC]/50 transition">
                      <td className="p-4 font-medium text-[#075B63] flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075B63] text-xs font-bold text-white">
                          {item.name ? item.name.charAt(0).toUpperCase() : <User size={14} />}
                        </div>
                        <span>{item.name || "Anonymous User"}</span>
                      </td>
                      <td className="p-4 text-[#5A6E78]">{item.email}</td>
                      <td className="p-4">
                        <span className="rounded-full border border-[#E2ECF3] bg-[#F0F8FD] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#075B63]">
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
