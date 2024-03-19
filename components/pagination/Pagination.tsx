"use client";

import { useRouter } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean;
  path: string;
}

function Pagination({ pageNumber, isNext, path }: Props) {
  const router = useRouter();
  // Add refetch

  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;

    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }

    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="text-base font-normal"
      >
        Prev
      </button>
      <p className="text-base font-medium">{pageNumber}</p>
      <button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="text-base font-normal"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
