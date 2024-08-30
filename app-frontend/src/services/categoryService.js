import axiosInstance from "../utils/axios";


const API_GET_ALL = '/categories';


export const getAll = async (id , page) => {
    try {
        const response = await axiosInstance.get(API_GET_ALL);
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
