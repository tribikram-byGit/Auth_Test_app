
import {Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
//import './App.css'

function App() {
  

  return (
      <div className="h-screen w-full flex justify-center items-center bg-zinc-800">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }/>
        </Routes>
               
      </div>
  )
}

export default App
