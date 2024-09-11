import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
    // const [username, setUsername] = useState(null);
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('https://blog-mern-backend-e9ia.onrender.com/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                //setUsername(userInfo.username); // this name from the network/profile section
                setUserInfo(userInfo);
            });
        });
    }, []);

    function Logout() {
        fetch('https://blog-mern-backend-e9ia.onrender.com/logout', {
            credentials: 'include',
            method: 'POST',
        });
        //setUsername(null); //once logout reset the username
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
        <Link to="/" className="logo">MyBlog</Link> {/*so that when we click my blog it takes us to main page*/}
        <nav>
            {/* once user is logged in it can do createpost and logout functionalities*/}
            {username && (
                <>
                <Link to="/create">Create New Post</Link>
                <a onClick={Logout}>Logout</a>
                </>
            )}
            {!username && (
                <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                </>
            )}
        {/* <a href="/login">Login</a>  we will use react component for it*/}
        </nav>
      </header>
    );
}
