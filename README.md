# MoveX

MoveX is a modern parcel delivery and tracking platform designed for reliable home and office deliveries across Bangladesh. It provides a complete logistics workflow for customers, administrators, and delivery riders.

## 📌 Project Overview

MoveX simplifies the parcel delivery process by allowing users to create delivery orders, calculate delivery costs, make secure online payments, and track parcels using a unique tracking ID.

The platform includes three dedicated roles:

- User
- Admin
- Rider

Each role has specific features and responsibilities to manage the complete parcel delivery process.

## ✨ Features

### 👤 User Features

- User registration and authentication
- Create parcel delivery orders
- Add sender and receiver information
- Select region and service center
- Dynamic delivery cost calculation
- Secure online payment
- Unique parcel tracking ID
- Track parcel delivery status
- Manage all parcels
- View parcel details
- View payment history
- Update profile information
- Submit service reviews

### 🛠️ Admin Features

- Admin dashboard with statistics
- Manage users
- Search users by email
- Filter users by role
- Promote users to admin
- Manage riders
- Approve or reject rider applications
- Assign riders for parcel pickup
- Assign riders for parcel delivery
- Manage parcel delivery routes
- Monitor parcel status
- Track parcel movement
- View payment history
- Monitor service center activity
- View delivery analytics

### 🚚 Rider Features

- Rider dashboard
- View assigned pickup tasks
- View assigned delivery tasks
- Confirm parcel pickup
- Confirm parcel delivery
- Update parcel status
- View sender and receiver information
- Manage rider profile
- Track earnings
- View current delivery tasks

## 📦 Parcel Status

MoveX supports the following parcel delivery statuses:

- Unpaid
- Paid
- Ready for Pickup
- In Transit
- Reached Service Center
- Shipped
- Ready for Delivery
- Delivered

## 💳 Payment System

Users can securely pay for their parcels through an integrated online payment system.

After successful payment:

1. Payment information is saved.
2. A unique tracking ID is generated.
3. A tracking record is created.
4. The user receives payment and tracking information.

## 📍 Parcel Tracking

Every paid parcel receives a unique tracking ID. Users can use this ID to monitor the parcel's delivery progress.

The tracking system records important delivery events such as:

- Parcel assigned for pickup
- Parcel picked up
- Parcel received at service center
- Parcel shipped
- Parcel assigned for delivery
- Parcel delivered

## 📊 Dashboard

MoveX provides responsive dashboards for different user roles.

### User Dashboard

- Parcel statistics
- Parcel status overview
- User information
- Parcel tracking
- Payment information

### Admin Dashboard

- Total customers
- Total riders
- Delivered parcels
- Service centers
- Earnings
- Parcel statistics
- Payment history

### Rider Dashboard

- Total earnings
- Parcels to pickup
- Parcels to deliver
- Current tasks
- Rider information

## 🔐 Authentication & Authorization

MoveX uses role-based access control to provide different features for different users.

### Roles

- `user`
- `admin`
- `rider`

Protected routes ensure users can only access features available to their assigned role.

## 🧰 Technologies Used

### Frontend

- React
- React Router
- Tailwind CSS
- DaisyUI
- JavaScript
- Axios
- TanStack Query
- React Hook Form
- Recharts
- SweetAlert2
- React Icons
- Firebase Authentication

### Backend

- Node.js
- Express.js
- MongoDB
- Firebase Admin
- REST API

### Payment

- Stripe

### Deployment

- Vercel
