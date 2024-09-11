import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        // Fetch post data
        fetch(`https://blog-mern-backend-e9ia.onrender.com/post/${id}`)
            .then(response => response.json())
            .then(postInfo => {
                setPostInfo(postInfo);
            })
            .catch(error => {
                console.error("Failed to fetch post:", error);
            });
    }, [id]);

    // Return early if postInfo is null
    if (!postInfo) return <div>Loading...</div>;

    const { createdAt, title, author, cover, content, _id } = postInfo;
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return (
        <div className="post-page">
            <h1>{title}</h1>
            <time dateTime={createdAt}>{formattedDate}</time>
            <div className="author">by @{author.username}</div>

            {userInfo && userInfo.id === author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${_id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        Edit this Post
                    </Link>
                </div>
            )}

            <div className="image">
                <img src={`https://blog-mern-backend-e9ia.onrender.com/${cover}`} alt={title} />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
