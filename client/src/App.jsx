// IMPORTS
import React from 'react'
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom'
import { Home, Profile, Login, Register, Single, Write, EditProfile } from './pages';
import { Footer, Navbar } from './components';
import "./style.scss"

// FOR PAGES THAT WILL CONTAIN THE NAVBAR AND FOOTER
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

// PAGES ROUTES
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/edit-profile/:id",
        element: <EditProfile />
      },
      {
        path: "/write",
        element: <Write />
      },
      {
        path: "/post/:id",
        element: <Single />
      },
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

const App = () => {
  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App