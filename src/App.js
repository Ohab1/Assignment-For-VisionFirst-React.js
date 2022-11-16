
import Login from './Login/Login'
import Register from './Register/Register'
import { Route, Routes } from 'react-router-dom'
import AdminScreen from './Admin_Screens/AdminScreen'
import NormalUserScreen from './NormalUserScreens/NormalUserScreen'
import './App.css'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} ></Route>
        <Route path='/login' element={<Login />} ></Route>


        <Route path='/register' element={<Register />} ></Route>
        <Route path='/AdminScreen' element={<AdminScreen />} ></Route>
        <Route path='/NormalUserScreen' element={<NormalUserScreen />} ></Route>

      </Routes>

    </div>
  )
}
