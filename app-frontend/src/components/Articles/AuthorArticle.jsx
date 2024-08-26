import React from 'react';
import {Link} from "react-router-dom";
import route from "../../utils/route";
import frontendRoute from "../../utils/frontendRoute";

function AuthorArticle({id, title, description, createdAt, isLastArticle, urlTitle, canEdit , articleImage}) {

    console.log(articleImage)
    return (
        <div id={id} className={`media my-4  ${isLastArticle ? '' : 'border-bottom'}`}>
            <img
                className="mr-3 img-fluid rounded"
                src={route('streamImage' , {image:articleImage.filePath})}
                alt={title}
                style={{width: '100px', height: '100px'}}
            />
            <div className="media-body">
                <Link to={`/articles/${id}/${urlTitle}`}> {title} </Link>

                <p>{description}</p>
                <p className="text-muted">{createdAt}</p>
            </div>
            {
                canEdit ? <div className="mx-1 d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <Link className="btn btn-sm btn-outline-secondary" to={frontendRoute('editArticle' , {id:id} )}>
                            Edit
                        </Link>

                    </div>

                </div> : ''
            }

        </div>
    );
}

export default AuthorArticle;