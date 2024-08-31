import React from 'react';
import BlogPost from "../BlogPost/BlogPost";
import {Link} from "react-router-dom";


function BlogList({posts}) {

    return (

        <div className="row">

            {
                posts.map((post, index) => (
                    <BlogPost key={index} {...post} />
                ))
            }
            <div className="col-12">
                <Link to="/articles">Show All</Link>
            </div>
        </div>
    );
}

export default BlogList;