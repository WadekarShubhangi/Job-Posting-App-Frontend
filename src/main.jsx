import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import JobDetails from './pages/JobDetails.jsx'
import PostJob from './pages/PostJob.jsx'


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/jobdetails/:jobId",  element: <JobDetails />},
  { path: "/postjob",  element: <PostJob />},

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RouterProvider router={router} />
  </StrictMode>,
)
