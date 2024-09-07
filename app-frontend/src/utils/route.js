const routes = {

    //auth
    login:  '/login',
    register:  '/register',
    userProfile:  '/users/:id/profile/:o',
    updateUserProfile:  '/users/id/:id/profile/update',
    // Articles
    postDetails:  '/posts/:id',
    editArticle:  '/articles/:id/edit',
    updateArticle:  '/articles/:id',
    addArticle:  '/articles',
    //categories
    getCategories:  '/categories',
    getCategoryArticles:  '/category/:id/articles',
    streamImage:  '/image/:image?w=:width&h=:height',
};


const route = (name, params = {}) => {
    let path = routes[name];

    if (!path) {
        throw new Error(`Route "${name}" is not defined.`);
    }


    Object.keys(params).forEach((key) => {
        path = path.replace(`:${key}`, params[key]);
    });

    return  path;
};

export default route;
