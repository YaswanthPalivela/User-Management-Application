# User Management App

A simple React-based user management application that allows users to view, add, edit, and delete users. It interacts with the JSONPlaceholder API to simulate backend functionality.

## Features

- Display a list of users with details (ID, First Name, Last Name, Email, Department)
- Add a new user
- Edit existing user details
- Delete users
- Pagination (5 users per page)
- Client-side form validation
- Responsive design

## Technologies Used

- React.js
- React Router
- Axios (for API requests)
- Tailwind CSS (for styling)
- JSONPlaceholder API (mock backend)

## Installation & Setup

**Install Dependencies**

    npm install
      
**Run the Application**
    
      npm run dev
      
Open in Browser The app will be available at http://localhost:5173/ (Vite default port).

1. **Clone the Repository**
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME

2. **Project Structure**

    /user-management-app
    │── src/
    │   ├── components/
    │   │   ├── Home.js      // Displays users with pagination
    │   │   ├── UserForm.js  // Add/Edit user form
    │   ├── App.js           // Main component with routes
    │   ├── index.js         // Entry point
    │── package.json
    │── README.md
    │── tailwind.config.js   // Tailwind CSS configuration
    │── vite.config.js       // Vite configuration


