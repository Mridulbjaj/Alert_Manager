import { ShoppingCart, Bolt, ArrowLeft } from "lucide-react";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginContext from "../Context/LoginContext";
import axios from "axios";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const { isLogin } = useContext(LoginContext);
  const [cartMessage, setCartMessage] = useState("");

  

  
  async function handleAddCart() {
    console.log(isLogin, "Product add begin");
    try {
      const response = await axios.post("http://localhost:8000/v1/cart/add", {
        userId: isLogin,
        productId: product.product_id,
        quantity: 1,
      });

      if (response.data.success) {
        console.log("Product added successfully");
        setCartMessage("✅ Product added to cart successfully!");
      } else {
        setCartMessage("❌ " + response.data.message);
      }
    } catch (error) {
      setCartMessage("❌ Error adding product to cart.");
      console.error(error);
    }
  }

  if (!product) {
    return <div className="text-center text-red-500">No product data found.</div>;
  }
          const actual_price = parseInt(product.actual_price.replace(/[₹,]/g, ""), 10);
          const discount_percentage = product.discount_percentage.split("%")[0];
          const discounted_price = Math.round(
            actual_price - (actual_price * discount_percentage) / 100
          );
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-700 shadow-md py-3 px-4 flex items-center justify-between sticky top-0 z-10">
        <div onClick={() => navigate(-1)} className="flex items-center text-white hover:text-gray-300 cursor-pointer">
          <ArrowLeft className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-white">RGJASHOPs Products</h1>
        <div></div>
      </nav>

      {/* Product Details */}
      <div className="max-w-5xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex flex-col space-y-4">
            <img
              src={product.img_link || "/placeholder.jpg"}
              alt={product.product_name}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{product.product_name}</h2>
            <p className="text-gray-600 text-sm mt-1">{product.about_product}</p>

            {/* Ratings and Category */}
            <div className="flex items-center space-x-2 mt-3">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">{product.rating} ★</span>
              <span className="text-gray-500 text-sm">
                {Array.isArray(product.category) ? product.category.join(" > ") : product.category}
              </span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <div className="text-2xl font-semibold text-gray-900">{discounted_price}</div>
              <div className="text-gray-500 line-through text-sm">{product.actual_price}</div>
              <div className="text-green-600 font-medium">{product.discount_percentage} off</div>
            </div>

        
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Purchase Options</h3>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <button
              onClick={isLogin ? handleAddCart : () => alert("Please login first!")}
              className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow w-full md:w-auto"
            >
              <ShoppingCart className="w-5 h-5 mr-2" /> ADD TO CART
            </button>
            <a
              href={product.product_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow w-full md:w-auto"
            >
              <Bolt className="w-5 h-5 mr-2" /> BUY NOW
            </a>
          </div>

          {cartMessage && (
            <p className="mt-3 text-sm font-semibold text-gray-700">{cartMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

