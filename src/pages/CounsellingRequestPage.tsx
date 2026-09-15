import { useEffect, useState } from "react";
import { CounsellingForm } from "../components/CounsellingForm";
import { useAuth } from "../hooks/AuthContext";
import { getUserCounsellingRequests } from "../services/counsellingService";
import type { CounsellingRequest } from "../types";

const CounsellingRequestPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<CounsellingRequest[]>([]);

  useEffect(() => {
    if (!user) return;
    getUserCounsellingRequests(user.uid).then(setItems);
  }, [user]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-heading text-3xl font-extrabold">Counselling requests</h1>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border bg-white p-4 text-sm">
            <p className="font-semibold">{item.studentName}</p>
            <p>Status: {item.status}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-10 font-heading text-xl font-bold">New request</h2>
      <div className="mt-4">
        <CounsellingForm source="dashboard" />
      </div>
    </main>
  );
};

export default CounsellingRequestPage;
