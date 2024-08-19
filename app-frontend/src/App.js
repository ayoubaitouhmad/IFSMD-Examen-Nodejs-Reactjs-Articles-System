import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import SearchPosts from "./pages/SearchPosts";
import BlogPost from "./pages/BlogPost";
import Login from "./components/LoginForm";
import {AuthContext, AuthProvider} from "./components/AuthContext";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {


    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Routes for authentication layout */}
                    <Route path="/login" element={<LoginLayout/>}/>

                    {/* Routes for main layout */}
                    <Route path="/*" element={<ProtectedRoute element={<MainLayout/>}/>}/>

                </Routes>
            </Router>
        </AuthProvider>
    );
};

// Layout for pages that do not need header and footer (e.g., Login/Register)
const LoginLayout = () => {
    return (<div className="auth-container">
        <Login/>
    </div>);
};

// Layout for main pages that include header and footer
const MainLayout = () => (
    <div className="container">
        <Header/>
        <div className="row">
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/posts" element={<AllPosts/>}/>
                <Route path="/posts/add" element={<AddPost/>}/>
                <Route path="/posts/search" element={<SearchPosts/>}/>
                <Route path="/posts/:id/:name" element={<BlogPost/>}/>
            </Routes>
        </div>
        <Footer/>
    </div>
);

export default App;
