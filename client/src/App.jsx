import './App.css'
import  'bootstrap/dist/css/bootstrap.css';
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import User from './User';
import Admin from './Admin';
import Admincheck from './Admincheck';
import Updateproduct from './Updateproduct';
import ContactForm from './ContactForm';
import About from './About';
import FAQ from './FAQ'
import PrivacyPolicy from './PrivacyPolicy';
import Cart from './Cart';
import Wishlist from './Wishlist';
import ProductList from './ProductList';
import Success from './Success';
// import Success from './Success'.

function App() {
  

  return (
    <>
    
      <BrowserRouter>

      
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={ <Admin />} />
          <Route path="/contact" element={ <ContactForm />} />
          <Route path="/update" element={ <Updateproduct />} />
           <Route path="/cart" element={ <Cart />} />
            <Route path="/wishlist" element={ <Wishlist />} />
          <Route path="/about" element={ <About />} />
          <Route path="/privacy" element={ <PrivacyPolicy />} />
          <Route path="/faq" element={ <FAQ />} />
           <Route path="/products" element={ <ProductList />} />
             <Route path="/success" element={ <Success />} />
          <Route path="/admin/check" element={ <Admincheck />} />
        </Routes>
     

      </BrowserRouter>
    </>
    
  )
}

export default App
