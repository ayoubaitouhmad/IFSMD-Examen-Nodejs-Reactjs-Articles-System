import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";

const App = () => {
    console.log(localStorage.getItem("token"))


    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<AuthLayout/>}/>
                    <Route path="/*" element={<ProtectedRoute element={<MainLayout/>}/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};


export default App;
