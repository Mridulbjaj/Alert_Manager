import { useContext} from "react";
import { Star, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../Context/LoginContext";
import axios from "axios";
function CategoryCard({ product }) {
  const { isLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  function handleClick(clickedEvent) {
    const data = { clickedEvent };
    axios.post("http://localhost:8000/v1/history/add", {
      userId: isLogin,
      productId: product.product_id,  // use clickedEvent not product
    })
    .then((response) => {
      if (response.data.success) {
        console.log("Product added to history successfully.");
      } else {
        console.warn("History add failed:", response.data.message);
      }
  
      // Navigate only after API call finishes (regardless of success)
      navigate("/Product", { state: { product: product } });
    })
    .catch((error) => {
      console.error("Error adding to history:", error);
      // Still navigate even if request fails
      navigate("/Product", { state: { product: product } });
    });
  }
  
  
  return (
    <div
      className="flex flex-col sm:flex-row items-center sm:justify-between border p-4 my-5 rounded-lg shadow-md bg-white 
                 max-w-[90%] md:max-w-[900px] w-full mx-auto cursor-pointer gap-4"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] flex-shrink-0">
        <span className="absolute top-1 left-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
          Bestseller
        </span>
        <img
          src={product.img_link || "/placeholder.jpg"}
          alt={product.product_name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
  
      {/* Product Details */}
      <div className="flex flex-col text-center sm:text-left w-full sm:w-[40%]">
        <h2 className="text-base sm:text-lg font-semibold">{product.product_name}</h2>
  
        {/* Ratings */}
        <div className="flex items-center justify-center sm:justify-start text-green-700 font-semibold text-xs sm:text-sm mt-1">
          <span className="bg-green-700 text-white px-2 py-0.5 rounded flex items-center">
            {product.rating} <Star size={14} className="ml-1" />
          </span>
        </div>
  
        {/* Specifications */}
        <ul className="text-xs sm:text-sm text-gray-700 mt-2 space-y-1">
          <li>{product.category}</li>
          <li className="text-blue-500">{product.about_product}</li>
        </ul>
  
        <h3 className="text-sm sm:text-xl font-bold mt-1">Stock {product.stock}</h3>
      </div>
  
      {/* Pricing & Offers */}
      <div className="flex flex-col text-center sm:text-right w-full sm:w-[30%]">
        <h3 className="text-base sm:text-2xl font-bold">{product.discounted_price}</h3>
        <p className="text-gray-500 line-through text-xs sm:text-sm">{product.actual_price}</p>
        <p className="text-green-600 font-semibold text-xs sm:text-sm">{product.discount_percentage} off</p>
        <p className="text-purple-600 font-semibold text-xs sm:text-sm mt-1">Saver Deal</p>
  
        <div className="flex items-center justify-center sm:justify-end text-blue-600 text-xs sm:text-sm mt-2">
          <ShieldCheck size={16} className="mr-1 text-blue-600" />
          Assured
        </div>
      </div>
    </div>
  );
  
}

export default CategoryCard;
