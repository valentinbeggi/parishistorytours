import React, { useState } from "react";
import { useBooking } from "../BookingContext";

interface Props {
  back?: () => void;
  onEditDetails?: () => void;
}

const StepSummary: React.FC<Props> = ({ back, onEditDetails }) => {
  const { booking } = useBooking();
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    setSending(true);
    
    if (booking.tourType === "regular") {
      // Liens séparés selon le nombre de participants (si nécessaire)
      const paymentLinks: { [key: string]: string } = {
        "1": "https://buy.stripe.com/aFacN6aWq5on3IM4Xjfbq02?quantity=1",
        "2": "https://buy.stripe.com/aFacN6aWq5on3IM4Xjfbq02?quantity=2",
        "3": "https://buy.stripe.com/aFacN6aWq5on3IM4Xjfbq02?quantity=3",
        "4": "https://buy.stripe.com/aFacN6aWq5on3IM4Xjfbq02?quantity=4"
      };
      
      const url = paymentLinks[String(booking.participants)] || `https://buy.stripe.com/aFacN6aWq5on3IM4Xjfbq02?quantity=${booking.participants}`;
      
      console.log("Participants:", booking.participants, "URL:", url);
      window.location.href = url;
    } else {
      // Pour les tours privés
      alert(
        "Thank you for your private tour request! We will contact you within 24 hours to confirm availability and payment details."
      );
    }
    
    setSending(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Step 6: Booking Summary
      </h3>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Tour:</span>
          <span className="text-gray-900">
            {booking.tour === "left-bank"
              ? "Left Bank Tour"
              : "Right Bank Tour"}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Participants:</span>
          <span className="text-gray-900">
            {booking.participants}{" "}
            {booking.participants === 1 ? "person" : "people"}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Tour Type:</span>
          <span className="text-gray-900">
            {booking.tourType === "regular" ? "Regular Tour" : "Private Tour"}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Date & Time:</span>
          <span className="text-gray-900">
            {booking.date && formatDate(booking.date)} at {booking.time}
          </span>
        </div>

        {booking.tourType === "regular" && booking.price && (
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-700">Total Price:</span>
            <span className="text-gray-900 font-semibold">
              €{booking.price}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Contact:</span>
          <span className="text-gray-900">
            {booking.name} ({booking.email})
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={sending}
          className="px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm md:text-base w-40"
        >
          {sending
            ? "Processing..."
            : booking.tourType === "regular"
            ? "Pay Now"
            : "Confirm"}
        </button>

        <button
          onClick={onEditDetails || back}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
        >
          ← Back to details
        </button>
      </div>
    </div>
  );
};

export default StepSummary;
