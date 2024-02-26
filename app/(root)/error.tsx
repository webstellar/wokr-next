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
    if (countdown === 0) {
      reset();
    }

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown, reset]);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex flex-col justify-center items-center h-[50%]">
      <h2>Something went wrong!</h2>

      {countdown > 0 && (
        <p className="my-4 text-base text-gray-500">Retry in {countdown}s</p>
      )}
      <button
        type="button"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
