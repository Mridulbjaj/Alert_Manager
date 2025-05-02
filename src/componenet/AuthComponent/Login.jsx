import { useContext, useState } from "react";
import LoginContext from "../Context/LoginContext";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ onClose }) {
  const { setisLogin } = useContext(LoginContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    console.log("hello");
    e.preventDefault();
    setError(""); // Clear previous errors
   
    try {
      const response = await axios.post("http://localhost:8000/v1/User/login", {
        email,
        password,
      });
      
      if (response.data.success) {
        console.log("id",response.data.data);
        setisLogin(response.data.data);
        setError("You are logged in");
      } else {
        setError(response.data.message || "Invalid credentials.");
      }
    } catch (error) {
     setError("Something went wrong. Please try again.");
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg md:w-[400px] :ml-4  w-[500px] flex">
        {/* Left Section */}
        <div className="w-1/3 bg-blue-600 p-6 text-white flex flex-col justify-center rounded-l-xl">
          <h2 className="text-xl font-bold">Login</h2>
          <p className="text-sm mt-2">
            Get access to your Orders, Wishlist, and Recommendations.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="w-2/3 p-6 relative">
          {/* Close Button */}
          <button className="absolute top-2 right-3 text-gray-500" onClick={onClose}>
            ✖
          </button>

          {/* Input Fields */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="text-gray-600 text-sm">Enter Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full border-b border-gray-400 py-2 outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Enter Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full border-b border-gray-400 py-2 outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Show Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Login Button */}
            <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">
              LOGIN
            </button>

            {/* Terms & Privacy Policy */}
            <p className="text-xs text-gray-600">
              By continuing, you agree to RGJASHOPs{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>.
            </p>

            {/* Signup Link */}
            <Link to="/signup"> 
            <p className="text-sm text-center text-blue-500 hover:underline cursor-pointer">
              New to RGJASHOPs? Create an account
            </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
