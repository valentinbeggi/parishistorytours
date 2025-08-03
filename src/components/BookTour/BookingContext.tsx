import React, { createContext, useContext, useState } from "react";
import type { BookingData } from "./types";

interface Ctx {
  booking: BookingData;
  setBooking: (b: BookingData) => void;
}

const BookingContext = createContext<Ctx | null>(null);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [booking, setBooking] = useState<BookingData>({});
  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
};
