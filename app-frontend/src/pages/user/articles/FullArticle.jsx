import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {getPost, incrementViews} from "../../../services/postService";
import LoadingOverlay from "../../../components/LoadingOverlay/loadingOverlay";
import frontendRoute from "../../../utils/frontendRoute";
import Breadcrumb from "../../../utils/breadcrumb";
import route from "../../../utils/route";
import {destroyCacheData, getCacheData, hasCacheData, setCacheData} from "../../../utils/storage";
import {getAll} from "../../../services/categoryService";
import CollapsiblePanel from "../../../components/CollapsiblePanel/collapsiblePanel";
import CategoriesList from "../../../components/categoriesList/categoriesList";
import SearchCard from "../../../components/Articles/searchCard/SearchCard";

function FullArticle() {
    const {id} = useParams();
    const [article, setArticle] = useState(null);










    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(id);
                await incrementViews(id);

                setArticle(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
            }
        };
        fetchPost();
    }, []);

    if (!article) {
        return <LoadingOverlay/>;
    }

    const breadcrumbItems = [
        {name: 'Home', href: frontendRoute('home')},
        {name: 'Articles', href: frontendRoute('articles')},
        {name: article.title, active: true}
    ];


    return (

        <div>
            <Breadcrumb items={breadcrumbItems}/>
            <div className="row">
                <div className="col-12 col-md-9">
                    <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">
                                {article.title}
                            </h1>
                            <div className="text-muted fst-italic mb-2">
                                {article.description ?? "Posted on January 1, 2023 by Start Bootstrap"}

                            </div>
                            {
                                article.categories.map((category, index) => (
                                    <Link to={frontendRoute('categoryArticles', {
                                        id: category.id, name: category.name
                                    })} key={index} className="badge badge-info  text-decoration-none mr-1">
                                        {category.name}
                                    </Link>
                                ))
                            }
                        </header>
                        <figure className="mb-4">


                            <img
                                className="img-fluid rounded"
                                src={route('streamImage', {
                                    'image': article.articleImage.filePath
                                })}

                                alt="Post preview"
                            />
                        </figure>
                        <section dangerouslySetInnerHTML={{__html: article.content}} className="mb-5">


                        </section>
                    </article>
                </div>
                <div className="col-12 col-md-3 ">
                    <div className="row">

                        <div className="col-6 col-sm-12">
                            <SearchCard/>
                        </div>
                        <div className="col-6 col-sm-12">
                           <CategoriesList />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}



export default FullArticle;