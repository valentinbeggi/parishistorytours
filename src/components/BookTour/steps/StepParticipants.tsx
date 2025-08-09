import React from "react";
import { useBooking } from "../BookingContext";

interface Props {
  next?: () => void;
  back?: () => void;
}

const StepParticipants: React.FC<Props> = ({ back }) => {
  const { booking, setBooking } = useBooking();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      setBooking({ ...booking, participants: val });
    }
  };

  return (
    <div>
      <select
        value={booking.participants || ""}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 text-gray-700"
      >
        <option value="" disabled>
          Select...
        </option>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>
            {n} {n === 1 ? "person" : "people"}
          </option>
        ))}
      </select>

      <div className="flex justify-between mt-8">
        {back && (
          <button
            onClick={back}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            ← Retour
          </button>
        )}
      </div>
    </div>
  );
};

export default StepParticipants;