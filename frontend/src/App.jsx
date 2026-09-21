import './App.css'

import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Explore from './pages/Explore'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UploadSkill from './pages/UploadSkill'
import Requests from './pages/Requests'
import Contact from './pages/Contact'
import Connections from './pages/Connections'
import Messages from './pages/Messages'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'


function App() {

  return (

    <BrowserRouter>

      <div className="app">

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile/:id" element={<Profile />} />

          <Route path="/upload-skill" element={<UploadSkill />} />

          <Route path="/requests" element={<Requests />} />

          <Route path="/connections" element={<Connections />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/messages/:id" element={<Messages />} />

        </Routes>

      </div>

    </BrowserRouter>

  )
}

export default App