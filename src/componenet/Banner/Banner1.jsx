function Banner1() {
  return (
    <>
        <div className="carousel w-full h-[250px]  md:h-[400px] mt-28">
        <div id="item1" className="carousel-item w-full h-full">
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/c1bf4e97384ebd48.jpg?q=20"
            className="w-full h-full object-cover"
          />
        </div>
        <div id="item2" className="carousel-item w-full h-full">
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/91f975d4cbb7ee07.jpg?q=20"
            className="w-full h-full object-cover"
          />
        </div>
        <div id="item3" className="carousel-item w-full h-full">
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/63f47aa6a19098cc.jpeg?q=20"
            className="w-full h-full object-cover"
          />
        </div>
        <div id="item4" className="carousel-item w-full h-full">
          <img
            src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/10d4132940d94a13.jpeg?q=20"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-3">
        <a href="#item1" className="btn btn-sm">1</a>
        <a href="#item2" className="btn btn-sm">2</a>
        <a href="#item3" className="btn btn-sm">3</a>
        <a href="#item4" className="btn btn-sm">4</a>
      </div>
    </>
  );
}

export default Banner1;
