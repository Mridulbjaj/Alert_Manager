import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import LoginContext from "../Context/LoginContext";

function SearchBar({ name }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // ✅ Track if more data is available
    const { isLogin } = useContext(LoginContext);

    useEffect(() => {
        setProducts([]); // ✅ Reset when search query changes
        setPage(1);
        setHasMore(true);
    }, [name]);

    useEffect(() => {
        fetchProducts();
    }, [page,name]); // ✅ Fetch products when `page` updates

    const fetchProducts = async () => {
        if (!hasMore) return; // ✅ Stop fetching if no more data

        setLoading(true);
        try {
            if(isLogin){
            const response = await axios.get(`http://localhost:8000/v1/Product/?page=${page}&search=${name}`);
            console.log("Response:", response);

            const newProducts = response.data.data;
            setProducts((prev) => [...prev, ...newProducts]); // ✅ Append new data

            if (newProducts.length < 15) {
                setHasMore(false); // ✅ Stop loading if no more products
            }
        }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Infinite Scroll: Detect when user reaches bottom
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 20
            ) {
                if (!loading && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    return (
        <div className="min-h-screen mt-40">
            {/* Loader (only when initial load and no products) */}
            {loading && products.length === 0 ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="mt-4 px-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <CategoryCard key={product._id} product={product} />
                        )) 
                    ) : (
                        <p className="text-center mt-10 text-red-500 text-2xl">No products found.</p>
                    )}
                </div>
            )}

            {/* Loader when fetching more products */}
            {loading && products.length > 0 && (
                <div className="flex justify-center my-4">
                    <span className="loading loading-bars loading-md text-blue-500"></span>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
