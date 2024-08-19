import React, { useState } from 'react';
import './collapsiblePanel.css'; // Import the regular CSS file

const CollapsiblePanel = ({ title, children }) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="w-100 mb-3">
            <div className="w-100 card">
                <div className="w-100 card-header" id="headingOne">
                    <h5 className="mb-0 d-flex align-items-center">
                        <span className="icon-circle"></span>
                        <span
                            className="btn ml-2 btn-link"
                            onClick={toggleCollapse}
                        >
                            {title}
                        </span>
                        <i
                            onClick={toggleCollapse}
                            className={`ml-auto fas ${isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up'}`}
                        ></i>
                    </h5>
                </div>

                <div id="collapseOne" className={`collapse ${isCollapsed ? '' : 'show'}`}>
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollapsiblePanel;
