import { useEffect, useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
import { createCutoff, deleteCutoff, getCutoffs } from "../services/cutoffService";
import type { CutoffRecord } from "../types";

const AdminCutoffs = () => {
  const [items, setItems] = useState<CutoffRecord[]>([]);

  const reload = () => getCutoffs().then(setItems).catch(() => setItems([]));

  useEffect(() => {
    reload();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await createCutoff({
      year: String(form.get("year")),
      collegeId: String(form.get("collegeId")),
      collegeName: String(form.get("collegeName")),
      branch: String(form.get("branch")),
      community: String(form.get("community")),
      cutoff: Number(form.get("cutoff")),
      district: String(form.get("district")),
      source: String(form.get("source")),
      sourceUrl: String(form.get("sourceUrl")),
      verificationStatus: "historical",
    });
    event.currentTarget.reset();
    reload();
  };

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Cutoffs</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-2 rounded-3xl border bg-white p-5 sm:grid-cols-2">
          {["year", "collegeId", "collegeName", "branch", "community", "cutoff", "district", "source", "sourceUrl"].map(
            (name) => (
              <input key={name} name={name} required={name !== "sourceUrl"} placeholder={name} className="rounded-xl border px-3 py-2 text-sm" />
            )
          )}
          <button className="rounded-xl bg-teal-700 py-2 text-sm font-semibold text-white">Add cutoff</button>
        </form>
        <ul className="mt-6 space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between rounded-xl border bg-white p-3">
              <span>
                {item.year} · {item.collegeName} · {item.branch} · {item.community} · {item.cutoff}
              </span>
              <button type="button" className="text-rose-600" onClick={() => deleteCutoff(item.id).then(reload)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminCutoffs;
