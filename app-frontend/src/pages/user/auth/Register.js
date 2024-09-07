import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useAuth} from "../../../contexts/AuthContext"; // Adjust the import path as necessary
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import route from "../../../utils/route";

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required"),
    username: Yup.string()
        .required("Username is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
});

const Register = () => {
    const {setToken, login} = useAuth();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting, setErrors, resetForm}) => {
            try {
                const response = await axios.post(route('register'), {
                    name: values.name,
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                });


                const alert = response.data.alert;
                if (alert) {
                    setAlert(alert);
                    resetForm();
                    setTimeout(() => {
                        setAlert(null);
                    }, 9000);
                }


            } catch (error) {

                console.error("Registration failed:", error);
                setErrors({email: "Registration failed. Please try again."});
                setToken(null);
                localStorage.removeItem("token");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="">
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">

                    <div className="col-10 col-sm-9 col-md-5">


                        <form onSubmit={formik.handleSubmit} className="">
                            <div className="text-center mb-4">
                                <Logo width={300} height={80}/>
                            </div>

                            {alert && (
                                <div className={`alert alert-${alert.type}`} role="alert">
                                    <strong>{alert.title}</strong> {alert.body}
                                </div>
                            )}


                            <div className="form-label-group mb-3">
                                <label className="required-field" htmlFor="inputName">Name</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Name"
                                    {...formik.getFieldProps('name')}
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="invalid-feedback">{formik.errors.name}</div>
                                ) : null}
                            </div>

                            <div className="form-label-group mb-3">
                                <label className="required-field" htmlFor="inputUsername">username</label>
                                <input
                                    type="text"
                                    id="inputUsername"
                                    className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                                    placeholder="username"
                                    {...formik.getFieldProps('username')}
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div className="invalid-feedback">{formik.errors.name}</div>
                                ) : null}
                            </div>


                            <div className="form-label-group mb-3">
                                <label className="required-field" htmlFor="inputEmail">Email address</label>
                                <input
                                    type="email"
                                    id="inputEmail"
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email address"
                                    {...formik.getFieldProps('email')}
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="invalid-feedback">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div className="form-label-group mb-3">
                                <label className="required-field" htmlFor="inputPassword">Password</label>
                                <input
                                    type="password"
                                    id="inputPassword"
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <div className="form-label-group mb-3">
                                <label className="required-field" htmlFor="inputConfirmPassword">Confirm
                                    Password</label>
                                <input
                                    type="password"
                                    id="inputConfirmPassword"
                                    className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                                    placeholder="Confirm Password"
                                    {...formik.getFieldProps('confirmPassword')}
                                    disabled={formik.isSubmitting}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>

                            <button className="btn btn-lg btn-primary btn-block" type="submit"
                                    disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? "Registering..." : "Register"}
                            </button>

                            <p className="mt-3 mb-3 text-muted text-center">
                                <p className="mt-3 mb-3  ">
                                    Already have an account?
                                    <Link to={'/login'}> Sign in </Link>
                                </p>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
