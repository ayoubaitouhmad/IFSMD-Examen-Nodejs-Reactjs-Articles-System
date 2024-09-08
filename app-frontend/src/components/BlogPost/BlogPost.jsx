import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import route from "../../utils/route";


function BlogPost({id, title, content, createdAt, description, author, articleImage, categories}) {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const options = {year: 'numeric', month: 'long', day: '2-digit'};
    let createdAtF = new Date(createdAt).toLocaleDateString('en-US', options);

    useEffect(() => {
        if (show) {
            navigate(`/articles/${id}/${title.replaceAll(' ', '-')}`);
        }
    }, [show]);

    function handleBlogPostClick() {
        setShow(true);
    }

    return (

        <div className="col-12 col-sm-6 col-xl-4" onClick={handleBlogPostClick}>

            <div className="card mb-4">
                <img
                    className="img card-img-top"

                    src={route('streamImage', {
                        image: articleImage.filePath,
                        height: 260,
                        width: 400
                    })}
                    alt="Card cap"
                />
                <div className="card-body">
                    {/*{*/}
                    {/*    categories.map((category,index) => (*/}
                    {/*        <Link key={index} to={frontendRoute('categoryArticles' , {id:category.id ,name:category.name.toLowerCase().replace(' ','-') })}*/}
                    {/*              className="badge badge-info  text-decoration-none mr-1">*/}
                    {/*            {category.name}*/}
                    {/*        </Link>*/}

                    {/*    ))*/}
                    {/*}*/}
                    <h3>{title}</h3>
                    <p className="card-text">{description}</p>
                    <div>
                        {
                            author ?
                                <p className="p-0 m-0">
                                    <Link to={`/articles/author/${author.username}`}>
                                        {author.username}
                                    </Link>
                                </p>
                                :
                                ''
                        }
                        <small className="text-muted">{createdAtF}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;