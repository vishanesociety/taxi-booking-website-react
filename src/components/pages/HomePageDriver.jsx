import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";

let nameUserA = "";
let idUser = ""
let idDriver = ""


const HomePageDriver = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [bookingsUpdate, setBookingsUpdate] = useState({
    "id": "",
      "origin": "",
      "destination": "",
      "price": "",
      "pickUp": "",
      "status": "",
      "driver": "",
      "time": ""
    }
  );

  useEffect(async () => {
    const result = await Axios.get("http://localhost:3003/drivers/" + id);
    console.log(result.data);
    
    nameUserA = result.data.nameUser;
    idDriver = result.data.id;

    loadBookings();
  }, []);

  const loadBookings = async () => {
    const bookingList = await Axios.get("http://localhost:3003/bookings");
    setBookings(bookingList.data);
    idUser = bookingList.data.id;

  };
  const confirm = async (id) => {
    const dt = await Axios.get(`http://localhost:3003/bookings/${id}`)
    console.log(dt.data);
    dt.data.status = "confirmed"
    dt.data.driver = idDriver;
    await Axios.put(`http://localhost:3003/bookings/${id}`, dt.data);
    

  }

  return (
    <>
      <p className="display-5 mt-3">Hello, {nameUserA}</p>
      {/* <p className="display-6 mt-3">List of Bookings</p> */}
      <div className="container">
        <div className="row">
          <table className="table">
            <thead className="mt-4">
              <tr>
                <th scope="col">Phone No</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Pickup</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((bookingList, index) => (
                <tr>
                  <td>{bookingList.id}</td>
                  <td>{bookingList.origin}</td>
                  <td>{bookingList.destination}</td>
                  <td>{bookingList.time}</td>
                  <td>Rs. {bookingList.price}</td>
                  <td>{bookingList.status}</td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => {confirm(bookingList.id)}}>Confirm</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HomePageDriver;
