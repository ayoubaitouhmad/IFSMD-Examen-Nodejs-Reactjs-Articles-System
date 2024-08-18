import React from 'react';
import BlogPost from "../BlogPost/BlogPost";




function BlogList({posts}) {
    console.log(posts)
    return (

        <div className="row">
            {
                posts.map((post) => (
                    <BlogPost {...post} />
                ))
            }
        </div>
    );
}

export default BlogList;