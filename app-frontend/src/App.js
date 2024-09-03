import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import axios from 'axios';
import Logo from "./components/Logo/Logo";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/upload" element={<ImageUpload />} />
                    <Route path="/login" element={<AuthLayout />} />
                    <Route path="/*" element={<ProtectedRoute element={<MainLayout />} />} />
                    <Route path="/c" element={<Sad/>}/>
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};


const Sad = ()  => (
    <div className="container ">
        <div className="row justify-content-center align-items-center vh-100 ">
            <div className="col-10 col-sm-9 col-md-5 ">
                <form className="  ">
                    <div className="text-center mb-4">
                        <Logo width={300} height={80}/>
                    </div>

                    <div className="form-label-group mb-3">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus=""/>
                    </div>

                    <div className="form-label-group mb-3">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

                    <p className="mt-5 mb-3 text-muted text-center">
                        ©2017-2018
                    </p>
                </form>
            </div>
        </div>
    </div>


);


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
            <input type="file" onChange={handleFileChange}/>
            {preview && <img src={preview} alt="Preview" style={{width: '200px', height: '200px'}}/>}
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default App;
