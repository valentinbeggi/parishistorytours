import React from "react";
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
  const selectedType = booking.tourType;

  const selectType = (tourType: TourType) => {
    setBooking({ ...booking, tourType });
  };

  return (
    <div>

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
    </div>
  );
};

export default StepTourType;