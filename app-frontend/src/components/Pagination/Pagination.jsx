import React from 'react';

function Pagination(props) {
    return (
        <nav className={props.totalPages === 0 ? 'd-none' : ''} aria-label="Page navigation example">
            <ul className="pagination float-left">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                </li>
                {Array.from({length: props.totalPages}, (_, i) => (
                    <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageClick(i + 1)}>{i + 1}</button>
                    </li>
                ))}
                <li className={`page-item ${page === props.totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handleNextPage}>Next</button>
                </li>
            </ul>
            <div className="float-right">
                <div className="mr-3 d-flex">

                    <select
                        id="show"
                        className="form-control"
                        value={show}
                        onChange={handleshowChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value={totalPost}>all</option>
                    </select>
                </div>
            </div>
        </nav>
    );
}

export default Pagination;