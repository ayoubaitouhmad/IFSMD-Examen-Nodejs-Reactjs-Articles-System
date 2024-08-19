import React from 'react';
import './ProfileDropDown.module.css';
import {Link} from "react-router-dom";

function ProfileDropDown() {
    return (
        <ul className="p-0 mt-2">
            <li className="d-flex dropdown">
                <a href="#" className="nav-link " id="navbarDropdown" data-toggle="dropdown"
                   aria-expanded="false">
                    <img height={30} width={30} className="rounded mx-2"
                         src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/78d0bcc3-418b-4f9c-a3bb-27afbe816c03/de8qqfg-5a5e39c2-bb68-4572-8f43-37d784543d21.png/v1/fill/w_894,h_894,q_70,strp/an_anonymous_user_icon___by_impossibleplay9_de8qqfg-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAwMCIsInBhdGgiOiJcL2ZcLzc4ZDBiY2MzLTQxOGItNGY5Yy1hM2JiLTI3YWZiZTgxNmMwM1wvZGU4cXFmZy01YTVlMzljMi1iYjY4LTQ1NzItOGY0My0zN2Q3ODQ1NDNkMjEucG5nIiwid2lkdGgiOiI8PTEwMDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.EKJCQiJAeb5Dq3_FhtpFddUxVdikurux7K8YctBzsOA"
                         alt=""/>
                    <span>Ayoub Ait</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right position-absolute"
                     aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">
                        Profile
                    </a>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to={'/logout'}> Logout </Link>
                </div>
            </li>
        </ul>
    );
}

export default ProfileDropDown;