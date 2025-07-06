# CSI-KKWIEER Student Committee Portal

A robust, full-featured **MERN Stack web application** built for the CSI-KKWIEER student body to manage, display, and organize all club activities including events, photo galleries, member participation, and administrative tasks. Supports **role-based access**, **event registrations**, **photo management**, and **automated reporting**.

---

## Overview

This platform was built to solve the operational and management challenges faced by college student clubs. The application offers:

-  **Admin-level event and gallery management**
-  **Role-based access control (RBAC)** with **JWT authentication**
-  **Admin dashboard** for registrations, reports, and analytics
-  **User dashboard** to track their participation and club activities
-  Auto-generated Excel sheets for registration data
-  Filterable and pinnable photo gallery

---

## Key Features

### Authentication & Authorization

- JWT-based login system with:
  - Admin role: full access (CRUD for events/photos, reporting)
  - User role: view-only + event registration
- Secure route protection via middleware

### Event Management

- Add, edit, delete events (admin)
- Pin/unpin important events
- Filter by **status**: upcoming, ongoing, past
- User registrations with real-time Excel export
- User dashboard to view past and upcoming registrations

### Gallery Management

- Add, delete, pin photos
- Filter photos by:
  - Event name
  - Date range
- Auto-sync with respective event timelines
- Responsive frontend with dynamic galleries

### Admin Dashboard

- View event-wise registration lists
- Export registrations as downloadable `.xlsx` files
- Edit post-event reports
- Monitor user participation

### User Dashboard

- Track registered events
- Browse past event galleries
- View upcoming CSI-KKWIEER activities

---

## Tech Stack

| Layer         | Technology                  |
|---------------|------------------------------|
| **Frontend**   | React.js, Axios, Tailwind CSS |
| **Backend**    | Express.js, Node.js          |
| **Database**   | MongoDB + Mongoose           |
| **Auth**       | JWT (JSON Web Tokens)        |
| **Excel Export** | ExcelJS                    |
| **Cloud & Deployment** | Render / Netlify (can be adapted to any full-stack hosting) |

---

## Project Structure
```bash

csi-kkwieer-portal/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Admin & User dashboard pages
│ │ ├── services/ # Axios APIs
│ │ └── App.js
│ └── public/
│
├── server/ # Node.js backend
│ ├── controllers/ # Logic for each route
│ ├── models/ # Mongoose schemas (Event, Photo, User, etc.)
│ ├── routes/ # Express route definitions
│ ├── middleware/ # JWT, role-based access control
│ ├── utils/ # Excel generation, date filters
│ └── index.js # Entry point
│
├── .env
├── package.json
└── README.md

```

## How to Run Locally

### Prerequisites

- Node.js >= 16
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Clone the Repository

```bash
git clone https://github.com/your-username/csi-kkwieer-portal.git
cd csi-kkwieer-portal
```

## Set up Environment Variables
Create a .env file in /server with:

ini
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
## Install Backend Dependencies
bash
Copy
Edit
cd server
npm install
npm run dev  # Starts backend at http://localhost:5000
## Install Frontend Dependencies
bash
Copy
Edit
cd ../client
npm install
npm start  # Starts frontend at http://localhost:3000
Now you can access the full app at http://localhost:3000 with backend connected.

## Admin Credentials (Dev Only)
You can use the seed script or register a user manually in DB with "role": "admin" to access admin dashboard and features.

## Example Use Case Flow
Admin Login ➝ Adds new event ➝ Pins it

User Login ➝ Views events ➝ Registers

Admin Dashboard ➝ Views registrations ➝ Exports .xlsx

Event Completed ➝ Admin uploads report & photos

User Dashboard ➝ Views event history and gallery

## Testing
JWT-protected routes tested with Postman

React components tested with React Testing Library

MongoDB queries validated using mock data

Role-based frontend routes fully protected


## Security Practices
Hashed passwords (bcrypt)

JWT-based secure authentication

Role-based access middleware

Input validation & file upload limits

## Future Improvements
 Email notifications for event registration
 
 Analytics Dashboard for admins
 
 Lazy-loading and cloud-based image storage
 
 PWA compatibility for mobile access
 
 QR Code-based event entry & validation

## License
This project is licensed under the MIT License. See LICENSE for more details.

## Acknowledgements
CSI-KKWIEER Student Committee

Mongoose, React, and ExcelJS communities

All testers and users from the KKWIEER campus 💙
