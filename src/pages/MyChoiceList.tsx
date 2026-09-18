import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ListFilter } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/AuthContext";
import { getUserChoiceLists } from "../services/choiceListService";
import type { ChoiceList } from "../types";

const MyChoiceList = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ChoiceList[]>([]);

  useEffect(() => {
    if (!user) return;
    getUserChoiceLists(user.uid).then(setItems);
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
              <ListFilter size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
                My Choice Lists
              </h1>
              <p className="mt-1 text-sm text-[#577063]">
                Your generated TNEA choice filling lists.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-[#cdddc9] bg-white p-12 text-center">
            <ListFilter className="mx-auto h-12 w-12 text-[#577063]" />
            <h2 className="mt-4 font-heading text-xl font-bold text-[#143527]">No choice lists created</h2>
            <p className="mt-2 text-sm text-[#577063]">Generate an optimized TNEA choice filling list based on your cutoff score.</p>
            <Link
              to="/tnea/choice-list"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#143527] px-6 py-3 font-semibold text-white hover:bg-[#0b2017] transition"
            >
              Generate Choice List
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <article key={item.id} className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs">
                <h2 className="font-heading text-xl font-bold text-[#143527]">{item.studentName}</h2>
                <p className="mt-1 text-sm text-[#577063]">Cutoff: {item.cutoff} · TNEA Rank: {item.tneaRank}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-semibold text-[#143527]">
                    Dream: {item.dream.length} colleges
                  </span>
                  <span className="rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-semibold text-[#143527]">
                    Target: {item.target.length} colleges
                  </span>
                  <span className="rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3.5 py-1 text-xs font-semibold text-[#143527]">
                    Safe: {item.safe.length} colleges
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyChoiceList;
