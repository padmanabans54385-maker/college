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
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            This page could not be loaded
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Please refresh, or return home and try again.
          </p>
          <a
            href="/"
            className="mt-6 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Go home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
