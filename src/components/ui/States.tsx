import { AlertCircle, Inbox, Loader2, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

export const LoadingSkeleton = ({ label = "Loading" }: { label?: string }) => (
  <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-[#577063]">
    <Loader2 className="h-8 w-8 animate-spin text-[#143527]" aria-hidden />
    <p className="text-sm font-medium">{label}…</p>
  </div>
);

export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <div className="surface-card border border-[#cdddc9] bg-white rounded-3xl px-6 py-16 text-center shadow-xs">
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6f0e4] text-[#143527]">
      <Inbox className="h-6 w-6" />
    </div>
    <h2 className="mt-4 font-heading text-xl font-bold text-[#142e23]">{title}</h2>
    <p className="mx-auto mt-2 max-w-lg text-sm text-[#577063]">{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export const ErrorState = ({
  title = "Something went wrong",
  description = "Please check your connection and try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) => (
  <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-12 text-center text-rose-900 shadow-xs">
    <AlertCircle className="mx-auto h-7 w-7 text-rose-700" />
    <h2 className="mt-3 font-heading text-xl font-bold">{title}</h2>
    <p className="mt-2 text-sm text-rose-700">{description}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-rose-800"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    )}
  </div>
);
