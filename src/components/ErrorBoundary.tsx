import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#edf4ec] px-6 text-center">
          <h1 className="font-heading text-2xl font-bold text-[#142e23]">
            This page could not be loaded
          </h1>
          <p className="mt-2 text-sm text-[#577063]">
            Please refresh, or return home and try again.
          </p>
          <a
            href="/"
            className="mt-6 rounded-full bg-[#143527] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b2017]"
          >
            Go home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
