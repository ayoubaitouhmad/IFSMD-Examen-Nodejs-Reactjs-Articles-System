import React from 'react';
import {Link} from "react-router-dom";

const Breadcrumb = ({ items }) => {
    return (

            <ol className="breadcrumb ">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`breadcrumb-item ${item.active ? 'active' : ''}`}
                        aria-current={item.active ? 'page' : undefined}
                    >
                        {item.active ? (
                            item.name
                        ) : (
                            <Link to={item.href}>{item.name}</Link>
                        )}
                    </li>
                ))}
            </ol>

    );
};

export default Breadcrumb;
