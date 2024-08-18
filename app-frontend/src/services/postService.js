// src/services/postService.js
import axios from 'axios';

const API_URL = 'http://localhost:1000/api/articles';
const API_GET_POST_URL = 'http://localhost:1000/api/articles/';

export const getPosts = async (
    page = 1, limit = 5 , date, search
) => {
    try {
        const response = await axios.get(API_URL , {
            params: {page, limit , date , search}
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPost = async (id) => {
    try {
        const response = await axios.get(API_GET_POST_URL+id);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};


export const addPost = async (post) => {
    try {
        const response = await axios.post(API_URL, post);
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
