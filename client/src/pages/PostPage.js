import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams(); // to get the id of the post

    useEffect(() => {
        // console.log(id);
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
    }, [id]);

    if (!postInfo) return '';

    const { createdAt } = postInfo;
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
            <h1>{postInfo.title}</h1>
            <time dateTime={createdAt}>{formattedDate}</time>
            <div className="author">by @{postInfo.author.username}</div>

            {/* if the userinfo id matches with the post info id then the user is subject to edit the contents of the blog */}
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>

                        {/* this jsx from heroicons*/}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        Edit this Post
                    </Link>
                </div>
            )}

            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt={postInfo.title} />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} /> {/* Render HTML content */}
        </div>
    );
}