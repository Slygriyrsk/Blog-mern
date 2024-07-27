import { Link } from "react-router-dom";

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
    // Example assuming createdAt is already in ISO format
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}> {/* this is used for link to the post of a logged user */}
                    <img src={'http://localhost:4000/' + cover} alt="" />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}> {/* in our database id is written as _id*/}
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a className="author">{author.username}</a>
                    <time dateTime={createdAt}>{formattedDate}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}
