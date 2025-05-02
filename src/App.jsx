import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./componenet/Home";
import Category from "./componenet/Category/Category";
import Product from "./componenet/Product/Product";
import LoginContext from "./componenet/Context/LoginContext";
import { useState } from "react";
import Cart from "./componenet/Cart/Cart";
import Signup from "./componenet/AuthComponent/Signup";

function App() {
  const [isLogin, setisLogin] = useState(null); 
  
  return (
       
    <> 
    <LoginContext.Provider value={{isLogin,setisLogin}}> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/Product" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      </LoginContext.Provider> 
    </>
     

    
    
      
  );
}

export default App
