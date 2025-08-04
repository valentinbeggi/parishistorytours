import React from "react";
import { useBooking } from "../BookingContext";

interface Props {
  next: () => void;
  back: () => void;
  active: boolean;
}

const StepDateTimePrivate: React.FC<Props> = ({ next, back, active }) => {
  const { booking, setBooking } = useBooking();
  // Utiliser directement les valeurs du contexte
  const date = booking.date || "";
  const time = booking.time || "";

  if (!active || booking.tourType !== "private") return null;

  const updateDate = (value: string) => {
    setBooking({ ...booking, date: value });
  };

  const updateTime = (value: string) => {
    setBooking({ ...booking, time: value });
  };

  const timeOptions = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const formatTime = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${ampm}`;
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Step 4: Choose your preferred date and time
      </h3>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="tour-date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Preferred Date
          </label>
          <input
            type="date"
            id="tour-date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => updateDate(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="tour-time"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Preferred Time
          </label>
          <select
            id="tour-time"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:border-blue-400 focus:outline-none"
            value={time}
            onChange={(e) => updateTime(e.target.value)}
          >
            <option value="">Select a time...</option>
            {timeOptions.map((timeValue) => (
              <option key={timeValue} value={timeValue}>
                {formatTime(timeValue)}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> This is your preferred date and time. We will
            confirm availability and get back to you within 12 hours.
          </p>
        </div>
      </div>

      {/* Supprimer le bouton back */}
    </div>
  );
};

export default StepDateTimePrivate;
