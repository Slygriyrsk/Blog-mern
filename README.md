![Screenshot 2024-09-01 212034](https://github.com/user-attachments/assets/5ab88a96-f9f7-4370-85bd-f286688bdb12)

# 📚 Blog Platform

Welcome to the Blog Platform! This application allows users to register, log in, create, view, and edit blog posts. It ensures that only logged-in users can create or modify their own posts, while guests can view posts.

# 🛠️ Installation


### Prerequisites

-   **Node.js** (v20.x or later, LTS)
-   **MongoDB** (v7.x or later)
-   **Yarn** (v1.22.x or later)

### Clone the Repository

Start by cloning the repository:

```bash
git clone https://github.com/Slygriyrsk/blog-mern.git
cd blog-mern
```

### Install Dependencies

#### Back-End

Navigate to the root directory and install back-end dependencies:

```bash
npm install
```

#### Front-End

Navigate to the `client` directory and install front-end dependencies:

```bash
cd client
yarn install
```

### Environment Variables

Create a `.env` file in the root directory with the following content:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster3.yk22b.mongodb.net/?retryWrites=true&w=majority
SECRET_KEY=your_secret_key
PORT=3000
```

Replace `your_secret_key` with a secure key of your choice.

### Start the Server

To start the server, run the following command from the root directory:

In **api** folder
```bash
nodemon index.js
```

In **client** folder
```bash
yarn start
```

The application should now be running at `http://localhost:3000`.

🗃️ MongoDB Integration
-----------------------

### Database Setup

-   **Database Name**: `blog-platform`
-   **Collections**:
    -   `users`: Stores user credentials and profile information.
    -   `posts`: Stores blog posts, including title, content, and author.

### Database Operations

-   **Fetching User Data**: Retrieve user data from the `users` collection using their credentials.
-   **Fetching Posts**: Retrieve posts from the `posts` collection.
-   **Creating Posts**: Add new posts to the `posts` collection.
-   **Editing Posts**: Update posts that belong to the logged-in user.

### MongoDB Screenshots

#### User Collection

Below is a screenshot showing the `users` collection in MongoDB:
![Screenshot 2024-09-01 212051](https://github.com/user-attachments/assets/ddd490b5-11f0-42df-a936-1386dd6f1952)

#### Post Collection

Below is a screenshot showing the `posts` collection in MongoDB:
![Screenshot 2024-09-01 212110](https://github.com/user-attachments/assets/87282c47-996c-4b19-a3e5-f52e61bcafa3)

🔐 User Authentication
----------------------

### Endpoints

-   **Register**: `POST /api/auth/register`
    -   Required Fields: `username`, `password`
-   **Login**: `POST /api/auth/login`
    -   Required Fields: `username`, `password`
-   **Logout**: `POST /api/auth/logout`

### User Access

-   **Logged-in Users**: Can create, edit, and delete their own posts.
-   **Guests**: Can view posts but cannot create or edit.

📝 Features
-----------

### 1\. **Register** 📝

Users can register by providing a username and password.

### 2\. **Login** 🔑

Users log in with their credentials to access their personal dashboard.

### 3\. **Create Post** 🖋️

Logged-in users can create new posts. Ensure to include a title and content.

### 4\. **Edit Post** ✏️

Users can edit their own posts. Only posts created by the logged-in user can be edited.

### 5\. **View Posts** 👀

All users, including guests, can view posts. Posts are displayed with their respective titles and content.

### 6\. **Logout** 🚪

Users can log out of their accounts, which will end their session.

## ⚙️ File Structure


### Root Directory

```/blog-platform
|-- /client
|   |-- /src
|       |-- /pages
|           |-- CreatePage.js
|           |-- EditPage.js
|           |-- IndexPage.js
|           |-- LoginPage.js
|           |-- PostPage.js
|           |-- RegisterPage.js
|-- /api
|   |-- /models
|       |-- post.js
|       |-- user.js
|   |-- /uploads
|       |-- [uploaded files]
|   |-- index.js
|-- .env
|-- package.json
|-- README.md
```

### Description of Key Files and Folders

-   **`/client/src/pages`**: Contains React components for various pages:

    -   `CreatePage.js`: Page for creating a new post.
    -   `EditPage.js`: Page for editing an existing post.
    -   `IndexPage.js`: Home page displaying all posts.
    -   `LoginPage.js`: Page for user login.
    -   `PostPage.js`: Page for viewing a single post.
    -   `RegisterPage.js`: Page for user registration.
-   **`/api/models`**: Contains Mongoose models:

    -   `post.js`: Schema for blog posts.
    -   `user.js`: Schema for user information.
-   **`/api/uploads`**: Directory for storing uploaded files, such as images associated with blog posts.

-   **`/api/index.js`**: Entry point for the back-end API, including routes and middleware.

📝 Contributing
---------------

Contributions are welcome! Please submit issues, suggestions, or pull requests to improve the project.

📧 Contact
----------

For any inquiries, please reach out to slygrin005@gmail.com.

Thank you for using the Blog Platform! Happy blogging! 🎉