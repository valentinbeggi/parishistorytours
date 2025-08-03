import React from "react";
import { useBooking } from "../BookingContext";
import BookingCalendar from "../../BookingCalendar";

interface Props {
  next: () => void;
  back: () => void;
  active: boolean;
}

const StepCalendarRegular: React.FC<Props> = ({ next, back, active }) => {
  const { booking, setBooking } = useBooking();

  if (!active || booking.tourType !== "regular") return null;

  const handleDateSelect = (date: string, time: string) => {
    setBooking({ ...booking, date, time });
    setTimeout(next, 300);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-6 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Step 4: Choose a date
      </h3>

      <div className="flex justify-center">
        <BookingCalendar tour={booking.tour!} onSelect={handleDateSelect} />
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

export default StepCalendarRegular;
