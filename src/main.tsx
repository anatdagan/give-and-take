import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './routes/Register'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App/>}>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="*" element={
                      <main>
                      </main>
                  }></Route>
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
)
