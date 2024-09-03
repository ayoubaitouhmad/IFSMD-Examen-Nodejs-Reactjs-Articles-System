import React, {useEffect, useState} from 'react';
import CollapsiblePanel from "../CollapsiblePanel/collapsiblePanel";
import {Link} from "react-router-dom";
import frontendRoute from "../../utils/frontendRoute";
import {getCacheData, hasCacheData, setCacheData} from "../../utils/storage";
import {getAll} from "../../services/categoryService";

function CategoriesList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!hasCacheData('categories')) {

            const fetchCategories = async () => {
                try {
                    const data = await getAll(
                        {
                            withArticlesCount: true
                        }
                    );

                    setCategories(data);
                    setCacheData('categories', data)
                } catch (error) {
                    console.error('Failed to fetch post:', error);
                }
            };
            fetchCategories();
        } else {

            setCategories(getCacheData('categories'));

        }
    }, []);

    return (
        <CollapsiblePanel title="Categories">
            <ul className="list-unstyled mb-0">
                {
                    categories.map((category, index) => (
                        <li key={index} className={'mb-2'}>
                            <Link to={frontendRoute('categoryArticles', {
                                id: category.id,
                                name: category.name
                            })}>
                                <span className={'text-muted mr-2'}>{category.name}</span>
                                <span className={'text-primary'}>({category.ArticlesCount})</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </CollapsiblePanel>
    );
}

export default CategoriesList;