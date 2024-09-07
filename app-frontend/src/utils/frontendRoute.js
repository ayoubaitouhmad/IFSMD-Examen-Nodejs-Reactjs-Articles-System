const routes = {
    login: '/login',
    register: '/register',

    home: '/home',

    userProfile: '/profile',
    userArticles: '/articles/author/:username',

    articles : '/articles',
    articlesSearch : '/articles/?search=:search',
    editArticle: '/articles/:id/edit',
    showArticle: '/articles/:id/:name',
    addArticle: '/articles/add',

    categoryArticles : '/category/:id/:name/articles',
};


const frontendRoute  = (name, params = {}) => {
    let path = routes[name];

    if (!path) {
        throw new Error(`Route "${name}" is not defined.`);
    }


    Object.keys(params).forEach((key) => {
        path = path.replace(`:${key}`, params[key]);
    });

    return path;
};

export default frontendRoute ;
