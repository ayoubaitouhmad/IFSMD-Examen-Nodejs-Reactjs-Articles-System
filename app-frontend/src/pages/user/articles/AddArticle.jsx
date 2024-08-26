import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate,useParams} from 'react-router-dom';
import {getPost} from '../../../services/postService';
import route from '../../../utils/route';
import axiosInstance from "../../../utils/axios";
import frontendRoute from "../../../utils/frontendRoute";

function EditArticle(props) {
    const {id} = useParams();
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate


    const [initialValues, setInitialValues] = useState({
        title: '',
        image: '',
        description: '',
        content: '',
    });

    const formik = useFormik(
        {
            initialValues,
            enableReinitialize: true, // Reinitialize the form when initialValues change
            validationSchema: Yup.object({
                title: Yup.string().required('Title is required'),
                image: Yup.mixed()
                    .nullable()
                    .test(
                        "fileSize",
                        "File is too large",
                        value => value ? value.size <= 1024 * 1024 : true // 1MB size limit
                    )
                    .test(
                        "fileFormat",
                        "Unsupported Format",
                        value => value ? ["image/jpeg", "image/png"].includes(value.type) : true
                    ),

                description: Yup.string().required('Description is required'),
                content: Yup.string().required('Content is required'),
            }),
            onSubmit: async (values) => {
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('image', values.image);
                formData.append('description', values.description);
                formData.append('content', values.content);

                console.log(

                    values
                )

                try {
                    const response = await axiosInstance.post(route('addArticle'), formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('Article submitted successfully:', response.data);
                    navigate(frontendRoute('editArticle' , {id:response.data.id}))
                } catch (error) {
                    console.error('Error submitting article:', error);
                    if (error.response && error.response.status === 404) {
                        navigate('/404'); // Redirect to 404 page
                    }
                }
            },
        });



    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('image', file);
        setPreview(URL.createObjectURL(file)); // Update the preview state with the selected image
    };

    return (
        <>
            <div className="pb-1 w-100">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#">Library</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>
            </div>
            <div className="card">
                <div className="card-body">
                    <h2>Edit article</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">

                            <div className="col-12 form-group">
                                <label className="" htmlFor="image">Image</label>
                                <div className="image-container d-block">
                                    {preview && <img src={preview} alt="Preview"
                                                     className="shadow border rounded-circle mb-3"/>}
                                </div>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                {formik.errors.image && formik.touched.image && (
                                    <div className="text-danger">{formik.errors.image}</div>
                                )}
                            </div>

                            <div className="col-12 form-group">
                                <label className="required-field" htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder="Enter post title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                />
                                {formik.errors.title && formik.touched.title && (
                                    <div className="text-danger">{formik.errors.title}</div>
                                )}
                            </div>

                            <div className="col-12 form-group">
                                <label className="required-field" htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    rows="2"
                                    placeholder="Enter post description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                />
                                {formik.errors.description && formik.touched.description && (
                                    <div className="text-danger">{formik.errors.description}</div>
                                )}
                            </div>

                            <div className="col-12 form-group">
                                <label className="required-field" htmlFor="content">Content</label>
                                <ReactQuill
                                    value={formik.values.content}
                                    onChange={(value) => formik.setFieldValue('content', value)}
                                    placeholder="Enter post content"
                                    style={{height: '200px'}}
                                    modules={{
                                        toolbar: [
                                            [{'header': '1'}, {'header': '2'}, {'font': []}],
                                            [{size: []}],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{'list': 'ordered'}, {'list': 'bullet'}],
                                            ['link', 'image', 'video'],
                                            ['clean'],
                                        ],
                                    }}
                                    formats={[
                                        'header', 'font', 'size',
                                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                                        'list', 'bullet',
                                        'link', 'image', 'video',
                                    ]}
                                />
                                {formik.errors.content && formik.touched.content && (
                                    <div className="text-danger">{formik.errors.content}</div>
                                )}
                            </div>

                            <div className="col-12">
                                <button type="submit" className="mt-5 btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditArticle;
