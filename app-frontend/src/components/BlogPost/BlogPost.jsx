import React, {useState} from 'react';
import { useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import route from "../../utils/route";



function BlogPost({id, title ,content , createdAt  , description  , authorId , articleImage} ) {
    console.log(
        articleImage
    )
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    let createdAtF =  new Date(createdAt).toLocaleDateString('en-US', options);

    useEffect(() => {
        if (show) {
            navigate(`/articles/${id}/${title.replaceAll(' ', '-')}`);
        }
    }, [ show]);
    function handleBlogPostClick() {
        setShow(true);
    }

    function contentAsHtml(){

    }
    return (

        <div className="col-12 col-sm-6 col-xl-4" onClick={handleBlogPostClick} >
            <div className="card mb-4 box-shadow">
                <img
                    className="img card-img-top"
                    src={route('streamImage' , {image:articleImage.filePath})}
                    alt="Card cap"
                />
                <div className="card-body">
                    <h3>{title}</h3>
                    <p className="card-text" >{ description }</p>
                    <div className="">

                        <p className="p-0 m-0">
                            <Link to={`/articles/author/${authorId.username}`} >
                                {authorId.username}
                            </Link>
                        </p>

                        <small className="text-muted">{createdAtF}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;