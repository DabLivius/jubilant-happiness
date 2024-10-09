import React from "react";

export const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const onNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const onSpecificPage = (n) => {
    setCurrentPage(n);
    window.scrollTo(0, 0);
  };

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        <li>
          <a
            className={`pagination-previous ${
              currentPage === 1 ? "is-disabled" : ""
            }`}
            onClick={onPreviousPage}
          >
            Anterior
          </a>
        </li>
        {pageNumbers.map((noPage) => (
          <li key={noPage}>
            <a
              className={`pagination-link ${
                noPage === currentPage ? "is-current" : ""
              }`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </a>
          </li>
        ))}
        <li>
          <a
            className={`pagination-next ${
              currentPage >= pageNumbers.length ? "is-disabled" : ""
            }`}
            onClick={onNextPage}
          >
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};
