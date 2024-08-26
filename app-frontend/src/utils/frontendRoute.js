const routes = {
    home: '/',
    userProfile: '/users/:id/profile/:o',
    postDetails: '/posts/:id',
    editArticle: '/articles/:id/edit',
    login: '/login',
    register: '/register',
    streamImage: 'http://localhost:1000/api/image/:image',

    // Add more routes as needed
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
