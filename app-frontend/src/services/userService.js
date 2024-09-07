import axios from 'axios';
import axiosInstance from "../utils/axios";
import route from "../utils/route";


export const getUserById = async (id , page) => {
    try {

        const response = await axiosInstance.get(
            route('getUserById' , {id})
            , {
            params: {
                page,
                limit:5
            }
        });
        return response.data;


    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
export const getUserByUsername = async (username) => {
    try {
        const response = await axiosInstance.get(route('getUserByUsername' , {username}), {
            headers:{
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
export const getUserArticles = async (id , page) => {
    try {


        const response = await axiosInstance.get(
            route('getUserArticles' , {id}), {
            params:{
                page
            }
        });
        return response.data;


    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

export const changePassword = async (oldPassword , newPassword) => {
    try {
        const response = await axiosInstance.post(route('changePassword') ,{
            oldPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

export const sendResetPasswordEmail = async () => {
    try {
        const response = await axiosInstance.post(route('forgotPassword'));
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};