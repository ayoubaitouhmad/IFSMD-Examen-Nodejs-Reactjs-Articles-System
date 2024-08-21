import React from 'react';
import {Link} from "react-router-dom";

function AuthorArticle({id ,title,description , createdAt , isLastArticle }) {

    return (
        <div id={id} className={`media my-4  ${isLastArticle ? '' : 'border-bottom'}`}>
            <img
                className="mr-3 img-fluid rounded"
                src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2023/06/22155410/top-eight-crypto-scams-2023-featured.jpg"
                alt={title}
                style={{width: '100px', height: '100px'}}
            />
            <div className="media-body">
                <Link to={`/articles/${id}/${title}`}> {title} </Link>

                <p>{description}</p>
                <p className="text-muted">{createdAt}</p>
            </div>
        </div>
    );
}

export default AuthorArticle;