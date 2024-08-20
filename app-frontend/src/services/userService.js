import axios from 'axios';

const API_GET_USER = 'http://localhost:1000/api/user';

export const getUser = async (id) => {
    try {
        const response = await axios.get(API_GET_USER, {
            params: {
                id: id
            }
        });
        return response.data;


    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }


};
