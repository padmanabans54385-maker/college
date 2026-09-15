import { useEffect, useState } from "react";
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
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-heading text-3xl font-extrabold">My choice lists</h1>
      {items.map((item) => (
        <article key={item.id} className="mt-6 rounded-3xl border bg-white p-5">
          <h2 className="font-bold">{item.studentName}</h2>
          <p className="text-sm text-slate-500">Cutoff {item.cutoff} · Rank {item.tneaRank}</p>
          <p className="mt-2 text-sm">Dream: {item.dream.length} · Target: {item.target.length} · Safe: {item.safe.length}</p>
        </article>
      ))}
    </main>
  );
};

export default MyChoiceList;
