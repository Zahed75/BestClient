
import React from 'react';

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const getPageNumbers = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-5 my-10">
            <div className="flex justify-start items-center font-semibold">
                {/* Optionally include previous page information or other elements here */}
            </div>

            <div className="flex justify-end items-center">
                <nav aria-label="Pagination">
                    <ul className="inline-flex">
                        <li>
                            <button
                                className="w-9 h-9 md:w-10 md:h-10 bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                &#x2190;
                            </button>
                        </li>

                        {pageNumbers.map((pageNumber) => (
                            <li key={pageNumber}>
                                <button
                                    className={`w-9 h-9 md:w-10 md:h-10 text-sm font-semibold rounded-full ${
                                        pageNumber === currentPage
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                className="w-9 h-9 md:w-10 md:h-10 bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                &#x2192;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
