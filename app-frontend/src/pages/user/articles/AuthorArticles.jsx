import React, { useEffect, useState } from 'react';
import { Link, useParams ,useNavigate  } from 'react-router-dom';
import { getUserArticles, getUserByUsername } from '../../../services/userService';
import LoadingOverlay from '../../../components/LoadingOverlay/loadingOverlay';
import AuthorArticle from '../../../components/Articles/AuthorArticle';
import route from "../../../utils/route";
import {useAuth} from "../../../contexts/AuthContext";
import loadImageFile from "react-avatar-editor/src/utils/load-image-file";

function AuthorArticles() {
    const {user} = useAuth();
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
                // navigate('/404');
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
    console.log(articles)




    const PostsList = ({articles, author, page, totalPages, handlePreviousPage, handleNextPage, handlePageClick}) => {
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
                {articles.map((post) => (

                    <AuthorArticle key={post.id} {...post} canEdit={author.id === user.id} isLastArticle={articles[articles.length - 1].id === post.id} />
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



    const Pagination = ({page, totalPages, handlePreviousPage, handleNextPage, handlePageClick}) => (
        <nav className={totalPages === 0 ? 'd-none' : ''} aria-label="Page navigation example">
            <ul className="pagination float-left">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePreviousPage}>
                        Previous
                    </button>
                </li>
                {Array.from({length: totalPages}, (_, i) => (
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
        <div className="card mt-5 ">
            <div className="card-body">
                <h5 className="card-title">Master the art of making better choices</h5>
                <p className="card-text">Read this post!</p>
            </div>
            <img className="card-img-bottom" src="https://via.placeholder.com/150" alt="Ad"/>
        </div>
    );


    return (
        <div>
            <div className="pb-1 w-100">
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


            <div className="row border-bottom pb-3 ">
                <div className="col-7 row">
                    <div className="col-3 text-center">
                        <div className="">
                            <img
                                height={150} width={150}
                                src={route('streamImage', {image: author?.profileImage?.filePath})}
                                alt="Profile"
                                className="rounded-circle  shadow"
                            />
                        </div>

                    </div>
                    <div className="col-9">
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
                <div className="col-5">
                    <div className="row pt-4">
                        <div className="col-6 mb-2 ">
                            <div className="card text-white bg-dark o-hidden">
                                <div className="card-body">
                                    <div className="card-body-icon">
                                        <i className="fa-solid fa-newspaper"></i>
                                    </div>
                                    <div className="mr-5">{totalPost} Articles</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 mb-2 ">
                            <div className="card text-white bg-dark o-hidden">
                                <div className="card-body">
                                    <div className="card-body-icon">
                                        <i className="fa-solid fa-eye"></i>
                                    </div>
                                    <div className="mr-5">189 Reader</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 mb-2 ">
                            <div className="card text-white bg-dark o-hidden">
                                <div className="card-body">
                                    <div className="card-body-icon">
                                        <i className="fa-solid fa-calendar-days"></i>
                                    </div>
                                    <div className="mr-5">
                                        {author.createdAt}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>


            <div className="row bg-light mt-3">
                <div className="col-12">
                    <nav className="">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home"
                               role="tab" aria-controls="nav-home" aria-selected="true">
                                Posts
                            </a>
                            <a className="nav-item nav-link" id="nav-books-tab" data-toggle="tab" href="#nav-books"
                               role="tab" aria-controls="nav-books" aria-selected="false">INFOS</a>
                            <a className="nav-item nav-link" id="nav-lists-tab" data-toggle="tab" href="#nav-lists"
                               role="tab" aria-controls="nav-lists" aria-selected="false">Lists</a>
                            <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about"
                               role="tab" aria-controls="nav-about" aria-selected="false">About</a>
                        </div>
                    </nav>
                    <div className="tab-content bg-light" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                             aria-labelledby="nav-home-tab">

                            <div className="row ">
                                <div className="col-9">
                                    <div className="mt-3  d-flex justify-content-between align-items-center">
                                        <div className="">
                                            Posts by {author?.name}
                                        </div>
                                        <div className="">
                                            <button type="button" className="btn btn-sm btn-outline-success">
                                                Add
                                            </button>
                                        </div>
                                    </div>
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
                                <div className="col-3">
                                    <AdCard/>
                                </div>
                            </div>


                        </div>
                        <div className="tab-pane fade" id="nav-books" role="tabpanel" aria-labelledby="nav-books-tab">
                            {/* Books content */}
                            <p>Content for Books tab goes here.</p>
                        </div>
                        <div className="tab-pane fade" id="nav-lists" role="tabpanel" aria-labelledby="nav-lists-tab">
                            {/* Lists content */}
                            <p>Content for Lists tab goes here.</p>
                        </div>
                        <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                            {/* About content */}
                            <p>Content for About tab goes here.</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default AuthorArticles;
