
import React from "react";
import ArticleSkeleton from "../ArticleSkeleton/ArticleSkeleton";

function ArticlesSkeleton({number = 1}) {
    return (
        <>
            {Array.from({ length: number }, (_, index) => (
                <ArticleSkeleton key={index} />
            ))}
        </>
    );
}

export default ArticlesSkeleton;