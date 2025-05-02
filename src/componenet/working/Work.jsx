

const Card = ({ image, title, description }) => {
  return (
    <div className="bg-blue-100 shadow-md rounded-xl p-6 text-center w-60">
      {/* Image/Icon */}
      <img src={image} alt={title} className="mx-auto h-16 w-16 mb-4" />

      {/* Title */}
      <h3 className="font-bold text-lg">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
};
function Work(){
  const cards = [
    {
      image: "https://cdn-icons-png.flaticon.com/128/5998/5998671.png", // Replace with actual icon
      title: "Open the app",
      description: "Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/128/3186/3186310.png", // Replace with actual icon
      title: "Place an order",
      description: "Add your favourite items to the cart & avail the best offers",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/128/11443/11443209.png", // Replace with actual icon
      title: "Get free delivery",
      description: "Experience lightning-fast speed & get all your items delivered in 10 minutes",
    },
  ];

  return (
    <>
        <h2 className="text-center ">How it Works</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-10">
    
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
    </>
    
  );
};

export default Work;
