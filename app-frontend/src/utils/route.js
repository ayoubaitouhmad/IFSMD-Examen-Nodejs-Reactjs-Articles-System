const routes = {
    // auth
    login: process.env.REACT_APP_BACK_END_URL + '/login',
    register: process.env.REACT_APP_BACK_END_URL + '/register',

    // user
    getUserById: '/users/:id',
    getUserByUsername: '/user/username/:username',
    getUserArticles: '/user/:id/articles',
    updateUseProfile: '/user/:id/profile/update',
    changePassword: '/change-password',
    forgotPassword: '/forgot-password',

    userProfile: '/users/:id/profile/:o',

    // articles
    articles: '/articles',
    getPostById: '/articles/:id',
    latestArticles: '/articles/latest',
    mostViewedArticles: '/articles/most-viewed-articles',
    postDetails: '/posts/:id',
    editArticle: '/articles/:id/edit',
    updateArticle: '/articles/:id',
    deleteArticle: '/articles/:id',
    addArticle: '/articles',
    incrementArticleViews: '/articles/:id/increment-views',

    // utils
    streamImage: process.env.REACT_APP_BACK_END_URL + '/image/:image?w=:width&h=:height',
};


const route = (name, params = {}) => {
    let path = routes[name];

    if (!path) {
        throw new Error(`Route "${name}" is not defined.`);
    }


    Object.keys(params).forEach((key) => {
        path = path.replace(`:${key}`, params[key]);
    });

    return path;
};

export default route;
