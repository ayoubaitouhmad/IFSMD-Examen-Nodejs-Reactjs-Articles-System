import React from 'react';
import  "./NoPostsFound.module.css";
import Skeleton from "react-loading-skeleton";

function NoPostsFound() {
    return (
        <div className="col-12">
            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="text-center">
                    <i className="fas fa-search-minus fa-3x text-muted mb-3"></i> {/* Font Awesome Icon */}
                    <h3 className="text-muted">No Posts Found</h3>
                    <p className="text-muted">We couldn't find any posts matching your search.</p>

                </div>
            </div>
        </div>
    );
}


export default NoPostsFound;