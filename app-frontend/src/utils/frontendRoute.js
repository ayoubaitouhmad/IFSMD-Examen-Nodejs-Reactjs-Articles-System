const routes = {
    home: '/home',
    userProfile: '/profile',
    userArticles: '/articles/author/:username',
    postDetails: '/posts/:id',
    editArticle: '/articles/:id/edit',
    addArticle: '/articles/add',
    login: '/login',
    register: '/register',
    streamImage: 'http://localhost:1000/api/image/:image',

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
