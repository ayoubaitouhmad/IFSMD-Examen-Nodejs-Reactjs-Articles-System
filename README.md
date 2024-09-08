# Article Management System

## Overview

This project is a full-stack **Article Management System** built with **React** on the frontend and **Node.js/Express** on the backend. The system allows users to create, view, update, and delete articles, as well as add comments. It also includes user authentication and other key features.

## Features

- **Articles**: Users can create, read, update, and delete articles.
- **Comments**: Users can add comments to articles.
- **Authentication**: User login and registration.
- **File Uploads**: Articles or comments may include file uploads.
- **Logging**: The system includes backend logging for debugging purposes.
- **Email Notifications**: Email templates and services for notifying users.

## Tech Stack

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React Router**: For handling client-side routing.
- **Axios**: For making API requests to the backend.

### Backend

- **Node.js**: JavaScript runtime for the backend.
- **Express**: Web framework for Node.js.
- **MongoDB/MySQL**: Database for storing articles, comments, and user data.
- **Mongoose** (or similar ORM if using MongoDB): For schema and database interactions.
- **JWT**: JSON Web Tokens for user authentication.
- **Nodemailer**: For sending emails (as seen in the `emails/` folder).
- **Logging**: Backend logging for error tracking.

## Project Structure

### Frontend (`app-frontend/`)

- **`src/`**: Contains the main source code for the React application.
  - **`components/`**: Reusable UI components.
  - **`pages/`**: Different pages of the application, such as the article listing page, article details page, and user login.
  - **`redux/`**: State management using Redux for handling articles, comments, and user authentication.
- **`public/`**: Public files, including the main HTML file.
- **`package.json`**: Defines project dependencies and scripts for the frontend.

### Backend (`app-backend/`)

- **`server.js`**: The entry point for the backend server.
- **`routes/`**: API endpoints for the backend.
- **`controllers/`**: Business logic for handling requests (e.g., creating articles, handling user login).
- **`models/`**: Defines the database schema for articles, users, and comments.
- **`services/`**: Handles auxiliary services such as sending emails.
- **`config/`**: Configuration files for environment variables, database setup, etc.
- **`uploads/`**: Directory for handling file uploads.
- **`logs/`**: Directory for backend logs (likely errors, requests, etc.).
- **`emails/`**: Email templates for sending notifications to users.

## Installation and Setup

### Prerequisites

- **Node.js**: Make sure you have Node.js installed.
- **MongoDB/MySQL**: Depending on the database you are using, make sure the database service is running.
- **Nodemailer** configuration: Ensure you have the right email service credentials set up in the environment variables.

### Installation Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/article-management-system.git
    cd article-management-system
    ```

2. **Frontend Setup**:
    - Navigate to the `app-frontend/` folder and install the dependencies:
    ```bash
    cd app-frontend
    npm install
    ```

    - Start the React development server:
    ```bash
    npm start
    ```

3. **Backend Setup**:
    - Navigate to the `app-backend/` folder and install the dependencies:
    ```bash
    cd ../app-backend
    npm install
    ```

    - Configure the environment variables by creating a `.env` file:
    ```bash
    touch .env
    ```
    Fill in the required environment variables (e.g., database connection string, email credentials, etc.).

    - Start the backend server:
    ```bash
    npm start
    ```

4. **Access the application**:
    Open the frontend at `http://localhost:3000` and the backend should be running on `http://localhost:5000` or as configured.

## API Endpoints

### Articles
- `GET /api/articles`: Fetch all articles.
- `POST /api/articles`: Add a new article.
- `GET /api/articles/:id`: Fetch a single article.
- `PUT /api/articles/:id`: Update an article.
- `DELETE /api/articles/:id`: Delete an article.

### Comments
- `POST /api/articles/:id/comments`: Add a comment to an article.
- `GET /api/articles/:id/comments`: Fetch comments for a specific article.

### Users
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in a user.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
