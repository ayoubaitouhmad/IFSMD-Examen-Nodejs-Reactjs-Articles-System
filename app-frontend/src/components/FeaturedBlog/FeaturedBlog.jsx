import React, {useEffect, useState} from 'react';
import {getPost, getPosts} from "../../services/postService";


function FeaturedBlog() {

    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const data = await getPost(2);
            setArticle(data);

        };
        fetchPost();
    }, []); // Runs once when the component mounts




    return (
        <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark ">
            <div className="col-md-6 px-0 ">
                {article && (
                    <>
                        <h1 className="display-4 font-italic">
                            {article.title}
                        </h1>
                        <p className="lead my-3">
                            {article.description}
                        </p>
                        <p className="lead mb-0">
                            <a href="#" className="text-white font-weight-bold">Continue reading...</a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );

}

export default FeaturedBlog;