import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './routes/Register'
import Login from './routes/Login'
import Home from './routes/Home'
import LandingPage from './routes/LandingPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path="/app" element={<App/>}>
                      <Route path="home" element={<Home/>}/>
                      <Route path="register" element={<Register/>}/>
                      <Route path="login" element={<Login/>}/>
                      <Route path="*" element={
                          <main>
                          </main>
                      }></Route>
                  </Route>
          </Routes>

      </BrowserRouter>
  </React.StrictMode>
)
