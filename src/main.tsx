import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Logout from './routes/Logout'
import Home from './routes/Home'
import LandingPage from './routes/LandingPage'
import Login from './routes/Login'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path="login" element={<Login/>}/>
                  <Route path="home" element={<Home/>}/>
                  <Route path="logout" element={<Logout/>}/>
                  <Route path="/app" element={<App/>}>
                      <Route path="home" element={<Home/>}/>
                      <Route path="logout" element={<Logout/>}/>
                      <Route path="*" element={
                          <main>
                          </main>
                      }></Route>
                  </Route>
          </Routes>

      </BrowserRouter>
  </React.StrictMode>
)
