import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../contexts/AuthContext";
import route from "../../utils/route";


const ProfilePage = () => {
    const { user, setUser , updateUser } = useAuth();

    let userAvatar = route('streamImage' , {'image' :user.profileImage.filePath});


    const [preview, setPreview] = useState(userAvatar);
    const [alert , setAlert] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            bio: user.bio,
            file: preview,  // For handling the file upload
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(4, "Username must be at least 4 characters long")
                .required("Username is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            bio: Yup.string(),
            file: Yup.mixed()
                .optional("Avatar is required")
                // .test(
                //     "fileFormat",
                //     "Unsupported Format",
                //     value => value && ["image/jpeg", "image/png"].includes(value.type)
                // )
                // .test(
                //     "fileSize",
                //     "File is too large",
                //     value => value && value.size <= 1048576 // 1MB
                // ),
        }),
        onSubmit: async (values) => {
            const uploadFormData = new FormData();
            uploadFormData.append('image', values.file);
            uploadFormData.append('name', values.name);
            uploadFormData.append('email', values.email);
            uploadFormData.append('bio', values.bio);

            try {
                const res = await axiosInstance.post(`http://localhost:1000/api/users/id/${user.id}/profile/update`, uploadFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                formik.setFieldValue('profilePicture', res.data.imageUrl);


                setAlert(res.data.alert);
                await updateUser();


                setTimeout(() => {
                    setAlert(null);
                }, 5000);

                console.log(res.data);
            } catch (err) {
                console.error('Error uploading file', err);
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file && file.type.startsWith('image/')) {
            formik.setFieldValue("file", file);
            setPreview(URL.createObjectURL(file));
        } else {

            formik.setFieldError("file", "The selected file is not an image");
            setPreview(`http://localhost:1000/api/uploads/${user.profileImage.filePath}`);
        }
    };



    return (
        <div className="container mt-5">

            {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    <strong>{alert.title}</strong> {alert.body}
                </div>
            )}
            <div className="row">
                <div className="col-md-4">
                    {formik.errors.file && formik.touched.file && (
                        <span className="text-danger">{formik.errors.file}</span>
                    )}
                    <div className="text-center">
                        <div className="position-relative">
                            <img
                                src={preview}
                                alt="Profile"
                                className="img-fluid rounded-circle mb-3"
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
                                name="file"
                                onChange={handleFileChange}
                                className="d-none "
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <p className="text-left bg-light">
                        {formik.values.bio}
                    </p>
                </div>
                <div className="col-md-8">

                    <h4>Edit Profile</h4>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label className="required-field" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.name && formik.touched.name && (
                                <span className="text-danger">{formik.errors.name}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="required-field" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <span className="text-danger">{formik.errors.email}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="required-field" htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                className="form-control"
                                rows="4"
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
