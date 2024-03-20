import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [search, setSearch] = useState<string>();
  const [query] = useDebounce(search, 500);

  useEffect(() => {
    if (pathname === "/automations") {
      setSearch(initialQuery);
    }
  }, [initialQuery, pathname]);

  useEffect(() => {
    if (pathname === "/automations" && query === "") {
      router.push("/automations");
    } else if (query) {
      router.push(`/automations?query=${encodeURIComponent(query)}`);
    }
  }, [router, query, pathname]);

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
