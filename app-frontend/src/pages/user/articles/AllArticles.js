import React, {useEffect, useState} from "react";
import {getPosts} from "../../../services/postService";


import NoPostsFound from "../../../components/BlogList/NoPostsFound";

import BlogList from "../../../components/BlogList/BlogList";


function App() {
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(5);

    const [posts, setPosts] = useState([]);
    const [date, setDate] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPost, setTotalPost] = useState(1);
    const handleDateChange = (e) => {
        setDate(e.target.value)
        setPage(1)
    };
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        setPage(1)
    };
    const handleshowChange = (e) => setShow(e.target.value);


    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts(page, show, date, search);
            setPosts(data.posts);
            // console.log(data.posts)
            setTotalPages(data.totalPages);
            setTotalPost(data.totalPosts);
        };
        fetchPosts();
    }, [page, show, date, search]);
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };
    const handlePageClick = (pageNum) => {
        setPage(pageNum);
    };

    return (
        <>


            <div className="w-100">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#">Library</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>
            </div>


            <div className="w-100 mt-3 p-2">
                <div className="d-flex justify-content-start align-items-center pb-2 ">

                    <div className="mr-3">
                        <label htmlFor="date" className="text-nowrap">Start Date</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control"
                            value={date}
                            onChange={handleDateChange}
                            placeholder=""
                        />
                    </div>


                    <div className="mr-3">
                        <label htmlFor="search" className="text-nowrap">Search</label>
                        <input
                            id="search"
                            className="form-control"
                            value={search}
                            onChange={handleSearchChange}>
                        </input>
                    </div>


                </div>
                <div className="row">
                    {posts.length === 0 ? <NoPostsFound/> : <BlogList posts={ posts} />}
                </div>


                <nav className={totalPages === 0 ? 'd-none' : ''} aria-label="Page navigation example">
                    <ul className="pagination float-left">
                        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                        </li>
                        {Array.from({length: totalPages}, (_, i) => (
                            <li key={i + 1} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                                <button className="page-link" onClick={() => handlePageClick(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
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

            </div>


        </>
    );
}

export default App;
