import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);  // Create an empty array of posts to store new posts

    useEffect(() => {
        // Fetching posts from the API
        fetch('https://blog-mern-backend-e9ia.onrender.com/post')
            .then(response => response.json())
            .then(posts => {
                setPosts(posts);
            })
            .catch(error => {
                console.error("Failed to fetch posts:", error);
            });
    }, []);

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} />  // Provide a unique key prop
            ))}
        </>
    );
}
