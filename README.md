# BitDev Frontend 🚀

## 📌 Overview

BitDev is a **MERN stack** matchmaking platform designed for **developers to connect and collaborate** — imagine Tinder, but for devs! 👨‍💻💬
This repository contains the **frontend** of BitDev, built using **React**, **Redux**, and **TailwindCSS**, with seamless integration to the BitDev backend.

> 🔐 The app supports **JWT-based authentication**, secure session persistence, and dynamic feed filtering.

🌐 **Live Demo**: [bit-dev-frontend.vercel.app](https://bit-dev-frontend.vercel.app)

---

## 🛠️ Tech Stack

-  **Frontend Framework**: [React 19](https://react.dev)
-  **Routing**: [React Router v7](https://reactrouter.com/en/main)
-  **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
-  **Persistence**: [Redux Persist](https://github.com/rt2zz/redux-persist)
-  **Styling**: [TailwindCSS](https://tailwindcss.com/)
-  **Animations**: [Framer Motion](https://www.framer.com/motion/)
-  **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
-  **HTTP Client**: [Axios](https://axios-http.com/)
-  **Build Tool**: [Vite](https://vitejs.dev/)

---

## 🔑 Features

### 👥 User Authentication

-  Sign Up / Login using JWT + cookies
-  Persistent login via Redux Persist
-  Route protection and redirection

### 🧑‍💻 Developer Profiles

-  View and edit user profiles
-  Update password with validation

### 💌 Matchmaking System

-  Browse developers in a swipe-style feed
-  Send “Interested” or “Ignore” requests
-  Accept / reject incoming requests
-  View mutual connections

### 🧠 State Management

-  Global state with Redux Toolkit
-  Auto-persisted session and data

### 🧭 User Experience

-  Smooth animations via Framer Motion
-  Toast notifications for user feedback
-  Responsive UI with TailwindCSS

---

## 📁 Project Structure

src/
├── components/ // Reusable components (Navbar, Cards, etc.)
├── pages/ // Screens (Auth, Dashboard, Profile, etc.)
├── redux/ // Slices and store configuration
├── utils/ // Axios config, helpers
├── App.jsx // Main component with routing
├── main.jsx // Entry point



---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Decarbo/BitDevFrontend.git
cd BitDevFrontend

npm install

VITE_API_BASE=http://localhost:7777

npm run dev
```


🚀 Future Features
🔍 Developer search and filtering

🧵 Chat system with WebSocket

📥 Notification system

🌗 Dark mode support

🧪 Unit testing

🤝 Contributing
Contributions are welcome!
Feel free to fork the repo, make improvements, and submit PRs.

📜 License
This project is licensed under the MIT License.

👨‍💻 Built By
Niraj Prajapati
Connect with me on [LinkedIn](https://www.linkedin.com/in/niraj-prajapati-june18/)
