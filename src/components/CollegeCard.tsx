import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../hooks/AuthContext";
import {
  isCollegeSaved,
  removeSavedCollege,
  saveCollege,
} from "../services/savedCollegeService";
import type { College } from "../types";

interface CollegeCardProps {
  college: College;
}

const CollegeCard = ({ college }: CollegeCardProps) => {
  const { user } = useAuth();

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSavedState = async () => {
      if (!user) {
        setSaved(false);
        return;
      }

      try {
        const result = await isCollegeSaved(
          user.uid,
          college.id
        );

        setSaved(result);
      } catch (error) {
        console.error(error);
      }
    };

    loadSavedState();
  }, [user, college.id]);

  const toggleSaved = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      return;
    }

    setSaving(true);

    try {
      if (saved) {
        await removeSavedCollege(
          user.uid,
          college.id
        );

        setSaved(false);
      } else {
        await saveCollege(user.uid, college);
        setSaved(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="surface-card card-interactive group overflow-hidden border border-[#cdddc9] bg-white rounded-3xl shadow-sm hover:shadow-md">
      <div className="relative h-52 overflow-hidden bg-[#dce8da]">
        {college.logo ? (
          <img
            src={college.logo}
            alt={college.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-heading text-5xl font-bold text-[#143527]/40">
            {college.name.charAt(0)}
          </div>
        )}

        <div className="absolute left-4 top-4">
          {college.verified && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#cdddc9] bg-[#e6f0e4] px-3 py-1 text-xs font-bold text-[#143527] shadow-xs">
              <ShieldCheck className="h-4 w-4 text-[#143527]" />
              Verified
            </span>
          )}
        </div>

        {user && (
          <button
            type="button"
            onClick={toggleSaved}
            disabled={saving}
            aria-label={
              saved
                ? "Remove from saved colleges"
                : "Save college"
            }
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#cdddc9] bg-white shadow-xs transition hover:scale-105"
          >
            <Heart
              className={`h-5 w-5 ${
                saved
                  ? "fill-[#143527] text-[#143527]"
                  : "text-[#577063]"
              }`}
            />
          </button>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-[#142e23]">
          {college.name}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-[#577063]">
          <MapPin className="h-4 w-4 text-[#143527]" />
          {college.location}, {college.district}
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#465f51]">
          {college.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <Link
            to={`/colleges/${college.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#143527] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0b2017]"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to={`/colleges/${college.id}/apply`}
            className="text-sm font-semibold text-[#143527] hover:underline"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CollegeCard;
