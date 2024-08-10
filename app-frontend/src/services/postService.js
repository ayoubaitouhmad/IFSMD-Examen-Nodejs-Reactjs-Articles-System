import axios from 'axios';

const API_URL = '/api/posts/';

const createPost = (title, content, token) => {
    return axios.post(API_URL, { title, content }, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

const getAllPosts = () => {
    return axios.get(API_URL);
};

export default {
    createPost,
    getAllPosts,
};
