"use client";

import { RefreshCw, X } from "lucide-react";
import { useState } from "react";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorBanner({ message, onRetry, onDismiss }: ErrorBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="error-banner mb-4 flex items-center gap-3 rounded-lg border border-error-muted bg-error-muted/30 px-4 py-2.5">
      <span className="flex-1 text-sm text-error">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 rounded-md border border-error-muted bg-error-muted/50 px-3 py-1 text-xs font-medium text-error transition-colors hover:bg-error-muted"
        >
          <RefreshCw className="h-3 w-3" />
          Retry
        </button>
      )}
      {onDismiss && (
        <button
          onClick={() => {
            setDismissed(true);
            onDismiss();
          }}
          className="text-error/60 transition-colors hover:text-error"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
