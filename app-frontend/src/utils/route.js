const routes = {
    home: '/',
    userProfile: '/users/:id/profile/:o',
    postDetails: '/posts/:id',
    editArticle: 'http://localhost:1000/api/articles/:id/edit',
    updateArticle: 'http://localhost:1000/api/articles/:id/update',
    addArticle: 'http://localhost:1000/api/articles/add',
    login: "http://localhost:1000/api/login",
    register: 'http://localhost:1000/api/register',
    streamImage: 'http://localhost:1000/api/image/:image?w=:width&h=:height',
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
