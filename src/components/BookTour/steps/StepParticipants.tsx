import React, { useState } from "react";
import { useBooking } from "../BookingContext";

interface Props {
  next?: () => void;
  back?: () => void; // Make back optional
}

const StepParticipants: React.FC<Props> = ({ next, back }) => {
  const { booking, setBooking } = useBooking();
  // Utiliser directement la valeur du contexte au lieu d'un state local
  const selectedCount = booking.participants;
  const [moreCount, setMoreCount] = useState("");

  const selectCount = (count: number) => {
    setMoreCount("");
    setBooking({ ...booking, participants: count });
  };

  const selectMoreCount = (count: string) => {
    if (count) {
      const num = parseInt(count);
      setMoreCount(count);
      setBooking({ ...booking, participants: num });
    }
  };

  return (
    <div>


      {/* Options 1-4 personnes */}
      <div className="flex gap-3 justify-center">
        {Array.from({ length: 4 }, (_, i) => (
          <button
            key={i + 1}
            className={`p-3 border-2 rounded-lg text-center transition-all duration-200 cursor-pointer min-w-16 ${
              selectedCount === i + 1
                ? "border-gray-600 bg-gray-600 text-white"
                : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onClick={() => selectCount(i + 1)}
          >
            <div className="text-xl font-bold">{i + 1}</div>
            <div className="text-xs">{i === 0 ? "person" : "people"}</div>
          </button>
        ))}
      </div>

      {/* Option "5 or more" */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center gap-4 justify-center">
          <span className="text-gray-700 font-medium">5 or more people:</span>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:border-blue-400 focus:outline-none cursor-pointer"
            value={selectedCount !== undefined && selectedCount >= 5 ? selectedCount.toString() : ""}
            onChange={(e) => selectMoreCount(e.target.value)}
          >
            <option value="">Select...</option>
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 5} value={i + 5}>
                {i + 5} people
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        {back && (
          <button
            onClick={back}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
};

export default StepParticipants;