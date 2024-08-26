const routes = {
    home: '/',
    userProfile: '/users/:id/profile/:o',
    postDetails: '/posts/:id',
    editArticle: 'http://localhost:1000/api/articles/:id/update',
    addArticle: 'http://localhost:1000/api/articles/add',
    login: '/login',
    register: '/register',
    streamImage: 'http://localhost:1000/api/image/:image',

    // Add more routes as needed
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
