import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar, Loader, ProtectedRoutes } from './components';
import { Home, LogIn, ProductDetail, Purchases, PurchasesDetail } from './pages'



function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      setIsLoading(false);
    }

    setTimeout(load, 2000)
  }, [])


  return (
    <HashRouter>
      {isLoading ? <Loader /> : (
        <>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/login' element={<LogIn />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases />} />
              <Route path='/purchases/:id' element={<PurchasesDetail />} />
            </Route>
          </Routes>
        </>
      )}

    </HashRouter>
  )
}

export default App
