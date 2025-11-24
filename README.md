🛍️ Mamathat — Ecommerce Website (MERN Stack)

Mamathat is a modern, full-featured, and responsive ecommerce platform built using the MERN Stack.
It provides a smooth shopping experience with secure authentication, product browsing, cart management, and order handling.

🚀 Project Overview

Mamathat is a complete ecommerce solution with both frontend (React + Tailwind + Vite) and backend (Node.js + Express + MongoDB).
It includes clean code structure, reusable components, and optimized APIs.

✨ Features
👤 User Features

User Registration & Login (with Google Authentication)

JWT-based authentication

Browse all products

Product search & filtering

Product details page

Add to Cart / Remove from Cart

Checkout system

Order history / order tracking

Fully responsive design

🛒 Admin Features

Add / Edit / Delete products

Manage inventory & stock

Manage orders

Manage users

Dashboard analytics (optional)

🧰 Tech Stack
Frontend

React.js

Vite

Tailwind CSS

Redux Toolkit (optional)

Axios

Firebase Authentication (Google Sign-In)

Backend

Node.js

Express.js

MongoDB

JSON Web Token (JWT)

Bcrypt.js

Cloudinary (optional)

📁 Folder Structure
mamathat/
│
├── client/         # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
└── server/         # Backend server
    ├── controllers/
    ├── routes/
    ├── models/
    ├── middlewares/
    └── config/

🔐 Authentication Flow

User logs in/registers → JWT token generated

Token stored securely (HttpOnly cookie / localStorage)

Protected routes with middleware

Optional Google Auth using Firebase

🛠 Installation & Setup
Clone the repository
git clone https://github.com/your-username/mamathat.git
cd mamathat

Setup Client
cd client
npm install
npm run dev

Setup Server
cd server
npm install
npm start

🌐 Environment Variables
Server .env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_KEY=optional
CLOUDINARY_SECRET=optional

Client .env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_KEY=your_firebase_api_key

📦 API Endpoints
Auth Routes
POST /api/user/register
POST /api/user/login
GET  /api/user/me

Product Routes
GET    /api/products
GET    /api/products/:id
POST   /api/products        (Admin)
PUT    /api/products/:id    (Admin)
DELETE /api/products/:id    (Admin)

Order Routes
POST /api/orders
GET  /api/orders/user
GET  /api/orders            (Admin)

🖼 UI Highlights

Modern elegant design

Smooth animations

Beautiful product cards

Clean checkout UI

Lightweight & fast

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first.
