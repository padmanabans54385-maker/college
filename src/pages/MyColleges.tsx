import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-heading text-3xl font-extrabold">My colleges</h1>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border bg-white p-4">
            <Link to={`/colleges/${item.collegeId}`} className="font-semibold">
              {item.collegeName}
            </Link>
            <button
              type="button"
              className="text-sm text-rose-600"
              onClick={() => user && removeSavedCollege(user.uid, item.collegeId).then(() =>
                setItems((current) => current.filter((row) => row.id !== item.id))
              )}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyColleges;
