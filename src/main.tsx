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
import BookTambah from './pages/book/tambah'
import BookDetail from './pages/book/detail'
import BookEdit from './pages/book/edit'

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookIndex/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/buku",
    element: <BookIndex/>,
  },
  {
    path: "/buku/:bookId",
    element: <BookDetail/>,
  },
  {
    path: "/buku/tambah",
    element: <BookTambah/>,
  },
  {
    path: "/buku/edit/:bookId",
    element: <BookEdit/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
