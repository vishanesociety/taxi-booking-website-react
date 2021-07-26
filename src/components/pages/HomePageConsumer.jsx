import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";


{/*  Declearing global  */}
let nameUser = "";
let idUser = "";

const HomePageConsumer = () => {
  const { id } = useParams();
  useEffect(async () => {
    const result = await Axios.get("http://localhost:3003/consumers/" + id);
    console.log(result.data.name);
    nameUser = result.data.nameUser;
    idUser = result.data.id;
    loadBooking();
  }, []);
  
  const history = useHistory();
  const [bookings, setBookings] = useState([]);
  const [driverDetails, setDriverDetails] = useState([]);
  const [data, setData] = useState({
    id: idUser,
    origin: "",
    destination: "",
    price: "",
    pickUp: "",

    status: "unconfirmed",
    driver: "",
  });

  const { origin, destination, price, pickUp, status } = data;

  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:3003/bookings", data);
      history.push(`/homePageConsumer/${id}`);
    } catch (err) {
      alert("error accured please try again later");
    }
  };
  let driverId ="";
  const loadBooking = async () => {
      const bookingDet = await Axios.get(`http://localhost:3003/bookings/${idUser}`);
      console.log(bookingDet.data);
      driverId = bookingDet.data.driver;
      
      if(bookingDet.data.status == "confirmed"){
          const result2 = await Axios.get(`http://localhost:3003/drivers/${driverId}`) 
          setBookings(bookingDet.data)
          setDriverDetails(result2.data)
          
      }
  }

  return (
    <>
      <h1 className="display-6 mt-2">hello, {nameUser} </h1>
      <div className="container mb-5">
        <div className="row">
          <form
            className="row col-md-6 m-auto mt-2"
            onSubmit={(e) => onSubmit(e)}
          >
            <div className="col-12">
              <label for="inputAddress" className="form-label">
                <b> Origin </b>
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                name="origin"
                value={origin}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col-12">
              <label for="inputAddress2" className="form-label">
                <b> Destination </b>
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Enter Destination"
                name="destination"
                value={destination}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div class="col-md-6 m-auto">
              <label for="inputEmail4" class="form-label">
                <b> Price </b>
              </label>
              <input
                type="text"
                class="form-control"
                name="price"
                value={price}
                placeholder="Enter price"
                onChange={(e) => onInputChange(e)}
                id="inputEmail4"
              />
            </div>

            <label className="mt-4" for="time">
              <b> Pickup Time </b>
            </label>
            <input
              className="w-50 m-auto"
              type="time"
              name="time"
              value={pickUp}
              onChange={(e) => onInputChange(e)}
              id="appt"
            />

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-warning w-100 btn-block mt-5"
              >
                Book Now
              </button>
            </div>
          </form>
          <div className=" mt-5 bg-dark mb-4">
            <p className="display-6 text-white">Your Booking Details</p>
          </div>
          <div className="row">
<table class="table">
  <thead>
    <tr>
      <th scope="col">Drigin</th>
      <th scope="col">Destination</th>
      <th scope="col">Time</th>
      <th scope="col">Price</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
   <tbody>
   
       <td>{bookings.origin}</td>  
      <td>{bookings.destination}</td>  
      <td>{bookings.time}</td>  
      <td>{bookings.price}</td>  
      <td>{bookings.status}</td> 
  </tbody> 
  
</table>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Phone number</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
     
    </tr>
  </thead>
   <tbody>
   
    <tr>
        <td>{driverDetails.id}</td>
        <td>{driverDetails.nameUser}</td>
        <td>{driverDetails.email}</td>
        
    </tr>
    
  </tbody> 
  
</table>
          </div>
        </div>
      </div>



      {/* modals */}
      
{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button> */}



    </>
  );
};

export default HomePageConsumer;
