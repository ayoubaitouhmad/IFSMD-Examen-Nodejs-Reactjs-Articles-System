import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getUserArticles, getUserById, getUserByUsername} from "../../../services/userService";
import LoadingOverlay from "../../../components/LoadingOverlay/loadingOverlay";
import AuthorArticle from "../../../components/Articles/AuthorArticle";


function AuthorArticles() {
    const {username} = useParams();

    const [author, setAuthor] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPost, setTotalPost] = useState(1);

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



    useEffect(() => {
        const fetchAuthorAndArticles = async () => {
            try {
                const authorData = await getUserByUsername(username);
                setAuthor(authorData);
                if (authorData) {
                    const articlesData = await getUserArticles(authorData.id , page);
                    setArticles(articlesData.articles);
                    setTotalPages(articlesData.totalPages);
                    setTotalPost(articlesData.totalPosts);
                }
            } catch (error) {
                console.error("Error fetching author or articles:", error);
            } finally {

                setLoading(false);
            }
        };

        fetchAuthorAndArticles();
    }, [username , page]);
    const PostsList = () => {
        if (articles.length === 0) {
            return (
                <div className="pt-5 no-articles-container text-center">
                    <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>
                    <h4 className="text-muted">No articles found for this author</h4>
                    <p className="text-muted">It seems like this author hasn't written any articles yet.</p>
                </div>
            );
        }

        return (
            <div className=" ">
                <h3> Posts by {author.name} </h3>
                {articles.map((post, index) => (
                    <PostItem key={index} {...post} />
                ))}
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
                </nav>
            </div>
        );
    };

    const PostItem = (post) => {

        const lastArticle = articles.slice(-1)[0];
        return (
            <AuthorArticle {...post} isLastArticle={lastArticle.id==post.id}/>
        );
    };


    if (loading) {
        return <LoadingOverlay />;
    }






    return (
        <div>

            <div className="row border-bottom pb-5">
                <div className="col-md-3 text-center">
                    <img
                        src="https://images.top10.com/f_auto,q_auto/v1/production/authors/uploads/photo/Frame1968.20240603103350.png"
                        alt="Profile"
                        className="rounded-circle img-fluid border border-danger"
                    />
                </div>
                <div className="col-md-9">
                    <h1>
                        {author.name}
                    </h1>

                    <h4>
                        {author.email}
                    </h4>

                    <p>

                        {author.bio}

                    </p>

                    <div>
                        <a href="#" className="btn btn-outline-secondary mr-2">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="btn btn-outline-secondary mr-2">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="btn btn-outline-secondary">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>

                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-9 ">
                    <PostsList />

                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Master the art of making better choices</h5>
                            <p className="card-text">Read this post!</p>
                        </div>
                        <img
                            className="card-img-bottom"
                            src="https://via.placeholder.com/150"
                            alt="Ad"
                        />
                    </div>
                </div>
            </div>
        </div>


    );
}


export default AuthorArticles;