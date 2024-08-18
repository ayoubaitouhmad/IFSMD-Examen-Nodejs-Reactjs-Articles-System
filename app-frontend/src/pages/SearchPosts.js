import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import React from "react";
import FeaturedBlog from "../components/FeaturedBlog";


function App() {
    return (
        <>
            <div className=" w-100">
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


            <div className="bg-light w-100 mb-2 mt-2">
                <span>We found 5 articles for you</span>
                <h3 className="section-title-left">Search results for : "Design"</h3>
            </div>
            <div className="row">


                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <img className="img card-img-top"
                             src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"/>

                        <div className="card-body">
                            <p className="card-text">This is a wider card with supporting text below as a
                                natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                                    </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </>
    );
}


export default App;
