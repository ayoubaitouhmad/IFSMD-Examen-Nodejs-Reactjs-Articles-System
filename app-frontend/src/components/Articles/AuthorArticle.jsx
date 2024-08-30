import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import route from "../../utils/route";
import frontendRoute from "../../utils/frontendRoute";
import {deleteArticle} from "../../services/postService";

function AuthorArticle({id, title, description, createdAt, isLastArticle, urlTitle, canEdit, articleImage, views}) {
    const navigate = useNavigate();
    const handleDeleteArticleClick = async () => {

        if (window.confirm("Are you sure you want to delete this item?")) {
            let response = await deleteArticle(id);
            navigate(0);
        }

    }

    return (
        <div id={id} className={`media my-4  ${isLastArticle ? '' : 'border-bottom'}`}>
            <img
                className="mr-3 img-fluid rounded"
                src={route('streamImage', {image: articleImage.filePath})}
                alt={title}
                style={{width: '100px', height: '100px'}}
            />
            <div className="media-body">
                <Link to={`/articles/${id}/${urlTitle}`}> {title} </Link>

                <p>{description}</p>
                <div className="text-muted">
                    {createdAt}
                    <p>
                        <span className="mr-1">
                            {views}
                        </span>
                        <i className="fa-solid fa-eye"></i>
                    </p>

                </div>


            </div>
            {
                canEdit ? <div className="mx-1 d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <Link className="btn btn-sm btn-outline-secondary" to={frontendRoute('editArticle', {id: id})}>
                            Edit
                        </Link>

                        <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteArticleClick}>
                            Delete
                        </button>


                    </div>

                </div> : ''
            }

        </div>

    );
}

export default AuthorArticle;