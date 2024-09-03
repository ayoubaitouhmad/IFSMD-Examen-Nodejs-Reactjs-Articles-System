import axiosInstance from "../utils/axios";
import Route from "../utils/route";
import route from "../utils/route";

const API_URL = '/articles';
const API_GET_POST_URL = '/articles/';
const API_DELETE_ARTICLE_URL = '/articles/:id/delete';
const API_EDIT_ARTICLE_URL = '/articles/:id/edit';
const API_INCREMENT_VIEWS_ARTICLE_URL = '/articles/:id/increment-views';
const API_GET_LATEST_ARTICLES = '/articles/latest';
const API_GET_MOST_VIEWED_ARTICLES = '/articles/most-viewed-articles';
export const getPosts = async (page = 1, limit = 5, date, search) => {
    try {
        const response = await axiosInstance.get(API_URL, {
            params: {page, limit, date, search}
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const getLatestPosts = async () => {
    try {
        const response = await axiosInstance.get(API_GET_LATEST_ARTICLES);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const getMostViewedArticles = async () => {
    try {
        const response = await axiosInstance.get(API_GET_MOST_VIEWED_ARTICLES);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const getPost = async (id) => {
    try {
        const response = await axiosInstance.get(API_GET_POST_URL + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const editPost = async (id) => {
    try {
        const response = await axiosInstance.get(
            route('editArticle' , {id})
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};






export const addPost = async (post) => {
    try {
        const response = await axiosInstance.post(API_URL, post);
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
export const deleteArticle = async (id) => {
    try {
        const response = await axiosInstance.post(API_DELETE_ARTICLE_URL.replace(':id' , id));
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
export const incrementViews = async (id) => {
    try {
        const response = await axiosInstance.post(API_INCREMENT_VIEWS_ARTICLE_URL.replace(':id' , id));
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};