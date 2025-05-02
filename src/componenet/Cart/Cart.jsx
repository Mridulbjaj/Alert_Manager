import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoginContext from "../Context/LoginContext";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLogin } = useContext(LoginContext);

  // Fetch cart data when the user logs in
  useEffect(() => {
    async function fetchCart() {
      if (!isLogin) return;

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8000/v1/cart/${isLogin}`);
        if (response.data.success) {
          setCart(response.data.cart);
        } else {
          setError("Failed to fetch cart");
        }
      } catch (error) {
        console.log(error);
        setError("Something went wrong while fetching the cart.");
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [isLogin]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white flex items-center justify-between py-4 shadow-md px-5">
        <Link to="/" className="cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-red-500 text-xl md:text-2xl font-bold text-center flex-1">
          YOUR CART PRODUCTS
        </h2>
      </div>

      <div className="container mx-auto p-4 md:p-6 mt-16 max-w-screen-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          🛒 Your Cart
        </h1>

        {!cart || cart.items.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md rounded-lg gap-4 md:gap-6 w-full"
              >
                {/* Product Image */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md max-w-full"
                />

                {/* Product Info */}
                <div className="text-center md:text-left flex-1 w-full">
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">Price: ₹{item.product.price}</p>
                </div>

                {/* Quantity */}
                <div className="text-lg font-semibold">Qty: {item.quantity}</div>
              </div>
            ))}
          </div>
        )}

        {cart && cart.items.length > 0 && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">Total: ₹{cart.totalPrice}</h2>
            <button className="mt-3 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 w-full md:w-auto">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
