import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axios';
import Select from 'react-select';
import { getAll } from '../../../services/categoryService';
import route from "../../../utils/route";
import frontendRoute from "../../../utils/frontendRoute";

function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAll();
            const formattedCategories = data.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setCategories(formattedCategories);
        };
        fetchCategories();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '',
            image: '',
            description: '',
            content: '',
            categories: [], // Initialize categories as an empty array
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            image: Yup.mixed()
                .nullable()
                .test('fileSize', 'File is too large', (value) => value ? value.size <= 1024 * 1024 : true)
                .test('fileFormat', 'Unsupported Format', (value) => value ? ['image/jpeg', 'image/png'].includes(value.type) : true),
            description: Yup.string().required('Description is required'),
            content: Yup.string().required('Content is required'),
            categories: Yup.array().min(1, 'At least one category is required'), // Ensure at least one category is selected
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('image', values.image);
            formData.append('description', values.description);
            formData.append('content', values.content);
            formData.append('categories', JSON.stringify(values.categories.map(cat => cat.value)));

            try {
                const response = await axiosInstance.post(route('addArticle'), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                navigate(frontendRoute('editArticle' , {id:response.data.id}));
            } catch (error) {
                if (error.response?.status === 404) {
                    navigate('/404');
                }
            }
        },
    });

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('image', file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2>Edit article</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-12 form-group">
                            <label htmlFor="image">Image</label>
                            <div className="image-container d-block">
                                {preview && <img src={preview} alt="Preview" className="shadow border rounded-circle mb-3" />}
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
                            <label htmlFor="title" className="required-field">Title</label>
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
                            <label htmlFor="description" className="required-field">Description</label>
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
                            <label htmlFor="categories" className="required-field">Categories</label>
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
                            <label htmlFor="content" className="required-field">Content</label>
                            <ReactQuill
                                value={formik.values.content}
                                onChange={(value) => formik.setFieldValue('content', value)}
                                placeholder="Enter post content"
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                        [{ size: [] }],
                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
    );
}

export default EditArticle;
