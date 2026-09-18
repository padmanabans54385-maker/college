import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquareHeart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCounsellingRequests, updateCounsellingStatus } from "../services/counsellingService";
import type { CounsellingRequest } from "../types";

const AdminCounselling = () => {
  const [items, setItems] = useState<CounsellingRequest[]>([]);
  useEffect(() => {
    getCounsellingRequests().then(setItems).catch(() => setItems([]));
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
              <MessageSquareHeart size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
                Counselling Requests
              </h1>
              <p className="mt-1 text-sm text-[#577063]">
                Manage 1-on-1 expert admission guidance appointments.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-bold text-[#143527] mb-4">Requests ({items.length})</h2>
        {items.length === 0 ? (
          <div className="rounded-3xl border border-[#cdddc9] bg-white p-8 text-center text-[#577063]">
            No counselling requests submitted yet.
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#143527]">{item.studentName}</h3>
                  <p className="text-sm font-medium text-[#577063] mt-1">Phone: {item.phone}</p>
                  <p className="text-xs text-[#577063] mt-2">
                    <span className="font-semibold text-[#142e23]">Course:</span> {item.preferredCourse || "Any"} ·{" "}
                    <span className="font-semibold text-[#142e23]">Location:</span> {item.preferredLocation || "Any"}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t sm:border-t-0 sm:pt-0 border-[#cdddc9]/60">
                  <span className="text-xs font-semibold text-[#577063]">Status:</span>
                  <select
                    value={item.status}
                    onChange={(event) => {
                      const status = event.target.value as CounsellingRequest["status"];
                      updateCounsellingStatus(item.id, status);
                      setItems((current) => current.map((row) => (row.id === item.id ? { ...row, status } : row)));
                    }}
                    className="rounded-xl border border-[#cdddc9] bg-[#e6f0e4] px-3 py-1.5 text-xs font-semibold text-[#143527] outline-none focus:border-[#143527]"
                  >
                    <option value="new">NEW</option>
                    <option value="scheduled">SCHEDULED</option>
                    <option value="completed">COMPLETED</option>
                    <option value="closed">CLOSED</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminCounselling;
