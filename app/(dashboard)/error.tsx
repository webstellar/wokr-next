"use client"; // Error components must be Client Components

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [countdown, setCountdown] = useState(5);
  const [showBtn, setShowBtn] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      setShowBtn(!showBtn);
    }, 10000);
  }, [showBtn]);

  return (
    <div className="grid h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <Image
            src="/images/wokr-loader.gif"
            alt="loading gif"
            width={100}
            height={100}
            className="h-10 w-10"
          />
        </div>

        {countdown > 0 && (
          <p className="hidden mt-4 text-base text-gray-500">
            Retry in {countdown}s
          </p>
        )}

        {showBtn && (
          <button
            title="reset-button"
            type="button"
            className="rounded-md bg-wokr-red-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wokr-red-100  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wokr-200 mt-6 cursor-pointer"
            onClick={() => reset()}
          >
            Click to reload
          </button>
        )}
      </div>
    </div>
  );
}
