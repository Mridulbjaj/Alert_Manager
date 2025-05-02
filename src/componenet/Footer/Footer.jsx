
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-gray-800 mt-10 p-8">
      {/* Popular Searches */}
      <div className="max-w-7xl mx-auto">
        <h3 className="font-bold text-lg">Popular Searches</h3>
        <div className="text-sm text-gray-600 mt-2">
          <p>
            <strong>Products</strong> : Bottle gourd | Lady finger | Potato | Lemon | Dalchini | Fennel seeds | Blueberry | Papaya | Dragon fruit
          </p>
          <p>
            <strong>Brands</strong> : Yakult | My Muse | Aashirvaad Atta | Too Yumm | Lays | Figaro Olive Oil | Nandini Milk | Amul | Mother Dairy
          </p>
          <p>
            <strong>Categories</strong> : Grocery | Curd | Hukka flavour | Paan shop near me | Eggs price | Cheese slice | Fresh fruits
          </p>
        </div>
      </div>

      {/* Categories
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-5 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          "Fruits &Vegetables",
          "Baby Food",
          "Breakfast &Sauces",
          "Cleaning Essentials",
          "Homegrown Brands",
          "Atta, Rice, Oil &Dals",
          "Dairy, Bread &Eggs",
          "Tea, Coffee &More",
          "Home Needs",
          "Paan Corner",
          "Masala &DryFruits",
          "Cold Drinks &Juices",
          "Biscuits",
          "Electricals &Accessories",
          "Sweet Cravings",
          "Munchies",
          "Makeup &Beauty",
          "Hygiene &Grooming",
          "Frozen Food &IceCreams",
          "Meats, Fish &Eggs",
          "Bath &Body",
          "Health &BabyCare",
        ].map((category, index) => (
          <p key={index} className="font-semibold text-sm">
            {category}
          </p>
        ))}
      </div> */}

      {/* Social and Links */}
      <div className="border-t mt-6 pt-6 flex flex-wrap justify-between items-center max-w-7xl mx-auto">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-500">RGJA<span className="text-3xl font-bold text-yellow-500">Shops</span></h2>
          <div className="flex space-x-4 text-gray-600 text-xl">
            <FaInstagram />
            <FaTwitter />
            <FaFacebook />
            <FaLinkedin />
          </div>
        </div>

        {/* Center Links */}
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm text-gray-700">
          {["Home", "Delivery Areas", "Careers", "Customer Support", "Press", "Privacy Policy", "Terms of Use", "Responsible Disclosure", "RGJASHOPs Blog"].map((link, index) => (
            <p key={index}  className="hover:cursor-pointer hover:underline">
              {link}
            </p>
          ))}
        </div>

        {/* Right Side (Download App) */}
        <div className="flex flex-col space-y-2">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNWBCY0mLUJlEWqBCzmoYXcJEoqYBAyUYzgg&s" alt="Google Play" className="h-6" />
            Get it on Play Store
          </button>
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTogMzNfl5rUzyM9XF1YFFuDe3oJsnpaDBFg&s" alt="App Store" className="h-6" />
            Get it on App Store
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
