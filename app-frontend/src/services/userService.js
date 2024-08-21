import axios from 'axios';

const API_GET_USER_BY_ID = 'http://localhost:1000/api/users/id/';
const API_GET_USER_BY_USERNAME = 'http://localhost:1000/api/users/username/';
const API_GET_USER_ARTICLS = 'http://localhost:1000/api/users/id/:id/articles';

export const getUserById = async (id , page) => {
    try {

        const response = await axios.get(API_GET_USER_BY_ID+id, {
            params: {
                page,
                limit:5
            },
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
export const getUserByUsername = async (username) => {
    try {

        const response = await axios.get(API_GET_USER_BY_USERNAME+username, {
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


        const response = await axios.get(API_GET_USER_ARTICLS.replace(":id" , id), {
            params:{
                page
            },
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