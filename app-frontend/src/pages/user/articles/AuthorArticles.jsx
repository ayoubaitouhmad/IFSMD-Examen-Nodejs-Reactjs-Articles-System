import React, { useEffect, useState } from 'react';
import { Link, useParams ,useNavigate  } from 'react-router-dom';
import { getUserArticles, getUserByUsername } from '../../../services/userService';
import LoadingOverlay from '../../../components/LoadingOverlay/loadingOverlay';
import AuthorArticle from '../../../components/Articles/AuthorArticle';

function AuthorArticles() {
    const { username } = useParams();
    const navigate = useNavigate ();

    const [author, setAuthor] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPost, setTotalPost] = useState(0);

    useEffect(() => {
        const fetchAuthorAndArticles = async () => {
            setLoading(true);
            try {
                const authorData = await getUserByUsername(username);

                if (!authorData) {
                    navigate('/404'); // Redirect to 404 if author not found
                    return;
                }


                setAuthor(authorData);
                const articlesData = await getUserArticles(authorData.id, page);
                setArticles(articlesData.articles);
                setTotalPages(articlesData.totalPages);
                setTotalPost(articlesData.totalPosts);
            } catch (error) {
                navigate('/404');
                console.error('Error fetching author or articles:', error);
            } finally {

                setLoading(false);
            }
        };

        fetchAuthorAndArticles();
    }, [username, page]);

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

    if (loading) {
        return <LoadingOverlay />;
    }

    if (!author ) {
        // redirect to 404
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
                    <h1>{author?.name}</h1>
                    <h4>{author?.email}</h4>
                    <p>{author?.bio}</p>
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
                <div className="col-md-9">
                    <PostsList
                        articles={articles}
                        author={author}
                        page={page}
                        totalPages={totalPages}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                        handlePageClick={handlePageClick}
                    />
                </div>
                <div className="col-md-3">
                    <AdCard />
                </div>
            </div>
        </div>
    );
}

const PostsList = ({ articles, author, page, totalPages, handlePreviousPage, handleNextPage, handlePageClick }) => {
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
        <div>
            <h3>Posts by {author?.name}</h3>
            {articles.map((post) => (
                <PostItem key={post.id} post={post} isLastArticle={articles[articles.length - 1].id === post.id} />
            ))}
            <Pagination
                page={page}
                totalPages={totalPages}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                handlePageClick={handlePageClick}
            />
        </div>
    );
};

const PostItem = ({ post, isLastArticle }) => (
    <AuthorArticle {...post} isLastArticle={isLastArticle} />
);

const Pagination = ({ page, totalPages, handlePreviousPage, handleNextPage, handlePageClick }) => (
    <nav className={totalPages === 0 ? 'd-none' : ''} aria-label="Page navigation example">
        <ul className="pagination float-left">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePreviousPage}>
                    Previous
                </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(i + 1)}>
                        {i + 1}
                    </button>
                </li>
            ))}
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleNextPage}>
                    Next
                </button>
            </li>
        </ul>
    </nav>
);

const AdCard = () => (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Master the art of making better choices</h5>
            <p className="card-text">Read this post!</p>
        </div>
        <img className="card-img-bottom" src="https://via.placeholder.com/150" alt="Ad" />
    </div>
);

export default AuthorArticles;
