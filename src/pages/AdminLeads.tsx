import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getLeads, updateLeadStatus } from "../services/leadService";
import type { Lead, LeadStatus } from "../types";

const statuses: LeadStatus[] = ["new", "contacted", "follow-up", "converted", "closed"];

const AdminLeads = () => {
  const [items, setItems] = useState<Lead[]>([]);

  useEffect(() => {
    getLeads().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Leads</h1>
        <div className="mt-6 overflow-x-auto rounded-3xl border bg-white">
          <table className="min-w-[800px] w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                {["Name", "Phone", "Source", "Status"].map((h) => (
                  <th key={h} className="p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.source}</td>
                  <td className="p-3">
                    <select
                      value={item.status}
                      onChange={(event) => {
                        const status = event.target.value as LeadStatus;
                        updateLeadStatus(item.id, status);
                        setItems((current) =>
                          current.map((row) => (row.id === item.id ? { ...row, status } : row))
                        );
                      }}
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminLeads;
