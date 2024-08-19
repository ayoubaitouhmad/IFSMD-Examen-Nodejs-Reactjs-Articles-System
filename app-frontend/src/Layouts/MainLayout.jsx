import React from 'react';
import Header from "../components/Layouts/Header/Header";
import {Route, Routes} from "react-router-dom";

import Logout from "../pages/user/auth/Logout";
import AllPosts from "../pages/user/articles/AllArticles";
import AddArticle from "../pages/user/articles/AddArticle";
import SearchPosts from "../pages/user/articles/SearchArticles";
import FullArticle from "../pages/user/articles/FullArticle";
import Footer from "../components/Layouts/Footer/Footer";
import Home from "../pages/user/Home";



function MainLayout() {
    return (
        <div className="container">
            <Header/>
            <div className="row">
                <Routes>
                    <Route path="/home" element={<Home/>}/>

                    <Route path="/articles" element={<AllPosts/>}/>
                    <Route path="/articles/add" element={<AddArticle/>}/>
                    <Route path="/articles/search" element={<SearchPosts/>}/>
                    <Route path="/articles/:id/:name" element={<FullArticle/>}/>


                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default MainLayout;