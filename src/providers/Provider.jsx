import React, { useState } from "react";
import { Context } from "./Context";

const Provider = ({ children }) => {
  const [formData, setFormData] = useState({
    reservationNo: "",
    roomNo: "",
    nationality: "",
    guestNo: "",
    contact: "",
    arrivalDate: "",
    passPort: "",
    departureDate: "",
    roomDetails: "",
    bookingFees: "",
    sst: "",
    tax: "",
    discount: "",
    guests: "",
    policy: "",
    priceword: "",
    paymentStatus: "",
  });
  const userData = {
    formData,
    setFormData,
  };
  return <Context value={userData}>{children}</Context>;
};

export default Provider;
