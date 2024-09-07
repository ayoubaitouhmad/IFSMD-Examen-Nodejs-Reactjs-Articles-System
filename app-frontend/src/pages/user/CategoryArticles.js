import React, {useEffect, useState} from "react";
import Breadcrumb from "../../utils/breadcrumb";
import frontendRoute from "../../utils/frontendRoute";
import {getCategoryArticles} from "../../services/categoryService";
import {useParams} from "react-router-dom";
import NoPostsFound from "../../components/BlogList/NoPostsFound";
import BlogList from "../../components/BlogList/BlogList";


function CategoryArticles() {

    const {id} = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const articlesData = await getCategoryArticles(id);
            console.log(
                articlesData
            )
            setArticles(articlesData.articles);
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
