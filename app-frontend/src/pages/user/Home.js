import React, {useEffect, useState} from "react";
import FeaturedBlog from "../../components/FeaturedBlog/FeaturedBlog";
import axios from "axios";
import {getLatestPosts, getMostViewedArticles, getPosts} from "../../services/postService";
import NoPostsFound from "../../components/BlogList/NoPostsFound";
import BlogList from "../../components/BlogList/BlogList";
import CollapsiblePanel from "../../components/CollapsiblePanel/collapsiblePanel";
import {Link} from "react-router-dom";


function Home() {

    const [latestArticles, setLatestArticles] = useState([]);
    const [mostViewedArticles, setMostViewedArticles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setLatestArticles(await  getLatestPosts());
            setMostViewedArticles(await getMostViewedArticles());
        };
        fetchData();
    }, []);


    return (
        <>
            <FeaturedBlog/>
            <div className="row p-3">
                <div className="col-10 row">
                    <CollapsiblePanel title="Latest Articles">
                        {latestArticles.length === 0 ? <NoPostsFound/> : <BlogList posts={latestArticles}/>}

                        <Link to="/articles" >
                            Show All
                        </Link>
                    </CollapsiblePanel>
                    <CollapsiblePanel title="Most Viewed Articles">
                        {latestArticles.length === 0 ? <NoPostsFound/> : <BlogList posts={mostViewedArticles}/>}
                        <Link to="/articles" >
                            Show All
                        </Link>
                    </CollapsiblePanel>
                </div>

                <div className="col-2 ">
                    <div className="p-3">
                        <h4 className="font-italic">Archives</h4>
                        <ol className="list-unstyled mb-0">
                            <li><a href="#">March 2014</a></li>
                            <li><a href="#">February 2014</a></li>
                            <li><a href="#">January 2014</a></li>
                            <li><a href="#">December 2013</a></li>
                            <li><a href="#">November 2013</a></li>
                            <li><a href="#">October 2013</a></li>
                            <li><a href="#">September 2013</a></li>
                            <li><a href="#">August 2013</a></li>
                            <li><a href="#">July 2013</a></li>
                            <li><a href="#">June 2013</a></li>
                            <li><a href="#">May 2013</a></li>
                            <li><a href="#">April 2013</a></li>
                        </ol>
                    </div>
                    <div className="p-3">
                        <h4 className="font-italic">Elsewhere</h4>
                        <ol className="list-unstyled">
                            <li><a href="#">GitHub</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Facebook</a></li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
