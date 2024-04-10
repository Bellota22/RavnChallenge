# Task Manager - Raven Technical Test

This project is a Task Manager developed as part of a technical test for Raven. It allows users to manage their tasks efficiently and productively.

## Features

- **Task Management:** Allows users to create, edit, delete, and mark tasks as completed.
- **Task Filtering:** Users can filter their tasks by status, due date, tags, etc.
- **Point Estimation:** Each task can have an associated point estimation for prioritizing work.
- **Intuitive Interface:** Clean and user-friendly design for an optimal user experience.

## Technologies Used

- **Vite:** Fast build tool for modern JavaScript projects.
- **Mantine:** React component framework with emphasis on accessibility and ease of use.
- **Apollo Client:** GraphQL client for fetching and managing data from a GraphQL server.

## Project Setup

Follow these steps to set up and run the project on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/task-manager.git
   ```
2. **Install dependencies:**
   ```bash
    cd task-manager
    npm install
   ```
3. **Create .env file:**
   ```bash
    VITE_URI=https://syn-api-prod.herokuapp.com/graphql/
    VITE_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiYTMzNWI3ZmMtNGNkOC00ZTYwLTgwYmYtMTEyNjQwMWM1ZTU4IiwicHJvamVjdElkIjoiY2ZiNzYzM2UtZWEyMC00MzMwLWIzYzAtZDBlYjg1ZDA0MmM1IiwiZnVsbE5hbWUiOiJHYWJyaWVsIFZpbGxhbnVldmEgVmVnYSIsImVtYWlsIjoiZ3ZpbGxhbnVldmF2ZWdhQGdtYWlsLmNvbSIsImlhdCI6MTcxMjM0MTQwOX0.cbSRxKibjwpY-MyHV0Bpy3GG3LMcqGC_dTuzYambGqM
   ```  
4. **Start the Development Server:**
   ```bash
    npm run dev
   ```
5. **Start the Development Server:**
   Open the Application in your Browser:
Open your web browser and visit http://localhost:5173

## Contribution
If you wish to contribute to this project, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/new-feature).
Make your changes and commit them (git commit -am 'Add new feature').
Push your branch (git push origin feature/new-feature).
Open a Pull Request.