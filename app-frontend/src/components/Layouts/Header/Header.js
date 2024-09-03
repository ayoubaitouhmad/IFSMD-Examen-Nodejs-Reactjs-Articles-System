import React, {useContext, useEffect, useRef, useState} from 'react';
import './header.css';


import ProfileDropDown from "../../ProfileDropDown/ProfileDropDown";
import Logo from "../../Logo/Logo";
import {useAuth} from "../../../contexts/AuthContext";
import {getAll} from "../../../services/categoryService";
import {Link} from "react-router-dom";
import frontendRoute from "../../../utils/frontendRoute";


function Header() {
    const {user, isAuthenticated, logout} = useAuth();
    const [showSearch, setShowSearch] = useState(false);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAll();
            const formattedCategories = data.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setCategories(formattedCategories);
        };
        fetchCategories();
    }, []);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };


    return (
        <header className="blog-header ">
            <div className="row flex-nowrap justify-content-between align-items-center ">
                <div className="col-4 ">
                    <Logo/>
                </div>
                <div className="col-8 d-flex justify-content-end align-items-center">

                    <ProfileDropDown/>


                </div>
            </div>


            <div className="nav-scroller py-1 mb-2">
                <nav className="row text-center flex-nowrap overflow-auto">
                    {
                        categories.map((category, index) => (
                            <Link key={index} to={frontendRoute('categoryArticles', {
                                id: category.value,
                                name: category.label.toLowerCase().replace(' ', '-')
                            })}
                                  className="p-2 text-muted text-nowrap">
                                {category.label}
                            </Link>

                        ))
                    }


                </nav>
            </div>


        </header>
    );
}




export default Header;
