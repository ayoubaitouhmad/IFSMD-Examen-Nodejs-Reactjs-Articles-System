import React from "react";

const Pagination = ({ page, totalPages, handlePreviousPage, handleNextPage, handlePageClick, show, handleshowChange, totalPost }) => {
    return (
        <nav className="d-flex justify-content-between align-items-center" aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageClick(i + 1)}>{i + 1}</button>
                    </li>
                ))}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handleNextPage}>Next</button>
                </li>
            </ul>
            <div>
                <select
                    id="show"
                    className="form-control"
                    value={show}
                    onChange={handleshowChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value={totalPost}>All</option>
                </select>
            </div>
        </nav>
    );
};

export default Pagination;
