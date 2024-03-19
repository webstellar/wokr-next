"use client"; // Error components must be Client Components

import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (countdown === 0) {
      reset();
    }

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown, reset]);

  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h2>Loading...</h2>

        {countdown > 0 && (
          <p className="mt-4 text-base text-gray-500">Retry in {countdown}s</p>
        )}

        <button
          title="reset-button"
          type="button"
          className="rounded-md bg-wokr-red-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wokr-red-100  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wokr-200 mt-6 cursor-pointer"
          onClick={() => reset()}
        >
          Try again now
        </button>
      </div>
    </div>
  );
}
