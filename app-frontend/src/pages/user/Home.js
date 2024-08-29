import React, { useEffect, useState } from "react";
import FeaturedBlog from "../../components/FeaturedBlog/FeaturedBlog";
import axios from "axios";
import { getLatestPosts, getMostViewedArticles } from "../../services/postService";
import NoPostsFound from "../../components/BlogList/NoPostsFound";
import BlogList from "../../components/BlogList/BlogList";
import CollapsiblePanel from "../../components/CollapsiblePanel/collapsiblePanel";
import { Link } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay/loadingOverlay";

function Home() {
    const [latestArticles, setLatestArticles] = useState([]);
    const [mostViewedArticles, setMostViewedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [latest, mostViewed] = await Promise.all([
                    getLatestPosts(),
                    getMostViewedArticles(),
                ]);
                setLatestArticles(latest);
                setMostViewedArticles(mostViewed);
                console.log(
                    latest
                )
            } catch (err) {
                setError("Failed to fetch articles. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <LoadingOverlay />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>

            <div className="row p-3">
                <div className="col-10 ">
                    <CollapsiblePanel title="Latest Articles">
                        {latestArticles.length === 0 ? <NoPostsFound /> : <BlogList posts={latestArticles} />}
                        <Link to="/articles">Show All</Link>
                    </CollapsiblePanel>

                    <CollapsiblePanel title="Most Viewed Articles">
                        {mostViewedArticles.length === 0 ? <NoPostsFound /> : <BlogList posts={mostViewedArticles} />}
                        <Link to="/articles">Show All</Link>
                    </CollapsiblePanel>

                </div>

                <div className="col-2 ">
                    <div className="p-3">
                        <h4 className="font-italic">Archives</h4>
                        <ol className="list-unstyled mb-0">
                            <li><a href="#">March 2014</a></li>
                            <li><a href="#">February 2014</a></li>
                            <li><a href="#">January 2014</a></li>
                            {/* Add more links as needed */}
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
