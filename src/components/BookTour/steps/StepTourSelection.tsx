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
    // Supprimer la progression automatique pour permettre à l'utilisateur de voir sa sélection
    // setTimeout(next, 300);
  };

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        {tours.map(({ id, label, img, subtitle }) => {
          const isSelected = booking.tour === id;

          return (
            <div
              key={id}
              className={`tour-option w-full md:w-1/2 max-w-sm cursor-pointer 
                transition-all duration-300 transform hover:scale-105 
                ${!isSelected && booking.tour ? "opacity-50" : "opacity-100"}`}
              onClick={() => choose(id)}
            >
              <div
                className={`relative rounded-lg overflow-hidden shadow-md ${
                  isSelected ? "ring-4 ring-gray-600" : ""
                }`}
              >
                <img
                  src={img}
                  alt={label}
                  className="w-full h-48 object-cover"
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center
                  ${isSelected ? "bg-black/30" : "bg-black/20"}`}
                >
                  <span className="text-white text-2xl font-bold tracking-wider drop-shadow-lg">
                    {label}
                  </span>
                </div>
              </div>
              <p
                className={`text-center mt-3 text-sm transition-colors ${
                  isSelected ? "text-gray-800 font-medium" : "text-gray-600"
                }`}
              >
                {subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepTourSelection;
