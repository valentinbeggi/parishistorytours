import React, { useState } from "react";
import { useBooking } from "../BookingContext";

interface Props {
  next: () => void;
  back: () => void;
}

const StepParticipants: React.FC<Props> = ({ next, back }) => {
  const { booking, setBooking } = useBooking();
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [moreCount, setMoreCount] = useState("");

  const selectCount = (count: number) => {
    setSelectedCount(count);
    setMoreCount("");
    setBooking({ ...booking, participants: count });
    setTimeout(next, 300);
  };

  const selectMoreCount = (count: string) => {
    if (count) {
      const num = parseInt(count);
      setSelectedCount(null);
      setMoreCount(count);
      setBooking({ ...booking, participants: num });
      setTimeout(next, 300);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-6 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Step 2: Number of participants
      </h3>

      <div className="space-y-4">
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

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-4 justify-center">
            <span className="text-gray-700 font-medium">5 or more people:</span>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:border-blue-400 focus:outline-none cursor-pointer"
              value={moreCount}
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
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={back}
          className="text-blue-500 text-sm font-medium hover:text-blue-600 transition cursor-pointer"
        >
          ← Change tour selection
        </button>
      </div>
    </div>
  );
};

export default StepParticipants;
