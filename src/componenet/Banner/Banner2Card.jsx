import { useNavigate } from "react-router-dom";

function Banner2Card({ item }) {
  const navigate = useNavigate();

  function handleClick(name) {
    // Navigate to another page
    navigate(`/category?Name=${name}`);
  }

  return (
    <>
      <div
        className="card bg-base-100 w-20 h-20 md:w-40 md:h-44 shadow-sm hover:cursor-pointer"
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => handleClick(item.name)} // ✅ Corrected placement of onClick
      ></div>
    </>
  );
}

export default Banner2Card;
