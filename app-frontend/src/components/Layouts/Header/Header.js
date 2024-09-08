import React, {useContext, useEffect, useRef, useState} from 'react';
import './header.css';


import ProfileDropDown from "../../ProfileDropDown/ProfileDropDown";
import Logo from "../../Logo/Logo";
import {useAuth} from "../../../contexts/AuthContext";
import {getAll} from "../../../services/categoryService";
import {Link} from "react-router-dom";
import frontendRoute from "../../../utils/frontendRoute";
import {getCacheData, hasCacheData, setCacheData} from "../../../utils/storage";


function Header() {

    const [showSearch, setShowSearch] = useState(false);
    const [categories, setCategories] = useState(null);


    useEffect(() => {
        if (hasCacheData('categories')) {

            setCategories(getCacheData('categories'))
        }else {
            const fetchCategories = async ()=>{
                const data = await getAll(
                    {
                        withArticlesCount: true
                    }
                );
                console.log(
                    data
                )
                setCategories(data);
                setCacheData('categories', data);
            }
        }
    }, []);




    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };


    return (
        <header className="blog-header ">
            <div className="row flex-nowrap justify-content-between align-items-center ">
                <div className="col-4 ">
                    <Link to={'/home'}>
                        <Logo/>
                    </Link>
                </div>
                <div className="col-8 d-flex justify-content-end align-items-center">

                    <ProfileDropDown/>


                </div>
            </div>


            <div className="nav-scroller py-1 mb-2">
                <nav className="row text-center flex-nowrap overflow-auto">
                    {
                        categories && categories.map((category, index) => (
                            <Link key={index} to={frontendRoute('categoryArticles', {
                                id: category.id,
                                name: category.name
                            })}
                                  className="p-2 text-muted text-nowrap" >
                                {category.name}
                            </Link>
                        ))
                    }
                </nav>
            </div>


        </header>
    );
}


export default Header;
