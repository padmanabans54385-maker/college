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
              <MessageSquareHeart size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#075B63]">
                Counselling Requests
              </h1>
              <p className="mt-1 text-sm text-[#5A6E78]">
                Manage 1-on-1 expert admission guidance appointments.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-bold text-[#075B63] mb-4">Requests ({items.length})</h2>
        {items.length === 0 ? (
          <div className="rounded-3xl border border-[#E2ECF3] bg-white p-8 text-center text-[#5A6E78]">
            No counselling requests submitted yet.
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-xs">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#075B63]">{item.studentName}</h3>
                  <p className="text-sm font-medium text-[#5A6E78] mt-1">Phone: {item.phone}</p>
                  <p className="text-xs text-[#5A6E78] mt-2">
                    <span className="font-semibold text-[#075B63]">Course:</span> {item.preferredCourse || "Any"} ·{" "}
                    <span className="font-semibold text-[#075B63]">Location:</span> {item.preferredLocation || "Any"}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t sm:border-t-0 sm:pt-0 border-[#E2ECF3]/60">
                  <span className="text-xs font-semibold text-[#5A6E78]">Status:</span>
                  <select
                    value={item.status}
                    onChange={(event) => {
                      const status = event.target.value as CounsellingRequest["status"];
                      updateCounsellingStatus(item.id, status);
                      setItems((current) => current.map((row) => (row.id === item.id ? { ...row, status } : row)));
                    }}
                    className="rounded-xl border border-[#E2ECF3] bg-[#F0F8FD] px-3 py-1.5 text-xs font-semibold text-[#075B63] outline-none focus:border-[#075B63]"
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
