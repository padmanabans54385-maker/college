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
    <article className="surface-card card-interactive group overflow-hidden">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {college.logo ? (
          <img
            src={college.logo}
            alt={college.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl font-bold text-gray-300">
            {college.name.charAt(0)}
          </div>
        )}

        <div className="absolute left-4 top-4">
          {college.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 shadow">
              <ShieldCheck className="h-4 w-4" />
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
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-105"
          >
            <Heart
              className={`h-5 w-5 ${
                saved
                  ? "fill-black text-black"
                  : "text-gray-700"
              }`}
            />
          </button>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-950">
          {college.name}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          {college.location}, {college.district}
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
          {college.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <Link
            to={`/colleges/${college.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to={`/colleges/${college.id}/apply`}
            className="text-sm font-semibold text-gray-700 hover:text-black"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CollegeCard;
