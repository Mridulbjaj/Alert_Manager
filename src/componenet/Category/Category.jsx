import { ArrowLeft } from "lucide-react"; // Import back arrow icon
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCard from "../SearchBar/CategoryCard";
import { useSearchParams, Link } from "react-router-dom"; // ✅ Corrected import

function Category() {
    const [searchParams] = useSearchParams(); // ✅ Fixed usage
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [page, searchParams.get("Name")]);

    const fetchProducts = async () => {
        if (!hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8000/v1/Product/?page=${page}&search=${name}` // ✅ Fixed API URL
            );

            console.log("Response:", response);

            const newProducts = response.data.data;
            setProducts((prev) => [...prev, ...newProducts]);

            if (newProducts.length < 15) {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

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
        <>
            {/* Fixed Top Bar */}
            <div className="fixed top-0 left-0 w-full z-10 bg-white flex items-center justify-center py-4 shadow-md">
                {/* Back Arrow */}
                <Link to="/" className="absolute left-4 cursor-pointer"> {/* ✅ Fixed wrapping */}
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                {/* Centered Title */}
                <h2 className="text-red-500 text-2xl font-bold">OUR BEST PRODUCTS</h2>
            </div>

            {/* Main Content */}
            <div className="min-h-screen bg-blue-100 pt-28 px-4">
                {loading && products.length === 0 ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="mt-4">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <CategoryCard key={product.product_id} product={product} />
                            ))
                        ) : (
                            <p className="text-center mt-10 text-red-500 text-2xl">
                                No products found.
                            </p>
                        )}
                    </div>
                )}

                {loading && products.length > 0 && (
                    <div className="flex justify-center my-4">
                        <span className="loading loading-bars loading-md text-blue-500"></span>
                    </div>
                )}
            </div>
        </>
    );
}

export default Category;
