import { useState, useEffect, useContext } from "react";
import LoginContext from "../Context/LoginContext";

function RecommendedProduct() {
  const { isLogin } = useContext(LoginContext);
  const [list, setList] = useState([]);
  console.log("isLogin", isLogin);

  useEffect(() => {
    if (isLogin) {
      console.log("Recommended product isLogin", isLogin);

      fetch(`http://localhost:8000/v1/Product/${isLogin}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.data) {
            setList(data.data);
          } else {
            console.warn("No product data received");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [isLogin]);

  // Check if `list` is an array and its length is greater than 0 before rendering
  if (!Array.isArray(list) || list.length === 0) {
    return <p className="text-center text-4xl font-semibold text-gray-700 mt-6">
    No recommended products available.
  </p>
  ; // Optional: Add a message for empty list.
  }

  return (
    <div className="w-[85%] mx-auto my-4 p-4">
      <div className="bg-blue-50 rounded-xl shadow-sm p-4 mb-6">
        <p className="text-[28px] md:text-[36px] font-semibold text-gray-900 mt-6 mb-4 border-b-2 border-gray-200 pb-2">
          Products For You
        </p>
        <p className="text-gray-600 text-sm mb-4">
          We have selected these products just for you
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-start">
        {list.map((item, index) => {
          const actual_price = parseInt(item.actual_price.replace(/[₹,]/g, ""), 10);
          const discount_percentage = item.discount_percentage.split("%")[0];
          const discounted_price = Math.round(
            actual_price - (actual_price * discount_percentage) / 100
          );
          return (
            <div
              key={index}
              className="w-[200px] bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="w-full h-[180px] border-b border-gray-200 flex items-center justify-center bg-gray-100">
                <img
                  src={item.img_link}
                  alt="Error"
                  className="object-contain w-full h-full p-2"
                />
              </div>

              {/* Info */}
              <div className="p-3 space-y-1">
                <p className="text-sm font-medium truncate" title={item.product_name}>
                  {item.product_name}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-green-600">
                    ₹{discounted_price}
                  </p>
                  <p className="text-sm text-gray-500 line-through">₹{actual_price}</p>
                  <span className="text-xs text-red-600 font-bold">{discount_percentage}% OFF</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendedProduct;
