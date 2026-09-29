import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, GitCompare } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/AuthContext";
import { getUserComparisons } from "../services/comparisonService";
import type { SavedComparison } from "../types";

const MyComparisons = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<SavedComparison[]>([]);

  useEffect(() => {
    if (!user) return;
    getUserComparisons(user.uid).then(setItems);
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F5F9FC] font-sans text-[#075B63]">
      <Navbar />

      <header className="border-b border-[#E2ECF3] bg-[#E8F4FA]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5A6E78] hover:text-[#075B63]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#075B63] text-white">
              <GitCompare size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#075B63]">
                My Comparisons
              </h1>
              <p className="mt-1 text-sm text-[#5A6E78]">
                Your saved side-by-side college comparisons.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-[#E2ECF3] bg-white p-12 text-center">
            <GitCompare className="mx-auto h-12 w-12 text-[#5A6E78]" />
            <h2 className="mt-4 font-heading text-xl font-bold text-[#075B63]">No saved comparisons</h2>
            <p className="mt-2 text-sm text-[#5A6E78]">Compare colleges and save your lists for reference.</p>
            <Link
              to="/compare"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#075B63] px-6 py-3 font-semibold text-white hover:bg-[#05434A] transition"
            >
              Compare Colleges
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/compare?ids=${item.collegeIds.join(",")}`}
                className="block rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-xs hover:border-[#075B63] transition"
              >
                <h3 className="font-heading text-lg font-bold text-[#075B63]">
                  Compare {item.collegeIds.length} Colleges
                </h3>
                <p className="mt-1 text-xs text-[#5A6E78]">
                  Click to view full side-by-side breakdown
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyComparisons;
