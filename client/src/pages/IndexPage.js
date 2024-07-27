import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);  // create an empty array of posts to store new post
    useEffect(() => {
        // using get req for post so that we get to our main page
        fetch('http://localhost:4000/post').then(response => { //fetch and json are async fnct so we used .then
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);
    return (
        <>
            {/* <Post />
        <Post />
        <Post /> */}
            {posts.length > 0 && posts.map(post => (
                <Post {...post} /> // pass the properties of post
            ))}
        </>
    );
}