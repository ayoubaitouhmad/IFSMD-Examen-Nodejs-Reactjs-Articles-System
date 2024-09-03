export const setCacheData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const hasCacheData = (key) => {
    return localStorage.getItem(key) != null;
};

export const destroyCacheData = (key) => {
    return localStorage.removeItem(key);
};


export const getCacheData = (key) => {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
};
