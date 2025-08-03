import React, { useState, useEffect } from "react";
import { useBooking } from "../BookingContext";

interface Props {
  next: () => void;
  back: () => void;
}

const StepContact: React.FC<Props> = ({ next, back }) => {
  const { booking, setBooking } = useBooking();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const ready = !!name && !!email;

  useEffect(() => {
    if (ready) {
      setBooking({ ...booking, name, email, phone });
      setTimeout(next, 500);
    }
  }, [name, email, phone, ready]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-6 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Step 5: Contact Information
      </h3>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="contact-name"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="contact-email"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number (optional)
          </label>
          <input
            type="tel"
            id="contact-phone"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
            placeholder="+33 1 23 45 67 89"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={back}
          className="text-blue-500 text-sm font-medium hover:text-blue-600 transition cursor-pointer"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default StepContact;
