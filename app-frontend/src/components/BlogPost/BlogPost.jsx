import React, {useState} from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";



function BlogPost({id, title ,content , createdAt  , description } ) {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    let createdAtF =  new Date(createdAt).toLocaleDateString('en-US', options);

    useEffect(() => {
        if (show) {
            navigate(`/posts/${id}/${title.replaceAll(' ', '-')}`);
        }
    }, [ show]);
    function handleBlogPostClick() {
        setShow(true);
    }

    function contentAsHtml(){

    }
    return (

        <div className="col-md-4 " onClick={handleBlogPostClick} >
            <div className="card mb-4 box-shadow">
                <img
                    className="img card-img-top"
                    src="https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Depth-First-Search.png"
                    alt="Card cap"
                />
                <div className="card-body">
                    <h3>{title}</h3>
                    <p className="card-text" >{ description }</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-muted">{createdAtF}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;