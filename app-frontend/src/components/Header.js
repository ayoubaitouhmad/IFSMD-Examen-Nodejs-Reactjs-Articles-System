import React, {useState} from 'react';
import '../css.css';


function Header() {
    // State to control the visibility of the search input
    const [showSearch, setShowSearch] = useState(false);

    // Toggle the search input visibility
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <header className="blog-header ">
            <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-4 ">
                    <a className="blog-header-logo text-dark" href="#">Large</a>
                </div>
                <div className="col-8 d-flex justify-content-end align-items-center">

                    <a className="btn btn-sm btn-outline-secondary mr-1" href="#">Registre</a>
                    <a className="btn btn-sm btn-outline-secondary" href="#">Login</a>
                </div>
            </div>


            <div className="nav-scroller py-1 mb-2">
                <nav className="row text-center flex-nowrap overflow-auto">
                    <a className="p-2 text-muted" href="#">World</a>
                    <a className="p-2 text-muted" href="#">U.S.</a>
                    <a className="p-2 text-muted" href="#">Technology</a>
                    <a className="p-2 text-muted" href="#">Design</a>
                    <a className="p-2 text-muted" href="#">Culture</a>
                    <a className="p-2 text-muted" href="#">Business</a>
                    <a className="p-2 text-muted" href="#">Politics</a>
                    <a className="p-2 text-muted" href="#">Opinion</a>
                    <a className="p-2 text-muted" href="#">Science</a>
                    <a className="p-2 text-muted" href="#">Health</a>
                    <a className="p-2 text-muted" href="#">Style</a>
                    <a className="p-2 text-muted" href="#">Travel</a>
                    <a className="p-2 text-muted" href="#">Travel</a>
                    <a className="p-2 text-muted" href="#">Travel</a>
                    <a className="p-2 text-muted" href="#">Travel</a>
                    <a className="p-2 text-muted" href="#">Travel</a>
                    <a className="p-2 text-muted" href="#">Travel</a>
                    <a className="p-2 text-muted" href="#">Travel</a>
                </nav>
            </div>





        </header>
    );
}

export default Header;
