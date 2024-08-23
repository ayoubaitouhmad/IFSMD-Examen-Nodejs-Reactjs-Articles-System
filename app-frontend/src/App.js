import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import axios from 'axios';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/upload" element={<ImageUpload />} />
                    <Route path="/login" element={<AuthLayout />} />
                    <Route path="/*" element={<ProtectedRoute element={<MainLayout />} />} />
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

const NotFound = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1">404</h1>
                <p className="lead">Page not found</p>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        </div>
    );
};

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('http://localhost:1000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully', res.data);
        } catch (err) {
            console.error('Error uploading file', err);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" style={{ width: '200px', height: '200px' }} />}
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default App;
