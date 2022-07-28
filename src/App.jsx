import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { NavBar, Loader } from './components'
import { Home, LogIn, ProductDetail, Purchases } from './pages'
import { useSelector } from "react-redux";


function App() {

  const isLoading = useSelector(state=> state.isLoading);


  return (
    <HashRouter>
      <NavBar />
      {isLoading &&  <Loader />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<ProductDetail />}/>
        <Route path='/login' element={<LogIn />}/>
        <Route path='/purchases' element={<Purchases />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
