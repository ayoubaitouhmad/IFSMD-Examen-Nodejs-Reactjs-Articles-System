import axiosInstance from "../utils/axios";


const API_GET_ALL = '/categories';
const API_GET_CATEGORY_ARTICLES = '/categories/:id/articles';


export const getAll = async (id , page) => {
    try {
        const response = await axiosInstance.get(API_GET_ALL);
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
export const getCategoryArticles = async (id ) => {
    try {
        const response = await axiosInstance.get(API_GET_CATEGORY_ARTICLES.replace(':id' ,id ));
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
