import React, { useState } from "react";
import { useBooking } from "../BookingContext";

interface StepWrapperProps {
  children: React.ReactNode;
  nextLabel?: string;
  showBack?: boolean;
  onNext?: () => void;
  onBack?: () => void;
  isTransitioning?: boolean;
  validationKey?: string;
  validationMessage?: string;
}

const StepWrapper: React.FC<StepWrapperProps> = ({
  children,
  nextLabel = "Continue",
  showBack = true,
  onNext,
  onBack,
  isTransitioning = false,
  validationKey,
  validationMessage
}) => {
  const { booking } = useBooking();
  const [showError, setShowError] = useState(false);

  const isStepValid = () => {
    if (!validationKey) return true;
    
    switch (validationKey) {
      case "tour":
        return booking.tour && booking.tour !== "";
      case "participants":
        return booking.participants && booking.participants > 0;
      case "tourType":
        return booking.tourType && booking.tourType !== "";
      case "dateTime":
        return booking.date && booking.time && booking.date !== "" && booking.time !== "";
      case "contact":
        return booking.name && booking.email && booking.name !== "" && booking.email !== "";
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setShowError(false);
      onNext && onNext();
    } else {
      setShowError(true);
    }
  };

  return (
    <div className={`transition-all duration-300 ease-in-out ${
      isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
    }`}>
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        {children}

        <div className="mt-8 flex justify-between items-center">
          <div>
            {showBack && onBack && (
              <button
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ← Previous Step
              </button>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            {showError && !isStepValid() && validationMessage && (
              <span className="text-sm text-red-500 text-right">
                {validationMessage}
              </span>
            )}
            
            <div className="flex justify-center flex-1">
              {onNext && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
                >
                  {nextLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepWrapper;
