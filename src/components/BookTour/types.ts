export type Tour = "left-bank" | "right-bank";
export type TourType = "regular" | "private";

export interface BookingData {
  tour?: Tour;
  participants?: number;
  tourType?: TourType;
  date?: string; // ISO yyyy-MM-dd
  time?: string; // HH:mm
  name?: string;
  email?: string;
  phone?: string;
}
