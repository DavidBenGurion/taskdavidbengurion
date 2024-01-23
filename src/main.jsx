import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import router from './Router.jsx'
import {RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
ReactDOM.createRoot(document.getElementById('root2')).render(
  <React.StrictMode>
            <RouterProvider router={router}/>
  </React.StrictMode>
)
