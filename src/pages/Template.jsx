import React, { use, useRef } from "react";
import logo from "../assets/logo.png";
import { Context } from "../providers/Context";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import toast, { Toaster } from "react-hot-toast";

const Template = () => {
  const receiptRef = useRef();
  const { formData } = use(Context);

  const {
    reservationNo,
    roomNo,
    nationality,
    guestNo,
    contact,
    arrivalDate,
    departureDate,
    passPort,
    roomDetails,
    bookingFees,
    sst,
    tax,
    discount,
    guests,
    policy,
    priceword,
    paymentStatus,
  } = formData || {};

  const ConvertedBookingFees = bookingFees && parseFloat(bookingFees);
  const Convertedsst = sst && parseFloat(sst);
  const ConvertedTax = tax && parseFloat(tax);
  const ConvertedDiscount = discount && parseFloat(discount);
  const totalFees =
    ConvertedBookingFees + Convertedsst + ConvertedTax - ConvertedDiscount;

  const generatePDF = () => {
    const input = receiptRef.current;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.95); // better quality
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with dynamic height
      const pdf = new jsPDF("p", "mm", [imgHeight, imgWidth]); // 10mm buffer

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("booking-receipt.pdf");

      toast.success("Download Completed");
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 text-sm font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <div ref={receiptRef} className="bg-white p-8 border rounded shadow-md">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4">
          <img src={logo} alt="Logo" className="w-lg" />
          <hr className="w-2/3 border-t-2 my-4" />
          <p className="text-xs text-gray-700">
            179, Jalan Pudu, Pudu-55100 Kuala Lumpur, Malaysia <br />
            Hotline: +601116962002, 0178988418 <br />
            E-mail: ecohotel.bb@gmail.com
          </p>
        </div>

        {/* Reservation Info */}
        <div className="grid grid-cols-2  my-6 text-gray-800">
          <div className="space-y-1">
            <p>
              <strong>Reservation No.:</strong> {reservationNo}
            </p>
            <p>
              <strong>Nationality:</strong> {nationality}
            </p>
            <p>
              <strong>Contact:</strong> {contact}
            </p>
            <p>
              <strong>IC / Passport:</strong> {passPort}
            </p>
          </div>

          <div className="space-y-1  ml-20">
            <p>
              <strong>Room No.:</strong> {roomNo}
            </p>
            <p>
              <strong>No. Of Guest:</strong> {guestNo}
            </p>
            <p>
              <strong>Date of Arrival:</strong> {arrivalDate}
            </p>
            <p>
              <strong>Date of Departure:</strong> {departureDate}
            </p>
          </div>
        </div>

        <h2 className="text-center text-lg font-semibold border-b pb-2 mb-6">
          Confirmation of Reservation
        </h2>

        {/* Charges Table */}
        <div className="border border-gray-700 mb-6">
          <div className="flex font-semibold text-white bg-gray-800">
            <div className="w-1/3 py-2 px-2 border-r border-gray-700">
              Other Guests
            </div>
            <div className="w-1/3 py-2 px-2 border-r border-gray-700">
              Particular
            </div>
            <div className="w-1/3 py-2 px-2">Amount</div>
          </div>
          <div className="flex text-sm">
            <div className="w-1/3 px-2 py-2 border-r border-gray-300">
              {guests}
            </div>
            <div className="w-1/3 px-2 py-2 border-r border-gray-300">
              <p>{roomDetails}</p>
              <p>SST (8%)</p>
              <p>TOURISM TAX</p>
              <p>FnF Discount</p>
            </div>
            <div className="w-1/3 px-2 py-2">
              <p>RM {bookingFees}</p>
              <p>RM {sst}</p>
              <p>RM {tax}</p>
              <p>RM {discount}</p>
            </div>
          </div>
        </div>

        {/* Total & Policy */}
        <div className="border border-gray-300 p-4 mb-6">
          <div className="flex justify-between font-semibold text-base mb-1">
            <p>Total Price:</p>
            <span>RM {totalFees}</span>
          </div>
          <p className="text-xs text-gray-600">
            (Including GST + Tourism Tax + Service Charge)
          </p>
          <p className="mt-2">
            <strong>Pricing Policy:</strong> {policy}
          </p>
          <p>
            <strong>Net Price In Words:</strong> {priceword}
          </p>
          <p>
            <strong>Payment Status:</strong> {paymentStatus}
          </p>
        </div>

        {/* Notice */}
        <div className="text-xs text-justify border border-black p-4 leading-relaxed bg-gray-50">
          <p className="mb-2">
            <strong>Bill To Mr.:</strong> {contact}
          </p>
          <p>
            NOTICE TO GUESTS: This property is privately owned and the
            management reserves the right to refuse service to anyone.
            Management will not be responsible for accidents or injury to guests
            or for loss of money, jewellery or valuables of any kind. Management
            will not be responsible for any item left in the room. CHECKOUT
            TIME: 12:00 AM SELF REGISTRATION ONLY. I AGREE that my liability for
            this bill is not waived and agree to be held personally liable in
            the event that the indicated person or company failed to pay for any
            part or full amount of these charges including any missing/damaged
            items, etc.. I agree that if an attorney is retained to collect
            these charges, I will pay all reasonable attorney's fees and costs
            incurred. If payment is by credit card you are authorized to charge
            my account for all charges incurred, including any and all
            damages/missing items, etc.. I agree that the sole purpose of
            renting this room is for my own residency only.
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={generatePDF}
          className="px-5 cursor-pointer py-2 bg-purple-800 text-white font-medium rounded hover:bg-purple-900 transition duration-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Template;
