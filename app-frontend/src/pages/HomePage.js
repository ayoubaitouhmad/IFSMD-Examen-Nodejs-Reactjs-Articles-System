import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import FeaturedBlog from "../components/FeaturedBlog";
import axios from "axios";
import {getPosts} from "../services/postService";


function App() {



    useEffect(() => {

        const login = async () => {
            try {
                try {
                    const response = await axios.post('http://localhost:1000/api/login', {
                        email: 'user1@example.com',
                        password: 'password1',
                    });
                    console.log(response);
                }catch (e){
                    console.log(e);
                }

            } catch (error) {
                console.error('Login failed:', error);
            }
        };

        login();
    }, []); // Empty dependency array to run once when component mounts


    return (
        <>
            <FeaturedBlog/>
            <div className="row">
                <div className="col-10 row">
                    <div className="row">
                        <h1 className="col-12 pb-2">
                            Latest Posts
                        </h1>
                        <div className="col-12 col-md-6 col-xl-4 ">
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
                        <div className="col-12 col-md-6 col-xl-4 ">
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
                        <div className="col-12 col-md-6 col-xl-4 ">
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
                        <div className="col-12 col-md-6 col-xl-4 ">
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
                    <div className="row">
                        <h1 className="col-12 pb-2">
                            Latest Posts
                        </h1>
                        <div className="col-12 col-md-6 col-xl-4 ">
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
                        <div className="col-12 col-md-6 col-xl-4 ">
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
                        <div className="col-12 col-md-6 col-xl-4 ">
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
                        <div className="col-12 col-md-6 col-xl-4 ">
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
                </div>
                <div className="col-2 ">
                    <div className="p-3">
                        <h4 className="font-italic">Archives</h4>
                        <ol className="list-unstyled mb-0">
                            <li><a href="#">March 2014</a></li>
                            <li><a href="#">February 2014</a></li>
                            <li><a href="#">January 2014</a></li>
                            <li><a href="#">December 2013</a></li>
                            <li><a href="#">November 2013</a></li>
                            <li><a href="#">October 2013</a></li>
                            <li><a href="#">September 2013</a></li>
                            <li><a href="#">August 2013</a></li>
                            <li><a href="#">July 2013</a></li>
                            <li><a href="#">June 2013</a></li>
                            <li><a href="#">May 2013</a></li>
                            <li><a href="#">April 2013</a></li>
                        </ol>
                    </div>
                    <div className="p-3">
                        <h4 className="font-italic">Elsewhere</h4>
                        <ol className="list-unstyled">
                            <li><a href="#">GitHub</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Facebook</a></li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
