import React, {useState} from 'react';
import frontendRoute from "../../../utils/frontendRoute";
import {useNavigate} from "react-router-dom";

const SearchCard = ( ) => {
    const [search, setSearch] = useState();
    const navigate = useNavigate();

    return (
        <div className="card mb-4">
            <div className="card-header">Search</div>
            <div className="card-body">
                <div className="input-group">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        className="form-control"
                        type="text"
                        placeholder="Enter search term..."
                        aria-label="Enter search term..."
                        aria-describedby="button-search"
                    />
                    <button
                        onClick={(e) => navigate(frontendRoute('articlesSearch', { search }))}
                        className="btn btn-primary"
                        id="button-search"
                        type="button"
                    >
                        Go!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
