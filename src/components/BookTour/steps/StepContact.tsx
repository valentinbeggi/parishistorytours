import React from "react";
import { useBooking } from "../BookingContext";

interface Props {
  next: () => void;
  back: () => void;
}

const StepContact: React.FC<Props> = ({ next, back }) => {
  const { booking, setBooking } = useBooking();
  // Utiliser directement les valeurs du contexte au lieu de states locaux
  const name = booking.name || "";
  const email = booking.email || "";
  const phone = booking.phone || "";

  const updateName = (value: string) => {
    setBooking({ ...booking, name: value });
  };

  const updateEmail = (value: string) => {
    setBooking({ ...booking, email: value });
  };

  const updatePhone = (value: string) => {
    setBooking({ ...booking, phone: value });
  };

  return (
    <div>
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
            onChange={(e) => updateName(e.target.value)}
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
            onChange={(e) => updateEmail(e.target.value)}
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
            onChange={(e) => updatePhone(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StepContact;
