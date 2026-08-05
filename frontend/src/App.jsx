import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { HomePage } from "./pages/HomePage"
import { OrdersPage } from "./pages/OrdersPage"
import ProductsPage from "./pages/ProductsPage"
import { CartPage } from "./pages/CartPage"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"
import { ProductDetailsPage } from "./pages/ProductDetailsPage"
import { AdminDashboard } from "./pages/AdminDashboard"
import ProductForm from "./pages/ProductForm"

import { CartProvider } from "./context/CartContext"
import { Profile } from "./pages/Profile"
import ConfirmOrders from "./pages/ConfirmOrders"

function App() {


  return (
    <>
     
      <div className="hero">
         <CartProvider>
         <BrowserRouter>
        
         <Routes>
          <Route path="/" element={<><Header/> <HomePage/> <Footer/> </>} />
          <Route path="/orders" element={<><Header/> <OrdersPage/> <Footer/> </>} />
          <Route path="/products" element={<><Header/> <ProductsPage/> <Footer/> </>} />
          <Route path="/cart" element={<><Header/> <CartPage/> <Footer/> </>} />
          <Route path="/login" element={<><Header/> <LoginPage/> <Footer/> </>} />
          <Route path="/signup" element={<><Header/> <SignupPage/> <Footer/> </>} />
         
          <Route path="/products/:id" element={<><Header/> <ProductDetailsPage/> <Footer/> </>} />
          <Route path="/admin-dashboard" element={<> <AdminDashboard/>  </>} />
          <Route path="/product-upload" element={<> <ProductForm/>  </>} />
          <Route path="/profile" element={<> <Header/> <Profile /> <Footer/> </>} />
          <Route path="/confirm-order" element={<>  <ConfirmOrders /> </>} />
         </Routes>
        
         </BrowserRouter>
       </CartProvider>
      </div>
    </>
  )
}

export default App
