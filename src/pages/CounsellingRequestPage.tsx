import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquareHeart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <header className="border-b border-[#cdddc9] bg-[#dce8da]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#577063] hover:text-[#143527]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white">
              <MessageSquareHeart size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
                Admission Counselling
              </h1>
              <p className="mt-1 text-sm text-[#577063]">
                1-on-1 expert guidance for college selection and TNEA counseling.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        {items.length > 0 && (
          <div className="mb-10">
            <h2 className="font-heading text-xl font-bold text-[#143527] mb-4">My Submitted Requests</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs">
                  <div>
                    <p className="font-heading text-lg font-bold text-[#143527]">{item.studentName}</p>
                    <p className="text-xs text-[#577063] mt-1">Course: {item.preferredCourse || "Any"} · Location: {item.preferredLocation || "Any"}</p>
                  </div>
                  <span className="rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-semibold text-[#143527]">
                    STATUS: {item.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-[#cdddc9] bg-white p-8 shadow-xs">
          <h2 className="font-heading text-2xl font-bold text-[#143527] mb-2">Book a Counselling Session</h2>
          <p className="text-sm text-[#577063] mb-6">Fill out your details below and an expert counselor will connect with you on WhatsApp / Phone.</p>
          <CounsellingForm source="dashboard" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CounsellingRequestPage;
