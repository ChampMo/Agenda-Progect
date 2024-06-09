import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import AllWork from '../app/AllWork.jsx';
import Landing from '../app/Landing.jsx';
import Login from '../app/Login.jsx';
import Workspace from '../app/Workspace.jsx';
import Setting from '../components/setting-menu/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "allwork",
    element: <AllWork/>
  },
  {
    path: "workspace",
    element: <Workspace/>
  },
  {
    path: "setting",
    element: 
    <>
      <div className="container-setting">
        <Setting type={'setting'}/>
      </div>
    </>
    
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
