import React, {useEffect, useState} from "react";
import {getPosts} from "../../../services/postService";


import NoPostsFound from "../../../components/BlogList/NoPostsFound";

import BlogList from "../../../components/BlogList/BlogList";
import Breadcrumb from "../../../utils/breadcrumb";
import frontendRoute from "../../../utils/frontendRoute";


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
            console.log(data)
            setTotalPages(data.totalPages);
            setTotalPost(data.totalPosts);
        };
        setPosts([]);
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

    const breadcrumbItems = [
        {name: 'Home', href: frontendRoute('home')},
        {name: 'All Article',  active: true}
    ];


    return (
        <>
            <Breadcrumb items={breadcrumbItems}/>
            <div className="p-2 bg-light">
                <>
                    <div className=" d-flex justify-content-start align-items-center p-2 mb-3 ">


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
                    <BlogList
                        posts={posts}
                        page={page}
                        totalPages={totalPages}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                        handlePageClick={handlePageClick}
                        show={show}
                        handleshowChange={handleshowChange}
                        totalPost={totalPost}
                        showPagination={true}
                    />

                </>
            </div>
        </>
    );
}

export default App;
