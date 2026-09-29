import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bookmark } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/AuthContext";
import { getSavedColleges, removeSavedCollege } from "../services/savedCollegeService";
import type { SavedCollege } from "../types";

const MyColleges = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<SavedCollege[]>([]);

  useEffect(() => {
    if (!user) return;
    getSavedColleges(user.uid).then(setItems);
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
              <Bookmark size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#075B63]">
                Saved Colleges
              </h1>
              <p className="mt-1 text-sm text-[#5A6E78]">
                Your bookmarked college profiles for quick access.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-[#E2ECF3] bg-white p-12 text-center">
            <Bookmark className="mx-auto h-12 w-12 text-[#5A6E78]" />
            <h2 className="mt-4 font-heading text-xl font-bold text-[#075B63]">No saved colleges</h2>
            <p className="mt-2 text-sm text-[#5A6E78]">Browse colleges and click save to keep track of your favorites.</p>
            <Link
              to="/colleges"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#075B63] px-6 py-3 font-semibold text-white hover:bg-[#05434A] transition"
            >
              Explore Colleges
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-3xl border border-[#E2ECF3] bg-white p-6 shadow-xs">
                <Link to={`/colleges/${item.collegeId}`} className="font-heading text-lg font-bold text-[#075B63] hover:underline">
                  {item.collegeName}
                </Link>
                <button
                  type="button"
                  className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                  onClick={() =>
                    user &&
                    removeSavedCollege(user.uid, item.collegeId).then(() =>
                      setItems((current) => current.filter((row) => row.id !== item.id))
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyColleges;
