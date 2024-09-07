import React, { useState, useRef, useEffect } from 'react';
import './collapsiblePanel.css';
import { Link } from "react-router-dom";

const CollapsiblePanel = ({ title, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [maxHeight, setMaxHeight] = useState("0px");

    const contentRef = useRef(null);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, [isExpanded]);

    return (
        <div className="w-100 mb-3">
            <div className="w-100 card">
                <div className="w-100 card-header" id="headingOne">
                    <h5 className="mb-0 d-flex align-items-center">

                        <span className="btn p-0  btn-link" onClick={toggleCollapse}>{title}</span>
                        <i onClick={toggleCollapse} className={`ml-auto fas ${isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
                    </h5>
                </div>

                <div id="collapseOne" className={`collapse ${isCollapsed ? '' : 'show'}`}>
                    <div className="card-body">
                        <div
                            className={`collapse-scroll ${isExpanded ? 'expanded' : 'collapsed'}`}
                            ref={contentRef}
                            style={{ maxHeight: isExpanded ? maxHeight : "500px" }}
                        >
                            {children}
                        </div>

                        <div className="border-top my-2"></div>

                        <Link onClick={toggleExpand}>
                            {isExpanded ? 'See Less' : 'Expand'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollapsiblePanel;
