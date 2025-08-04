export type Tour = "left-bank" | "right-bank";
export type TourType = "regular" | "private";

export interface BookingData {
  tour: Tour;
  participants: number;
  tourType: TourType;
  date: string;
  time: string;
  sessionId?: string;
  price?: number;
  name: string;
  email: string;
  phone: string;
  status?: string; // pending, pending_payment, confirmed, etc.
}
