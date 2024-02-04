import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ ...props }) => {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) {
      router.push(props.url);
    }

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown, props.url, router]);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-wokr-red-100">
          {props.error}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {props.title}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {props.description}
        </p>

        {countdown > 0 && (
          <p className="mt-4 text-base text-gray-500">
            You will be redirected in {countdown}s
          </p>
        )}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={props.url}
            className="rounded-md bg-wokr-red-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wokr-red-100  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wokr-200"
          >
            {props.urlText}
          </Link>
          <Link href="/" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProtectedRoute;