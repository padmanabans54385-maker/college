import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getLeads, updateLeadStatus } from "../services/leadService";
import type { Lead, LeadStatus } from "../types";

const statuses: LeadStatus[] = ["new", "contacted", "follow-up", "converted", "closed"];

const AdminLeads = () => {
  const [items, setItems] = useState<Lead[]>([]);

  useEffect(() => {
    getLeads().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <header className="border-b border-[#cdddc9] bg-[#dce8da]">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
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
                Admission Leads
              </h1>
              <p className="mt-1 text-sm text-[#577063]">
                Track WhatsApp, enquiry form, and counselling leads.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#cdddc9] bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-sm">
              <thead>
                <tr className="border-b border-[#cdddc9] bg-[#e6f0e4] text-left font-heading text-[#143527]">
                  {["Name", "Phone", "Source", "Status"].map((h) => (
                    <th key={h} className="p-4 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cdddc9]/60">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[#577063]">
                      No leads received yet.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-[#edf4ec]/50 transition">
                      <td className="p-4 font-medium text-[#142e23]">{item.name}</td>
                      <td className="p-4 text-[#577063]">{item.phone}</td>
                      <td className="p-4">
                        <span className="rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3 py-1 text-xs font-medium text-[#143527]">
                          {item.source}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={item.status}
                          onChange={(event) => {
                            const status = event.target.value as LeadStatus;
                            updateLeadStatus(item.id, status);
                            setItems((current) =>
                              current.map((row) => (row.id === item.id ? { ...row, status } : row))
                            );
                          }}
                          className="rounded-xl border border-[#cdddc9] bg-white px-3 py-1.5 text-xs font-semibold text-[#143527] outline-none focus:border-[#143527]"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLeads;
