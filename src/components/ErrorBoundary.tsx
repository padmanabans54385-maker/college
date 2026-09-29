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
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F9FC] px-6 text-center">
          <h1 className="font-heading text-2xl font-bold text-[#075B63]">
            This page could not be loaded
          </h1>
          <p className="mt-2 text-sm text-[#5A6E78]">
            Please refresh, or return home and try again.
          </p>
          <a
            href="/"
            className="mt-6 rounded-full bg-[#075B63] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#05434A]"
          >
            Go home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
