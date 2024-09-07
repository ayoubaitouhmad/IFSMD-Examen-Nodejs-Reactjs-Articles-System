import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import axios from 'axios';
import Logo from "./components/Logo/Logo";
import Register from "./pages/user/auth/Register";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<AuthLayout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/*" element={<ProtectedRoute element={<MainLayout />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};




export default App;
