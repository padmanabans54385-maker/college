import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Plus, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    <div className="min-h-screen bg-[#edf4ec] font-sans text-[#142e23]">
      <Navbar />

      <header className="border-b border-[#cdddc9] bg-[#dce8da]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#577063] hover:text-[#143527]"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin Dashboard
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#143527] text-white">
              <BarChart3 size={22} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-[#143527]">
                TNEA Cut-off Management
              </h1>
              <p className="mt-1 text-sm text-[#577063]">
                Manage historical TNEA cut-off records for predictor tools.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="rounded-3xl border border-[#cdddc9] bg-white p-6 shadow-xs grid gap-3 sm:grid-cols-2">
          <h2 className="sm:col-span-2 font-heading text-xl font-bold text-[#143527] mb-2">Add New Cut-off Record</h2>
          {["year", "collegeId", "collegeName", "branch", "community", "cutoff", "district", "source", "sourceUrl"].map(
            (name) => (
              <input
                key={name}
                name={name}
                required={name !== "sourceUrl"}
                placeholder={name.toUpperCase()}
                className="rounded-2xl border border-[#cdddc9] bg-white px-4 py-2.5 text-sm text-[#142e23] outline-none focus:border-[#143527] focus:ring-1 focus:ring-[#143527]"
              />
            )
          )}
          <button className="sm:col-span-2 mt-2 flex items-center justify-center gap-2 rounded-full bg-[#143527] py-3 text-sm font-semibold text-white hover:bg-[#0b2017] transition">
            <Plus size={18} />
            Add Cutoff Record
          </button>
        </form>

        <div className="mt-8">
          <h2 className="font-heading text-xl font-bold text-[#143527] mb-4">Historical Records ({items.length})</h2>
          {items.length === 0 ? (
            <div className="rounded-3xl border border-[#cdddc9] bg-white p-8 text-center text-[#577063]">
              No cut-off records added yet.
            </div>
          ) : (
            <ul className="space-y-3 text-sm">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-2xl border border-[#cdddc9] bg-white p-4 shadow-xs">
                  <div>
                    <span className="inline-block rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-2.5 py-0.5 text-xs font-semibold text-[#143527] mr-2">
                      {item.year}
                    </span>
                    <span className="font-semibold text-[#142e23]">{item.collegeName}</span>
                    <span className="text-[#577063]"> · {item.branch} · {item.community}</span>
                    <span className="ml-2 font-bold text-[#143527]">Cut-off: {item.cutoff}</span>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-red-200 p-2 text-rose-600 hover:bg-rose-50"
                    onClick={() => deleteCutoff(item.id).then(reload)}
                    title="Delete record"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminCutoffs;
