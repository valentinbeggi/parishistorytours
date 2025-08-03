import React from "react";
import { useBooking } from "../BookingContext";
import type { Tour } from "../types";

interface Props {
  next: () => void;
}

const tours: { id: Tour; label: string; img: string; subtitle: string }[] = [
  {
    id: "left-bank",
    label: "Left Bank",
    img: "/photos/pantheon_de_Paris.webp",
    subtitle: "Resistance & Liberation",
  },
  {
    id: "right-bank",
    label: "Right Bank",
    img: "/photos/place_vendome_paris.webp",
    subtitle: "Occupation & Collaboration",
  },
];

const StepTourSelection: React.FC<Props> = ({ next }) => {
  const { booking, setBooking } = useBooking();

  const choose = (tour: Tour) => {
    setBooking({ ...booking, tour });
    setTimeout(next, 300);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Step 1: Choose your tour
      </h3>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        {tours.map(({ id, label, img, subtitle }) => (
          <button
            key={id}
            className="w-full md:w-1/2 max-w-sm cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={() => choose(id)}
          >
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <img src={img} alt={label} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-white text-2xl font-bold tracking-wider drop-shadow-lg">
                  {label}
                </span>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-3 text-sm">{subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepTourSelection;
