import React from "react";

interface Props {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="mt-10 flex w-full items-center justify-center gap-5">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              number === currentPage ? "text-wokr-red-200" : "page-item"
            }
          >
            <button
              type="button"
              onClick={() => paginate(number)}
              className="hover:text-wokr-red-200"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
