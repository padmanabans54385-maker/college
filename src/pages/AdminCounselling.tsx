import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCounsellingRequests, updateCounsellingStatus } from "../services/counsellingService";
import type { CounsellingRequest } from "../types";

const AdminCounselling = () => {
  const [items, setItems] = useState<CounsellingRequest[]>([]);
  useEffect(() => {
    getCounsellingRequests().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Counselling requests</h1>
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-2xl border bg-white p-4 text-sm">
              <p className="font-semibold">{item.studentName} · {item.phone}</p>
              <p>{item.preferredCourse} · {item.preferredLocation}</p>
              <select
                value={item.status}
                onChange={(event) => {
                  const status = event.target.value as CounsellingRequest["status"];
                  updateCounsellingStatus(item.id, status);
                  setItems((current) => current.map((row) => row.id === item.id ? { ...row, status } : row));
                }}
              >
                <option value="new">new</option>
                <option value="scheduled">scheduled</option>
                <option value="completed">completed</option>
                <option value="closed">closed</option>
              </select>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminCounselling;
