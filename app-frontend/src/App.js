import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "././pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/addPost";
import SearchPosts from "./pages/SearchPosts";
import { BrowserRouter  } from 'react-router-dom';
import BlogPost from "./pages/BlogPost";




const App = () => {
    return (
        <div className="container">

            <Header/>
            <div className="row">
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/posts" element={<AllPosts/>}/>
                        <Route path="/posts/add" element={<AddPost/>}/>
                        <Route path="/posts/search" element={<SearchPosts/>}/>
                        <Route path="/posts/:id/:name" element={<BlogPost/>}/>
                    </Routes>
                </Router>
            </div>
            <Footer/>

        </div>
    );
};

export default App;
