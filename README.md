# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Flashcard Learning App

A modern web application for creating and studying flashcards, built with React and Firebase.

## Features

- User authentication with Firebase
- Create and manage flashcard sets
- Study mode with timed sessions
- Progress tracking
- Dark/Light theme toggle
- Responsive design for all devices

## Getting Started

### Prerequisites

- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/flashcard-app.git
cd flashcard-app
```

2. Install dependencies:

```
npm install
```

3. Set up Firebase:

   - Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Authentication in your Firebase project and set up Email/Password sign-in method
   - Get your Firebase configuration from Project Settings > General > Your apps > Firebase SDK snippet > Config
   - Replace the placeholder values in `src/firebase/config.js` with your actual Firebase configuration

4. Start the development server:

```
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser (or the port shown in your terminal).

## Firebase Setup Instructions

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps to create a new project
3. Once your project is created, click on the Web icon (</>) to add a web app to your project
4. Register your app with a nickname (e.g., "Flashcard App")
5. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

6. Replace the placeholder values in `src/firebase/config.js` with your actual Firebase configuration
7. In the Firebase console, go to Authentication > Sign-in method
8. Enable the Email/Password sign-in method
9. Your app is now connected to Firebase authentication!

## Usage

1. Register a new account or log in with an existing account
2. Create flashcard sets or study existing ones
3. Track your progress and improve your knowledge

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React
- Firebase
- Vite
