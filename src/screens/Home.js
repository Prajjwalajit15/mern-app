import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import Card from "../components/Card"; 

export default function Home() {
    const [search,setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://mern-app-backend-so3k.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFoodItem(response.foodItems);
    setFoodCat(response.foodCategory);

    // console.log(response.foodItems,response.foodCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important" }}>
                <div className="carousel-inner">
                    {/* Search bar container */}
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center align-items-center">
                            <input
                                className="form-control mr-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                style={{ width: "1000px" }}
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                            />
                            {/* <button
                                className="btn btn-outline-success text-white bg-success"
                                type="submit"
                                style={{ marginLeft: "10px" }}
                            >
                                Search
                            </button> */}
                        </div>
                    </div>

                    {/* Carousel items */}
                    <div className="carousel-item active">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
                            className="d-block w-100"
                            alt="Pizza"
                            style={{ height: '400px', objectFit: 'cover', opacity: 0.6 }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1672242676665-39db88975682?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGZvb2R8ZW58MHx8MHx8fDA%3D"
                            className="d-block w-100"
                            alt="Burger"
                            style={{ height: '400px', objectFit: 'cover', opacity: 0.6 }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
                            className="d-block w-100"
                            alt="Food Plate"
                            style={{ height: '400px', objectFit: 'cover', opacity: 0.6 }}
                        />
                    </div>
                </div>

                {/* Carousel controls */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div className="row mb-3">
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLowerCase())))  
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card foodItem = {filterItems}
                        options={filterItems.options[0]} 
                      >
                        {" "}
                      </Card>
                    </div>
                  ))
              ) : (
                <div>no such data found</div>
              )}
            </div>
          ))
        ) : (
          <div>""""""""</div>
        )} 
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
