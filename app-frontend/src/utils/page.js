import {useEffect} from "react";
import { useNavigate, useLocation } from 'react-router-dom';


export  const usePageTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

export const updateQueryParam = (key, value, navigate) => {
    const queryParams = new URLSearchParams(Location.search);

    if (value) {
        queryParams.set(key, value);
    } else {
        queryParams.delete(key);
    }

    navigate(`?${queryParams.toString()}`);
};

export const getQueryString = (key,LocationSearch) => {
    const queryParams = new URLSearchParams(LocationSearch);

    if (queryParams.has(key)) {
        return queryParams.get(key);
    }
    return null

};