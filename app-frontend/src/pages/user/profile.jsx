import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axiosInstance from "../../utils/axios";
import {useAuth} from "../../contexts/AuthContext";
import route from "../../utils/route";
import LoadingOverlay from "../../components/LoadingOverlay/loadingOverlay";
import frontendRoute from "../../utils/frontendRoute";
import Breadcrumb from "../../utils/breadcrumb";
import {usePageTitle} from "../../utils/page";
import Modal from "../../components/Modal/Modal";
import {changePassword, sendResetPasswordEmail} from "../../services/userService";


const ProfilePage = () => {
    const {user, setUser, updateUser} = useAuth();
    const [visible, setVisible] = useState(false);
    const breadcrumbItems = [
        {name: 'Home', href: frontendRoute('home')},
        {name: 'Profile', href: frontendRoute('userProfile'), active: true}
    ];

    usePageTitle("Profile");

    let userAvatar = route('streamImage', {'image': user.profileImage.filePath});


    const [preview, setPreview] = useState(userAvatar);
    const [alert, setAlert] = useState(null);

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
            bio: Yup.string()
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

    const securityFormik = useFormik({
        initialValues: {
            oldPassword: null,
            newPassword: null,
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .required("Old password is required"),
            newPassword: Yup.string()
                .required("New password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await changePassword(values.oldPassword, values.newPassword);
                if(response.alert){
                    setAlert(response.alert);
                    setTimeout(() => {
                        setAlert(null);
                    }, 9000);
                }
            } catch (err) {
                console.error(err.response.data);
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

    if (!user) {
        return <LoadingOverlay/>;
    }

    const handleModalResult = async (userChoice) => {
        setVisible(false);
        if (userChoice) {
            const response = await sendResetPasswordEmail();
            if(response.alert){
                setAlert(response.alert);
                setTimeout(() => {
                    setAlert(null);
                }, 9000);
            }
        }

    };

    return (
        <>
            <Breadcrumb items={breadcrumbItems}/>
            {
                visible ? <Modal title="Are you sure you want to proceed?" setResult={handleModalResult}/> : ''
            }
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <h4>Edit Profile</h4>
                        </div>
                        <div className="col-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="">
                                    {alert && (
                                        <div className={`alert alert-${alert.type}`} role="alert">
                                            <strong>{alert.title}</strong> {alert.body}
                                        </div>
                                    )}
                                    {formik.errors.file && formik.touched.file && (
                                        <span className="text-danger">{formik.errors.file}</span>
                                    )}
                                    <div className="form-group">
                                        <label
                                            htmlFor="profilePicture"
                                            className=" "
                                        >
                                            Avatar
                                        </label>
                                        <div className="position-relative">
                                            <img
                                                src={preview}
                                                alt="Profile"
                                                className="img-fluid shadow rounded-circle mb-3"
                                                style={{width: '150px', height: '150px', objectFit: 'cover'}}
                                            />
                                            <label
                                                htmlFor="profilePicture"
                                                className="position-absolute "
                                                style={{
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

                                </div>
                                <div className="form-group">
                                    <label className="required-field" htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control "
                                        readOnly={true}
                                        disabled
                                        value={user.username}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="required-field" htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
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
                                    <label className="" htmlFor="bio">Bio</label>
                                    <textarea
                                        style={{height: '250px'}}
                                        id="bio"
                                        className="form-control"
                                        defaultValue={formik.values.bio}
                                        rows="4"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <h4>Security</h4>
                        </div>
                        <div className="col-8">

                            {alert && (
                                <div className={`alert alert-${alert.type}`} role="alert">
                                    <strong>{alert.title}</strong> {alert.body}
                                </div>
                            )}


                            <div className="form-group">
                                <label className="" htmlFor="username">Account Date</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control "
                                    disabled={true}
                                    value={user.createdAt}
                                />
                            </div>
                            <form onSubmit={securityFormik.handleSubmit}>


                                <div className="">
                                    <PasswordInput
                                        label={'Enter old password'}
                                        formik={securityFormik}
                                        name={"oldPassword"}
                                    />
                                    <PasswordInput
                                        label={'Enter New password'}
                                        formik={securityFormik}
                                        name={"newPassword"}
                                    />
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">
                                            change password
                                        </button>

                                    </div>
                                </div>


                            </form>

                            <div className="form-group mt-5">
                                <p>
                                    If you cant remember your old password , we will send you new one in your email
                                    <i className="mx-2 fa-solid fa-down-long text-muted"></i>
                                </p>
                                <button onClick={() => setVisible(prevState => !prevState)} type="button"
                                        className="btn btn-outline-danger">
                                    reset password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const PasswordInput = ({label, formik, name}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="form-group">
            <label className="" htmlFor="username">{label}</label>
            <div className="input-group mb-3">
                <input
                    id={name}
                    type={showPassword ? 'text' : "password"}
                    className="form-control"
                    placeholder="password"
                    aria-label="password"
                    aria-describedby="password"

                    value={formik.values[name] ?? undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                />
                <div className="input-group-prepend ">
                    <span className="input-group-text btn-outline-secondary"
                          onClick={() => setShowPassword(prevState => !prevState)}>
                        <i className={"fa-solid fa-eye" + (showPassword ? '' : '-slash')}></i>
                    </span>
                </div>
            </div>
            {formik.errors[name] && formik.touched[name] && (
                <span className="text-danger">{formik.errors[name]}</span>
            )}

        </div>
    );

};
export default ProfilePage;
