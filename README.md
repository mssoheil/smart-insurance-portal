# Smart Insurance Application Portal

A dynamic React.js web application that allows users to apply for various types of insurance (Health, Home, Car, Life, etc.) through conditionally rendered forms, fetched from an API in real time. The app also includes a user-friendly submissions dashboard with sorting, filtering, and customizable columns.

## 🚀 Features

### 🎨 Theme Switcher

- Light / Dark / Auto modes
- Auto respects OS preferences

### ✅ Smart Dynamic Form

Fetches form structure from API — no hardcoded fields

Renders nested and conditional fields based on user input

Supports dynamically loaded select options (e.g., states per country)

Field validation before submission

Clean UX with responsive design

### 📄 Submission Dashboard

View previously submitted applications

Dynamically choose which columns to show

Sort, filter, and paginate the list

## 🛠 Tech Stack

React 18

Ant Design

Tailwind

TypeScript

Axios

## 🔧 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/mssoheil/smart-insurance-portal.git
cd smart-insurance-portal

# 2. Inside the root, create a .env file and add a property called VITE_BASE_URL with the value of the backend api url

# 3. Install dependencies
npm install

# 4. Run the project
npm run dev
```

## 🌐 API Usage

📥 Fetch Form Structure

GET /api/insurance/forms

Returns the structure of one or more dynamic insurance forms.

📤 Submit Filled Form

POST /api/insurance/forms/submit

Sends the form data to the server.

📄 Fetch Submitted Applications

GET /api/insurance/forms/submissions

Returns a list of submitted applications and columns to display.

## 🌍 Deployment

```bash
npm run build
```
