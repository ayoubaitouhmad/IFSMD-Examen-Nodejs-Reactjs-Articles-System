import React, {useEffect, useState} from "react";
import Breadcrumb from "../../utils/breadcrumb";
import frontendRoute from "../../utils/frontendRoute";



function CategoryArticles() {

    const breadcrumbItems = [
        {name: 'Home', href: frontendRoute('home')},
        {name: 'All Article',  active: true}
    ];
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />

        </>
    );
}

export default CategoryArticles;
