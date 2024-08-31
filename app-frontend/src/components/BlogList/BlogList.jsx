import React from 'react';
import BlogPost from "../BlogPost/BlogPost";




function BlogList({posts}) {

    return (

        <div className="row">

            {
                posts.map((post, index) => (
                    <BlogPost key={index} {...post} />
                ))
            }
        </div>
    );
}

export default BlogList;