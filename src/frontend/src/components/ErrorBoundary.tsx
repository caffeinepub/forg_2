import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
          style={{ background: "oklch(0.97 0.02 155)" }}
        >
          <img
            src="/assets/uploads/refined_forg_mascot-019d21f7-2b04-74d7-97f1-2647e44a1e49-1.png"
            alt="FORG"
            className="w-32 h-32 object-contain mb-6 opacity-70"
          />
          <h1
            className="font-heading text-4xl mb-3"
            style={{ color: "oklch(0.27 0.07 155)" }}
          >
            Ribbit! Something went wrong.
          </h1>
          <p
            className="text-base mb-6"
            style={{ color: "oklch(0.48 0.04 155)" }}
          >
            The pond hit a snag. Try refreshing the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full font-heading text-base font-bold"
            style={{
              background: "oklch(0.90 0.18 125)",
              color: "oklch(0.14 0 0)",
            }}
          >
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
