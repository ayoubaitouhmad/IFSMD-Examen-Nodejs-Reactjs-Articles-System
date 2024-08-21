import React from 'react';
import './ProfileDropDown.module.css';
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

function ProfileDropDown() {
    const { user, isAuthenticated, logout } = useAuth();
    return (
        <ul className="bg-light rounded p-0 mt-2">
            <li className="d-flex dropdown">
                <a href="#" className="nav-link " id="navbarDropdown" data-toggle="dropdown"
                   aria-expanded="false">
                    <img
                        height={40} width={40}
                        src="https://images.top10.com/f_auto,q_auto/v1/production/authors/uploads/photo/Frame1968.20240603103350.png"
                        alt="Profile"
                        className="mr-2 rounded-circle img-fluid border border-danger"
                    />

                    <span className="text-muted">
                        {user.name}
                    </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right position-absolute"
                     aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">
                        Profile
                    </a>
                    <Link className="dropdown-item" to={`/articles/author/${user.username}`}>
                        My Articles
                    </Link>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to={'/logout'}> Logout </Link>
                </div>
            </li>
        </ul>
    );
}

export default ProfileDropDown;