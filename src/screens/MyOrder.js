import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");

    const response = await fetch("http://localhost:5000/api/myorderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });

    const result = await response.json();
    setOrderData(result.orderData?.order_data || []);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData
              .slice(0)
              .reverse()
              .map((orderGroup, index) => {
                const orderDate = orderGroup[0]?.Order_date;
                const items = orderGroup.slice(1); // Skip the first element (Order_date)

                return (
                  <div key={index} className="col-12 mb-4">
                    {/* Display Order Date */}
                    <div className="mt-4">
                      <h5>Order Date: {orderDate}</h5>
                    </div>

                    <div className="row">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="col-12 col-md-6 col-lg-3 mb-4"
                        >
                          <div
                            className="card"
                            style={{ width: "16rem", maxHeight: "360px" }}
                          >
                            {/* <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <p className="card-text">
                                Quantity: {item.qty} <br />
                                Size: {item.size} <br />
                                Price: ₹{item.price}/-
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="m-auto text-center mt-5">
              <h3>No Orders Found</h3>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
