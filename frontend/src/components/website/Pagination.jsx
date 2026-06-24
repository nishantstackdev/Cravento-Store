import React from "react";
import { useSearchParams } from "react-router-dom";

const getPageNumbers = (current, total) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[i]);
  }

  return result;
};

export default function Pagination({
  totalPages = 1,
  totalProducts = 0,
  perPage = 8,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const safeTotalPages = Math.max(1, totalPages);

  if (totalProducts === 0) return null;

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalProducts);
  const pageNumbers = getPageNumbers(currentPage, safeTotalPages);

  const goToPage = (page) => {
    if (page < 1 || page > safeTotalPages || page === currentPage) return;

    const params = new URLSearchParams(searchParams);
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200/60">
      <p className="text-[11px] font-semibold text-neutral-400 tracking-wide">
        Showing{" "}
        <span className="text-neutral-800 font-black">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="text-neutral-800 font-black">{totalProducts}</span>{" "}
        products
      </p>

      {safeTotalPages > 1 && (
        <nav
          className="flex items-center gap-1.5"
          aria-label="Product pagination"
        >
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className="w-9 h-9 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:pointer-events-none disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:border-neutral-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="flex items-center gap-1">
            {pageNumbers.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="w-9 h-9 flex items-center justify-center text-xs font-black text-neutral-300 select-none"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToPage(item)}
                  aria-label={`Page ${item}`}
                  aria-current={item === currentPage ? "page" : undefined}
                  className={`min-w-9 h-9 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    item === currentPage
                      ? "bg-emerald-600 text-white border border-emerald-600 shadow-md shadow-emerald-600/10 scale-[0.98]"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-emerald-500 hover:text-emerald-600 active:scale-95"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= safeTotalPages}
            aria-label="Next page"
            className="w-9 h-9 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:pointer-events-none disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:border-neutral-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
}
