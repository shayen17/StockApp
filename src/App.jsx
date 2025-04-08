import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useReducer } from 'react'
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import  Navbar  from './components/NavBar/Navbar'
import AppRoutes from './routes/Routes'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ItemsContext,ItemsReducer } from './components/context/itemsContext'


function App() {
  const initialState = []  
  const [items,dispatch] = useReducer(ItemsReducer,initialState)
 

  return (
    <>
  <Router>
    <ItemsContext.Provider value={{items,dispatch}}>
    <Navbar/>
    <AppRoutes/>
    </ItemsContext.Provider>
  </Router>
  </>

  )
}

export default App
