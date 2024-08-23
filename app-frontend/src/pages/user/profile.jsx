import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../utils/axios";

const ProfilePage = () => {
    const { user } = useAuth();
    // console.log(user)
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        bio: user.bio,
        profilePicture:`http://localhost:1000/api/uploads/${user.profileImage.filePath}` , // Initial profile picture
    });

    const [errors, setErrors] = useState({});


    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(formData.profilePicture);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));


    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);
        // If a new file is selected, upload it
        if (file) {
            try {
                const uploadFormData = new FormData();
                uploadFormData.append('image', file);
                uploadFormData.append('name', formData.name);
                uploadFormData.append('email', formData.email);
                uploadFormData.append('bio', formData.bio);

                const res = await axiosInstance.post(`http://localhost:1000/api/users/id/${user.id}/profile/update`, uploadFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // Assuming the response includes the new image URL
                setFormData({ ...formData, profilePicture: res.data.imageUrl });
                console.log('File uploaded successfully', res.data);
            } catch (err) {
                console.error('Error uploading file', err.response.data);
            }
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.name.trim()) {
            errors.name = 'Username is required';
        } else if (data.name.length < 4) {
            errors.name = 'Username must be at least 4 characters long';
        }

        if (!file) {
            errors.file = 'avatar  is required';
        }

        return errors;
    };


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    {
                        errors.file && (<span className="text-danger  ">{errors.file}</span>)
                    }
                    <div className="text-center  ">

                        <div className="position-relative">
                            <img
                                src={preview}
                                alt="Profile"
                                className="img-fluid rounded-circle mb-3 "
                                style={{width: '150px', height: '150px', objectFit: 'cover'}}
                            />
                            <label
                                htmlFor="profilePicture"
                                className="position-absolute "
                                style={{
                                    top: '65%',
                                    left: '65%',
                                    transform: 'translateX(-50%)',
                                    background: 'rgba(0,0,0)',
                                    color: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>
                                Edit
                            </label>
                            <input
                                type="file"
                                id="profilePicture"
                                onChange={handleFileChange}
                                className="d-none"
                            />
                        </div>


                    </div>


                    <p className="text-left bg-light ">
                        {formData.bio}
                    </p>


                    <div><a href="#" className="btn btn-outline-secondary mr-2"><i className="fab fa-twitter"></i></a><a
                        href="#" className="btn btn-outline-secondary mr-2"><i className="fab fa-facebook-f"></i></a><a
                        href="#" className="btn btn-outline-secondary"><i className="fab fa-linkedin-in"></i></a></div>
                </div>
                <div className="col-md-8">
                    <h4>Edit Profile</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                            {
                                errors.name && (<span className="text-danger  ">{errors.name}</span>)
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                className="form-control"
                                rows="4"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="button" className="btn btn-secondary ml-2">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
