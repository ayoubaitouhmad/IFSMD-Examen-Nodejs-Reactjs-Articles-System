```markdown:app-backend/README.md
# Blog Application Backend

This is the backend for a blog application, built with Node.js and MongoDB. It provides RESTful API endpoints for managing articles, users, categories, and file uploads.

## Prerequisites

- Node.js (v14 or later recommended)
- MongoDB (v4.4 or later)
- npm (usually comes with Node.js)

## Setup

1. Clone the repository:
   ```
git clone <https://github.com/ayoubaitouhmad/IFSMD-Examen-Nodejs-Reactjs-Articles-System/tree/mern>
cd app-backend
   ```

2. Install dependencies:
   ```
npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the `app-backend` directory with the following contents:
   ```
MONGODB_CONNECTION_STRING=<your-mongodb-connection-string>
MONGODB_DB_NAME=<your-database-name>
DB_ARTICLES_COLLECTION_NAME=articles
DB_USERS_COLLECTION_NAME=users
DB_CATEGORIES_COLLECTION_NAME=categories
DB_FILES_COLLECTION_NAME=files
DB_ARTICLE_CATEGORY_COLLECTION_NAME=article_categories
   ```
   Replace `<your-mongodb-connection-string>` and `<your-database-name>` with your actual MongoDB connection details.

## Running the Application

To start the server in development mode:

```
npm run dev
```

For production:

```
npm start
```

The server will start on `http://localhost:3000` by default (you can change this in the server configuration).

## API Endpoints

Here are some of the main API endpoints:

- `GET /api/articles`: Fetch all articles
- `GET /api/articles/:id`: Fetch a specific article
- `POST /api/articles`: Create a new article
- `PUT /api/articles/:id`: Update an existing article
- `DELETE /api/articles/:id`: Delete an article

Similar endpoints exist for users, categories, and file uploads

## Database Migrations
To create mongodb schema
```
npm run db:migrate
```


## Database seeding
To populate the database with sample data:
```
npm run db:seed
```

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
```

