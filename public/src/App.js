import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import SetAvatar from './pages/SetAvatar'
import Test from './pages/Test'
import {SocketContext, socket} from './store/socket-context'

export default function App() {
  return (
    <SocketContext.Provider value={socket}>
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setAvatar" element={<SetAvatar />} />
      <Route path="/" element={<Chat />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  </BrowserRouter>
  </SocketContext.Provider>)
}
