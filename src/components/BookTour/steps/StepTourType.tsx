import React, { useState } from "react";
import { useBooking } from "../BookingContext";
import type { TourType } from "../types";

interface Props {
  next: () => void;
  back: () => void;
}

const tourTypes: { id: TourType; title: string; description: string }[] = [
  {
    id: "regular",
    title: "Regular Tour",
    description: "Join a tour with up to 10 travelers",
  },
  {
    id: "private",
    title: "Private Tour",
    description: "Schedule a private tour for your group only",
  },
];

const StepTourType: React.FC<Props> = ({ next, back }) => {
  const { booking, setBooking } = useBooking();
  const [selectedType, setSelectedType] = useState<TourType | null>(null);

  const selectType = (tourType: TourType) => {
    setSelectedType(tourType);
    setBooking({ ...booking, tourType });
    setTimeout(next, 300);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-6 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Step 3: Choose your tour type
      </h3>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {tourTypes.map(({ id, title, description }) => (
          <button
            key={id}
            className={`flex-1 max-w-sm cursor-pointer transition-all duration-200 p-4 border-2 rounded-lg ${
              selectedType === id
                ? "border-gray-600 bg-gray-600 text-white"
                : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onClick={() => selectType(id)}
          >
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">{title}</h4>
              <p className="text-sm">{description}</p>
            </div>
          </button>
        ))}
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

export default StepTourType;
