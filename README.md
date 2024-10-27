# 🚗 Rental Car Platform

A complete car rental platform with user management, reservation scheduling, and integration-ready APIs, developed using the latest technologies. The app provides a seamless experience for both customers and administrators to handle reservations, view available cars, and manage rentals.

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Prerequisites](#prerequisites)
- [Installing & Running the App](#-installing--running-the-app)
- [Database Management](#💾-database-management)
- [Login Credentials](#🔐-login-credentials)
- [Troubleshooting](#🛠-troubleshooting)
- [Future Improvements](#🔮-future-improvements)
- [Contact](#📞-contact)

## 🚀 Getting Started

Follow these steps to set up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure the following software is installed:

- **Node.js** (v22.9) & **npm**
- **.NET Core SDK** (.NET 8)
- **Angular CLI** (v17)

## 🔧 Installing & Running the App

1. **Clone the repository:**
    ```bash
    git clone https://github.com/anderj14/rental-car.git
    cd rental-car
    ```

2. **Install npm packages:**
    ```bash
    npm install
    ```

3. **Run the API (from the API folder):**
    ```bash
    dotnet watch --no-hot-reload
    ```

4. **Run the client (from the Client folder):**
    ```bash
    ng serve
    ```

### Database Setup (SQLite)

To view the database, use the SQLite extension in Visual Studio Code:

1. Install the extension.
2. Open it via `CTRL + P`, then type `> sqlite: Open Database`.
3. Once opened, you’ll find the SQLite tab in the explorer.

## 💾 Database Management

For testing purposes, the project uses SQLite, which will be replaced by PostgreSQL in production.

### Database Commands

1. **Delete Database:**
    ```bash
    dotnet ef database drop -p Infrastructure -s API -c RentalContext
    ```

2. **Delete Migrations:**
    - You can remove migrations directly by deleting the migrations folder in the Infrastructure project, or run the following commands:
    ```bash
    dotnet ef migrations remove -p Infrastructure -s API -c RentalContext
    ```

3. **Create Migrations:**
    ```bash
    dotnet ef migrations add InitialEntity -p Infrastructure -s API -c RentalContext -o Data/Migrations
    ```

### Database Seeding

Test data will be automatically populated into the SQLite database each time the API is run.

## 🔐 Login Credentials

To explore the application, you can use the following credentials:

- **Admin Login:**
    - Email: `admin@test.com`
    - Password: `Pa$$w0rd`

## 🛠 Troubleshooting

If you encounter issues, try the following solutions:

- **Database or Migration Issues:** If issues arise, consider dropping the database and re-running the migrations.
- **Reinstalling Dependencies:** Sometimes, re-installing packages can help:
    ```bash
    npm install
    ```

For further assistance, please reach out to the contact email below.

## 🔮 Future Improvements

In the final production version, the SQLite database will be migrated to PostgreSQL to enhance scalability and security. The application will also be prepared for deployment on the web with environment-specific configurations.

## 📞 Contact

For any questions or assistance, feel free to reach out:

- Email: [andersonfrias001@gmail.com](mailto:andersonfrias001@gmail.com)
