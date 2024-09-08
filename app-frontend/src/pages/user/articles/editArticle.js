import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useNavigate, useParams} from 'react-router-dom';
import {editPost} from '../../../services/postService';
import route from '../../../utils/route';
import axiosInstance from "../../../utils/axios";
import Select from 'react-select';
import {getAll} from '../../../services/categoryService';
import {useAuth} from "../../../contexts/AuthContext";
import LoadingOverlay from "../../../components/LoadingOverlay/loadingOverlay";

function EditArticle() {
    const {id} = useParams();
    const [preview, setPreview] = useState(null);
    const [alert, setAlert] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        title: '',
        image: '',
        description: '',
        content: '',
        categories: [], // Initialize categories as an empty array
    });
    const [loading, setLoading] = useState(false);


    const {user} = useAuth();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articleData = await editPost(id);
                if (articleData) {
                    setLoading(true);
                }
                setPreview(route('streamImage', {
                    image: articleData.articleImage.filePath,
                    width: 600,
                    height: 600,
                }));
                setInitialValues({
                    title: articleData.title,
                    image: articleData.image,
                    description: articleData.description,
                    content: articleData.content,
                    categories: articleData.categories.map(cat => ({label: cat.name, value: cat.id})),
                });


            } catch (error) {
                if (error.response && error.response.status) {
                    navigate('/' + error.response.status);
                }
            }
        };

        const fetchCategories = async () => {
            const data = await getAll();
            const formattedCategories = data.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setCategories(formattedCategories);
        };

        fetchArticle();
        fetchCategories();
    }, [id]);


    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            image: Yup.mixed()
                .nullable()
                .test(
                    "fileSize",
                    "File is too large",
                    value => value ? value.size <= 1024 * 1024 : true
                )
                .test(
                    "fileFormat",
                    "Unsupported Format",
                    value => value ? ["image/jpeg", "image/png"].includes(value.type) : true
                ),
            description: Yup.string().required('Description is required'),
            content: Yup.string().required('Content is required'),
            categories: Yup.array().min(1, 'At least one category is required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('image', values.image);
            formData.append('description', values.description);
            formData.append('content', values.content);
            formData.append('categories', JSON.stringify(values.categories.map(cat => cat.value)));

            try {
                const response = await axiosInstance.put(route('updateArticle', {id: id}), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const alertData = response.data.alert;
                if (response.data.alert) {
                    setAlert(alertData);
                    setTimeout(() => {
                        setAlert(null);
                    },8000)
                }
            } catch (error) {
                console.error('Error submitting article:', error);
                if (error.response && error.response.status) {
                    navigate('/' + error.response.status);
                }
            }
        },
    });


    if (!loading) {
        return <LoadingOverlay/>
    }

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('image', file);
        setPreview(URL.createObjectURL(file));
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
                    {alert && (
                        <div className={` alert alert-${alert.type}`} role="alert">
                            <strong>{alert.title}</strong> {alert.body}
                        </div>
                    )}

                    <h2>Edit article</h2>


                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div className="col-12 form-group">
                                <label className="required-field" htmlFor="image">Image</label>
                                <div className="image-container d-block">
                                    {preview &&
                                        <img src={preview} alt="Preview" className="dsfdsfdsfdsf rounded-circle mb-3"/>}
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
                                />
                                {formik.errors.description && formik.touched.description && (
                                    <div className="text-danger">{formik.errors.description}</div>
                                )}
                            </div>

                            <div className="col-12 form-group">
                                <label className="required-field" htmlFor="categories">Categories</label>
                                <Select
                                    id="categories"
                                    isMulti
                                    options={categories}
                                    value={formik.values.categories}
                                    onChange={(selectedOptions) => formik.setFieldValue('categories', selectedOptions)}
                                />
                                {formik.errors.categories && formik.touched.categories && (
                                    <div className="text-danger">{formik.errors.categories}</div>
                                )}
                            </div>

                            <div className="col-12 form-group">
                                <label className="required-field" htmlFor="content">Content</label>
                                <ReactQuill
                                    theme="snow"
                                    value={formik.values.content}
                                    onChange={(value) => formik.setFieldValue('content', value)}
                                    placeholder="Enter post content"
                                    style={{height: 250}}
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
