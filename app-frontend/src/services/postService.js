import axiosInstance from "../utils/axios";
import Route from "../utils/route";
import route from "../utils/route";


export const getPosts = async (page = 1, limit = 5, date, search) => {
    try {
        const response = await axiosInstance.get(route('articles'), {
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
        const response = await axiosInstance.get(
            route('latestArticles')
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const getMostViewedArticles = async () => {
    try {
        const response = await axiosInstance.get(
            route('mostViewedArticles')
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const getPost = async (id) => {
    try {
        const response = await axiosInstance.get(
            route('getPostById' , {id})
        );
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






export const deleteArticle = async (id) => {
    try {
        const response = await axiosInstance.delete(
            route('deleteArticle' , {id})
        );
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
export const incrementViews = async (id) => {
    try {
        const response = await axiosInstance.post(
            route('incrementArticleViews' , {id})
        );
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};