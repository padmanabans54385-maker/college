import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-heading text-3xl font-extrabold">My comparisons</h1>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/compare?ids=${item.collegeIds.join(",")}`}
            className="block rounded-2xl border bg-white p-4 font-semibold"
          >
            Compare {item.collegeIds.length} colleges
          </Link>
        ))}
      </div>
    </main>
  );
};

export default MyComparisons;
