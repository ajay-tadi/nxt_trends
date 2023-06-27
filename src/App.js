import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'
import React from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
  import Cart from './components/Cart'
  import NotFound from './components/NotFound'

  import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetailsView from './components/ProductsDetailsView'
  // 

        

  const App = () => (
    <BrowserRouter >
     <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />  
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/products/:id/" element={<ProtectedRoute><ProductDetailsView /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate replace to='not-found' />} />
        
        
    </Routes>
    </BrowserRouter>
   
    

)

export default App


