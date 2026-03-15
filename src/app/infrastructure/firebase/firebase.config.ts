import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCnEA9yLWbnFOLvrDGPzbowcPU3O8rrUFw",
  authDomain: "test-todo-app-bdb6b.firebaseapp.com",
  projectId: "test-todo-app-bdb6b",
  storageBucket: "test-todo-app-bdb6b.firebasestorage.app",
  messagingSenderId: "30783195991",
  appId: "1:30783195991:web:14d5be1a39cf62e1bb0c12",
  measurementId: "G-HSKYMMCBBE"
};

export const firebaseApp = initializeApp(firebaseConfig);
