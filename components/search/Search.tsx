import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.trim()) {
        router.push(`/automations?query=${encodeURIComponent(search)}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, search]);

  return (
    <div className="hidden lg:flex justify-center items-center">
      <div className="relative w-full">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="search"
          name="domain"
          className="w-full md:w-[600px] backdrop-blur-sm bg-gray-200 py-2 pl-10 pr-4 rounded-full focus:outline-none border-2 focus:border-wokr-red-100/5 transition-colors duration-300"
          placeholder="Search services"
        />
        <button
          title="button"
          type="submit"
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            className="w-4 h-4 text-gray-800 dark:text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
