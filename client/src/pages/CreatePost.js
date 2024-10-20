// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';  // to style the elements
// import {useState} from "react";
// import {Navigate} from "react-router-dom";
// import Editor from "../Editor";

//     export default function CreatePost() {
//         const [title,setTitle] = useState('');
//         const [summary,setSummary] = useState('');
//         const [content,setContent] = useState('');
//         const [files, setFiles] = useState('');
//         const [redirect, setRedirect] = useState(false);
//         async function createNewPost(ev) {
//           const data = new FormData();
//           data.set('title', title);
//           data.set('summary', summary);
//           data.set('content', content);
//           data.set('file', files[0]);
//           ev.preventDefault();
//           const response = await fetch('http://localhost:3000/post', {
//             method: 'POST',
//             body: data,
//             credentials: 'include', // so that we can also fetch the author id
//           });
//           // console.log(await response.json());
//           if (response.ok) {
//             setRedirect(true);
//           }
//         }


//     if (redirect) { // to redirect to the main page after creating post
//         return <Navigate to={'/'} />
//       }

//       return (
//         <form onSubmit={createNewPost}>
//           <input type="title"
//                  placeholder={'Title'}
//                  value={title}
//                  onChange={ev => setTitle(ev.target.value)} />
//           <input type="summary"
//                  placeholder={'Summary'}
//                  value={summary}
//                  onChange={ev => setSummary(ev.target.value)} />
//           <input type="file"
//                  onChange={ev => setFiles(ev.target.files)} />
//           <Editor value={content} onChange={setContent} />
//           <button style={{marginTop:'5px'}}>Create post</button>
//         </form>
//       );
//     }

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files && files.length > 0) {
      data.set('file', files[0]);
    }

    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      const responseData = await response.json();

      if (response.ok) {
        setRedirect(true);
      } else {
        setError(responseData.message || 'An error occurred while creating the post.');
        console.error('Server response:', responseData);
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError('An error occurred while creating the post. Please try again.');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost}>
      {error && <p className="error">{error}</p>}
      <input 
        type="text"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} 
      />
      <input 
        type="text"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} 
      />
      <input 
        type="file"
        onChange={ev => setFiles(ev.target.files)} 
      />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}