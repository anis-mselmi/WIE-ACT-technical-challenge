# AgriNova

## Backend models (MongoDB + Mongoose)

I added production-ready Mongoose models for User, Product, Ride, ForumPost and Comment in the project root:

- `backend_models_user.js` - User schema with profile, role enum, password hashing (bcrypt) and indexes.
- `backend_models_product.js` - Product schema with farmer ref, images, text indexes and timestamps.
- `backend_models_ride.js` - Ride schema for ride-sharing with driver ref and passengers.
- `backend_models_forumpost.js` - ForumPost schema with category enum and text search.
- `backend_models_comment.js` - Comment schema referencing ForumPost and User.
- `backend_models_index.js` - Central exporter to `require('./backend_models_index')`.

Quick setup to try the require-only test (does not connect to DB):

```powershell
cd C:\Users\MSI\Desktop\AgriNova-main
npm install
node backend_models_require_test.js
```

Notes:
- The project `backend_package.json` lists `mongoose` and `bcrypt`. If you use a different package for hashing (e.g. `bcryptjs`) update `backend_models_user.js` accordingly.
- To use the models in your app, import from the index:

```js
const { User, Product, Ride, ForumPost, Comment } = require('./backend_models_index');
```

Frontend (React) notes:

- The frontend uses TailwindCSS classes and an Axios helper at `frontend_src_api.js`. Set the API base URL via `REACT_APP_API_URL` in your `.env` for the client.
- To run the frontend (from project root):

```powershell
cd C:\Users\MSI\Desktop\AgriNova-main
# if using create-react-app style scripts in frontend_package_Version1.json, run the appropriate command, e.g.:
npm run start # or check frontend package.json scripts
```

If you use the same repository root for server and client, ensure client requests go to the correct API base (e.g. http://localhost:5000).


**AgriNova** is a MERN stack platform empowering women farmers with a marketplace, ride-sharing, and community forum.

## Features

- **Auth:** Secure registration, login, profile management (JWT)
- **Marketplace:** Buy/sell agricultural products
- **Rides:** Offer and join ride-sharing for agricultural logistics
- **Forum:** Share advice, ask questions, and connect
- **Dashboard:** View personal products, rides, forum posts

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React, TailwindCSS, Axios
- **Seed Data:** Sample farmers, buyers, products, rides, forum posts, and comments

## Getting Started

1. Clone the repo
2. Install dependencies in `/backend` and `/frontend`
3. Setup `.env` files using `.env.example`
4. Run `node seed.js` in `/backend` to populate MongoDB
5. Start backend and frontend servers

## Folder Structure

- `/backend` — Express API, MongoDB models, seed script
- `/frontend` — React app

---

Made with 💚 for women in agriculture!
