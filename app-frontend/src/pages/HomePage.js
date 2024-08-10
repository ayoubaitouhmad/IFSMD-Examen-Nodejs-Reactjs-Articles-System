import React, {useEffect, useState} from 'react';
import axios from "axios";

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            const API_URL = 'http://localhost:8000/api/articles';
            const {data} = await axios.get(API_URL);

            setPosts(data);
        };
        fetchPosts();

    }, []);
    return (
        <div>
            <h1>Articles</h1>
            <h1>{posts.length}</h1>
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>content</th>
                </tr>
                </thead>
                <tbody>
                {
                    posts.map((item) => {
                        return (

                            <tr key={item.id}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.content}
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

            <div>
            </div>
        </div>
    );
};

export default HomePage;
