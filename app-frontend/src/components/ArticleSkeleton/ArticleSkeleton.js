import Skeleton from "react-loading-skeleton";
import React from "react";


const  ArticleSkeleton = () => (
    <div className="col-12 col-sm-6 col-xl-4" style={{width: '300px'}}>
        <Skeleton height={200}/>
        <div style={{marginTop: '16px'}}>
            <Skeleton height={24} width={`80%`}/>
            <Skeleton height={18} width={`60%`} style={{marginTop: '8px'}}/>
        </div>
        <div style={{marginTop: '16px'}}>
            <Skeleton height={16} width={`30%`}/>
            <Skeleton height={16} width={`50%`} style={{marginTop: '8px'}}/>
        </div>
    </div>
);

export default ArticleSkeleton;