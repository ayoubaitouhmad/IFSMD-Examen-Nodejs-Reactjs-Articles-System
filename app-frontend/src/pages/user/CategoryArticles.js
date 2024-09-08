import React, {useEffect, useState} from "react";
import Breadcrumb from "../../utils/breadcrumb";
import frontendRoute from "../../utils/frontendRoute";
import {getCategoryArticles} from "../../services/categoryService";
import {useNavigate, useParams} from "react-router-dom";
import BlogList from "../../components/BlogList/BlogList";


function CategoryArticles() {

    const {id} = useParams();
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getCategoryArticles(id);
                console.log(
                    articlesData
                )
                setArticles(articlesData.articles);
            } catch (error) {
                console.error('Error fetching category:', error);
                if (error.response && error.response.status) {
                    navigate('/' + error.response.status);
                }
            }
        };
        fetchArticles();
    }, [id]);


    const breadcrumbItems = [
        {name: 'Home', href: frontendRoute('home')},
        {name: 'All Article', active: true}
    ];
    return (
        <>
            <Breadcrumb items={breadcrumbItems}/>
            <BlogList posts={articles}/>
        </>
    );
}

export default CategoryArticles;
