const routes = {
    home: '/home',
    userProfile: '/profile',
    userArticles: '/articles/author/:username',
    editArticle: '/articles/:id/edit',
    showArticle: '/articles/:id/:name',
    addArticle: '/articles/add',
    login: '/login',
    register: '/register',
    streamImage: 'http://localhost:1000/api/image/:image',

    categoryArticles : '/category/:id/:name/articles',
    'articles' : '/articles'
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
