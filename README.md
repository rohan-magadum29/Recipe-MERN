
# 🍳 Recipe Management Application

A full-stack MERN application for managing recipes, including image uploads, search, and category filtering.

## Features

- Create, view, edit, and delete recipes.
- Search recipes and filter by category.
- View recipe details, ingredients, and cooking instructions.
- Upload, preview, and replace recipe images.
- Store images using Cloudinary and automatically delete associated images when recipes are deleted.
- Responsive UI with form validation and API error handling.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, TanStack React Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Image Upload:** Multer, Cloudinary

## Project Structure

Recipe MERN/
├── frontend/       # React application (Port 5173)
├── backend/        # Node.js & Express API (Port 3000)
└── README.md

## Prerequisites

- Node.js and npm
- MongoDB (Local or MongoDB Atlas)
- Cloudinary account

## Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd Recipe MERN
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm run server
```

Backend runs at: http://localhost:3000

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: http://localhost:5173

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/recipes` | Fetch all recipes |
| GET | `/api/recipes/:id` | Fetch recipe by ID |
| POST | `/api/recipes` | Create a recipe |
| PUT | `/api/recipes/:id` | Update a recipe |
| DELETE | `/api/recipes/:id` | Delete a recipe |
| POST | `/api/upload` | Upload recipe image |

## API Testing

Import the Postman collection included in the repository into Postman.

Set the API base URL to `http://localhost:3000` and use the collection to test the REST APIs.

## Author

**Rohan Magadum**
