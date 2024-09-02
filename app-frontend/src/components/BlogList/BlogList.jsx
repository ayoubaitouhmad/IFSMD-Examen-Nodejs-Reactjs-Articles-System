import React from 'react';
import BlogPost from "../BlogPost/BlogPost";
import {Link} from "react-router-dom";
import ArticlesSkeleton from "../ArticlesSkeleton/ArticlesSkeleton";

import Pagination from "../Pagination/Pagination";


function BlogList({posts, page, totalPages, handlePreviousPage, handleNextPage, handlePageClick, show, handleshowChange, totalPost , showSeeAll = false , showPagination = false}) {
    return (
        <div className="row">
            {posts.length > 0 ? (
                <>

                    {posts.map((post, index) => (
                        <BlogPost key={post.id || index} {...post} />
                    ))}
                    {
                        showSeeAll && (
                            <div className="col-12">
                                <Link to="/articles">Show All</Link>
                            </div>
                        )
                    }


                    {
                        showPagination && (
                            <div className="col-12">
                                <Pagination
                                    page={page}
                                    totalPages={totalPages}
                                    handlePreviousPage={handlePreviousPage}
                                    handleNextPage={handleNextPage}
                                    handlePageClick={handlePageClick}
                                    show={show}
                                    handleshowChange={handleshowChange}
                                    totalPost={totalPost}
                                />
                            </div>
                        )
                    }


                </>
            ) : <ArticlesSkeleton number={6}/>}
        </div>
    );
}

export default BlogList;