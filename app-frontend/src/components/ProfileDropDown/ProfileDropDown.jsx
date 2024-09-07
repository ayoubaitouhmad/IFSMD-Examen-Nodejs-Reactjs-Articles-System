import React, {useContext} from 'react';
import './ProfileDropDown.module.css';
import {Link} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import route from "../../utils/route";

function ProfileDropDown() {
    const { user } = useContext(AuthContext);
    return (
        <ul className="bg-light rounded p-0 mt-2">
            <li className="d-flex dropdown">
                <a href="#" className="nav-link " id="navbarDropdown" data-toggle="dropdown"
                   aria-expanded="false">
                    <img
                        height={40} width={40}
                        src={ route('streamImage' , {
                            'image' :user.profileImage.filePath,
                            'width' : 40 ,
                            'height' :40
                        })}
                        alt="Profile"
                        className="mr-2 rounded-circle border  shadow-sm "
                    />

                    <span className="text-muted">
                        {user.name}
                    </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right position-absolute"
                     aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/profile">
                        Profile
                    </Link>

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