import React from 'react'

export default function Pagination() {
    return (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-5 my-10">
            {/* page number */}
            <div className="flex justify-start items-center font-semibold">
                {/* {showingText} */}
            </div>
            {/* Pagination */}
            <div className="flex justify-end items-center">
                <nav aria-label="Pagination">
                    <ul className="inline-flex">
                        <li>
                            <button
                                className="w-9 h-9 md:w-10 md:h-10 bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full"
                            // onClick={() => paginate(currentPage - 1)}
                            // disabled={currentPage === 1}
                            >
                                &#x2190;
                            </button>
                        </li>

                        <li>
                            <button

                                className={`w-9 h-9 md:w-10 md:h-10 bg-orange-500 text-sm font-semibold text-white rounded-full `}
                            >
                                1
                            </button>
                            <button
                                className={`w-9 h-9 md:w-10 md:h-10  bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full `}
                            >
                                2
                            </button>
                            <button
                                className={`w-9 h-9 md:w-10 md:h-10 bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full`}
                            >
                                3
                            </button>
                            <button
                                className={`w-9 h-9 md:w-10 md:h-10 bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full`}
                            >
                                4
                            </button>
                            <button
                                className={`w-9 h-9 md:w-10 md:h-10 bg-white text-sm text-gray-700 font-semibold rounded-full cursor-text`}
                            >
                                ...
                            </button>
                            <button
                                className={`w-9 h-9 md:w-10 md:h-10  bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full `}
                            >
                                32
                            </button>
                            <button
                                className={`w-9 h-9 md:w-10 md:h-10  bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full `}
                            >
                                33
                            </button>
                            <button
                                className={`w-9 h-9 md:w-10 md:h-10  bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full `}
                            >
                                34
                            </button>
                            <button
                                className="w-9 h-9 md:w-10 md:h-10  bg-white text-sm text-gray-700 font-semibold hover:bg-gray-100 hover:rounded-full"
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
