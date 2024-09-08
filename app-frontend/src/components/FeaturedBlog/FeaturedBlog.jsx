import React, {useEffect, useState} from 'react';
import {getLatestPosts} from "../../services/postService";
import route from "../../utils/route";
import {Link, useNavigate} from "react-router-dom";
import frontendRoute from "../../utils/frontendRoute";


function FeaturedBlog() {
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getLatestPosts();
                if(data.length){
                    setArticle(data[0]);
                }

            } catch (error) {
                console.error('Error fetching category:', error);
                // if (error.response && error.response.status) {
                //     navigate('/' + error.response.status);
                // }
            }
        };
        fetchPost();
    }, []);

    return (
        <>

            {article && (
                <>
                    <div
                        className="w-100 jumbotron p-3 p-md-5 text-white rounded bg-dark"
                        style={{
                            backgroundImage: `url(${route('streamImage', {image: article.articleImage.filePath})})`,
                            backgroundSize: 'cover', // Ensures the image covers the entire div
                            backgroundPosition: 'center', // Centers the image within the div
                            position: 'relative', // Allows the use of absolute positioning for the overlay
                            color: 'white', // Ensures text remains white
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adds a dark overlay for better text readability
                                zIndex: 1, // Ensures the overlay is between the background image and content
                            }}
                        />
                        <div style={{position: 'relative', zIndex: 2}}> {/* Ensures content is above the overlay */}
                            <div className="col-md-6 px-0">

                                <h1 className="display-4 font-italic">
                                    {article.title}
                                </h1>
                                <p className="lead my-3">
                                    {article.description}
                                </p>
                                <p className="lead mb-0">
                                    <Link to={frontendRoute('showArticle', {
                                        id: article.id,
                                        name: article.urlTitle
                                    })} className="text-white font-weight-bold">
                                        Continue reading...
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                </>
            )}

        </>

    );

}

export default FeaturedBlog;