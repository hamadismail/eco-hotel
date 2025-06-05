import React, { use } from "react";
import { useNavigate } from "react-router";
import { Context } from "./providers/Context";

function App() {
  const navigate = useNavigate();
  const { setFormData } = use(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      reservationNo: form.reservationNo.value,
      roomNo: form.roomNo.value,
      nationality: form.nationality.value,
      guestNo: form.guestNo.value,
      contact: form.contact.value,
      arrivalDate: form.arrivalDate.value,
      passPort: form.passport.value,
      departureDate: form.departureDate.value,
      roomDetails: form.roomdetails.value,
      bookingFees: form.bookingfees.value,
      sst: form.sst.value,
      tax: form.tax.value,
      discount: form.discount.value,
      guests: form.guests.value,
      policy: form.policy.value,
      priceword: form.priceword.value,
      paymentStatus: form.paymentstatus.value,
    };

    setFormData(data);
    navigate("/template");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-center text-4xl font-bold text-purple-800">
          ECO HOTEL
        </h2>
        <p className="text-center mt-2 bg-purple-900 text-white rounded py-1 font-medium">
          Book Reservation Now
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Fields */}
            {[
              {
                label: "Reservation No.",
                name: "reservationNo",
                placeholder: "e.g. LIS 176335497",
                required: true,
              },
              { label: "Room No.", name: "roomNo", placeholder: "e.g. 403" },
              {
                label: "Nationality",
                name: "nationality",
                placeholder: "e.g. Bangladeshi",
              },
              {
                label: "No. Of Guest",
                name: "guestNo",
                placeholder: "e.g. Maximum 04",
              },
              {
                label: "Contact",
                name: "contact",
                placeholder: "e.g. Md. Abdullah Al Mamun",
              },
              {
                label: "Date of Arrival",
                name: "arrivalDate",
                placeholder: "e.g. 06.05.2025",
                type: "date",
              },
              {
                label: "IC / Passport",
                name: "passport",
                placeholder: "e.g. A16529137",
              },
              {
                label: "Date of Departure",
                name: "departureDate",
                placeholder: "e.g. 10.05.2025",
                type: "date",
              },
              {
                label: "Booking Fees",
                name: "bookingfees",
                placeholder: "e.g. 1400.00",
                type: "number",
              },
              {
                label: "SST (8%)",
                name: "sst",
                placeholder: "e.g. 112.00",
                type: "number",
              },
              {
                label: "TOURISM TAX",
                name: "tax",
                placeholder: "e.g. 40.00",
                type: "number",
              },
              {
                label: "FnF Discount",
                name: "discount",
                placeholder: "e.g. 352.00",
                type: "number",
              },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  className="mt-1 px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            ))}

            {/* Textarea Fields */}
            {[
              {
                label: "Room Details",
                name: "roomdetails",
                placeholder: "e.g. FAMILY SUITE ROOM (4 X 350)",
                required: true,
              },
              {
                label: "Other Guests",
                name: "guests",
                placeholder: "e.g. Hima Islam, P- A16454761",
              },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <textarea
                  className="mt-1 px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  name={field.name}
                  rows={2}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            ))}

            {/* Long Inputs */}
            {[
              {
                label: "Pricing Policy",
                name: "policy",
                placeholder: "e.g. D. Friend’s & Family Discount Package",
              },
              {
                label: "Net Price In Words",
                name: "priceword",
                placeholder:
                  "e.g. Malaysian Ringgit One Thousand Two Hundred Only.",
              },
              {
                label: "Payment Status",
                name: "paymentstatus",
                placeholder: "e.g. Received Full amount through Bank Transfer.",
              },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  className="mt-1 px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="w-full md:w-1/2 cursor-pointer bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Generate Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
