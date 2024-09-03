import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {getPost, incrementViews} from "../../../services/postService";
import LoadingOverlay from "../../../components/LoadingOverlay/loadingOverlay";
import frontendRoute from "../../../utils/frontendRoute";
import Breadcrumb from "../../../utils/breadcrumb";
import route from "../../../utils/route";
import {getCacheData, hasCacheData, setCacheData} from "../../../utils/storage";
import {getAll} from "../../../services/categoryService";
import CollapsiblePanel from "../../../components/CollapsiblePanel/collapsiblePanel";

function FullArticle() {
    const {id} = useParams();
    const [article, setArticle] = useState(null);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState();
    const navigate = useNavigate();




    useEffect(() => {
        if (!hasCacheData('categories')) {
            console.log("2")
            const fetchCategories = async () => {
                try {
                    const data = await getAll([
                        {
                            withArticlesCount: true
                        }
                    ]);
                    setCategories(data);
                    setCacheData('categories', data)
                } catch (error) {
                    console.error('Failed to fetch post:', error);
                }
            };
            fetchCategories();
        } else {
            console.log("3")
            console.log(getCacheData('categories'))
            setCategories(getCacheData('categories'));

        }
    }, []);


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
                            <div className="card mb-4">
                                <div className="card-header">Search</div>
                                <div className="card-body">
                                    <div className="input-group">
                                        <input
                                            onChange={(e) => setSearch(e.target.value)}
                                            value={search}
                                            className="form-control" type="text" placeholder="Enter search term..."
                                            aria-label="Enter search term..." aria-describedby="button-search"/>
                                        <button
                                            onClick={(e) => navigate(frontendRoute('articlesSearch', {search}))}
                                            className="btn btn-primary" id="button-search" type="button">Go!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-12">
                            <CollapsiblePanel title="Categories">
                                <ul className="list-unstyled mb-0">
                                    {
                                        categories.map((category, index) => (
                                            <li key={index} className={'mb-2'}>
                                                <Link to={frontendRoute('categoryArticles', {
                                                    id: category.id,
                                                    name: category.name
                                                })}>
                                                    <span className={'text-muted mr-2'}>{category.name}</span>
                                                    <span className={'text-primary'}>({category.id})</span>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </CollapsiblePanel>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}



export default FullArticle;