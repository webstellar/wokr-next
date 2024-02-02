"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h2>Something went wrong!</h2>
        <button
          title="reset-button"
          type="button"
          className="rounded-md bg-wokr-red-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wokr-red-100  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wokr-200 mt-6 cursor-pointer"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
