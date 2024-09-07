import axiosInstance from "../utils/axios";
import route from "../utils/route";



export const getAll = async (params) => {

    try {
        const response = await axiosInstance.get(route('getCategories'),{
            params:params
        });
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
export const getCategoryArticles = async (id ) => {
    try {
        const response = await axiosInstance.get(
            route('getCategoryArticles' , {id})
        );
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
