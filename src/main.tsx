import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App'
import Login from './pages/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/register';
import { isLogged } from './services/login';
import BookIndex from './pages/book/index'

const router = createBrowserRouter([
  {
    path: "/",
    element: localStorage.getItem('token') != null ? <BookIndex/> : <Navigate to={'/login'}/>,
  },
  {
    path: "/login",
    element: localStorage.getItem('token') != null ? <Navigate to={'/'}/> : <Login/>,
  },
  {
    path: "/register",
    element: localStorage.getItem('token') != null ? <Navigate to={'/'}/> : <Register/>,
  },
  {
    path: "/buku",
    element: localStorage.getItem('token') != null ? <BookIndex/> : <Navigate to={'/login'}/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
