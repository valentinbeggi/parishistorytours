import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useBooking } from "../BookingContext";
import { supabase } from "../../../lib/supabase";

interface Props {
  active: boolean;
}

interface Slot {
  id: string;
  start_time: string;
  free: number;
  price?: number;
}

const StepCalendarRegular: React.FC<Props> = ({ active }) => {
  const { booking, setBooking } = useBooking();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [availableDays, setAvailableDays] = useState<Record<string, number>>({});

  if (!active || booking.tourType !== "regular") return null;

  // Fetch all slots on component load
  useEffect(() => {
    const fetchAllSlots = async () => {
      try {
        const { data, error } = await supabase
          .from("v_available_slots")
          .select("start_time, free")
          .eq("tour", booking.tour);

        if (error) {
          console.error("Error fetching all slots:", error);
          return;
        }

        // Group slots by date and count available slots
        const groupedSlots: Record<string, number> = {};
        data?.forEach((slot) => {
          const date = new Date(slot.start_time).toISOString().split("T")[0];
          if (slot.free >= booking.participants) {
            groupedSlots[date] = (groupedSlots[date] || 0) + 1;
          }
        });

        setAvailableDays(groupedSlots);
      } catch (err) {
        console.error("Unexpected error fetching all slots:", err);
      }
    };

    fetchAllSlots();
  }, [booking.tour, booking.participants]);

  // Fetch slots for the selected day
  useEffect(() => {
    if (!selectedDay) return;
    
    const fetchSlots = async () => {
      try {
        const begin = new Date(selectedDay);
        const end = new Date(selectedDay);
        end.setHours(23, 59, 59, 999);

        const { data, error } = await supabase
          .from("v_available_slots")
          .select("*")
          .eq("tour", booking.tour)
          .gte("start_time", begin.toISOString())
          .lte("start_time", end.toISOString());

        if (error) {
          console.error("Error fetching slots for selected day:", error);
          return;
        }

        // Filter slots that have enough availability for the group
        const availableSlots = (data || []).filter((slot: Slot) => 
          slot.free >= booking.participants
        );
        
        setSlots(availableSlots);
      } catch (err) {
        console.error("Unexpected error fetching slots for selected day:", err);
      }
    };
    
    fetchSlots();
  }, [selectedDay, booking.tour, booking.participants]);

  const selectSlot = (slot: Slot) => {
    const date = new Date(slot.start_time).toISOString().split("T")[0];
    const time = new Date(slot.start_time).toTimeString().split(" ")[0].substring(0, 5);
    
    setBooking({ 
      ...booking, 
      date: date, 
      time: time,
      sessionId: slot.id,
      price: 50 * booking.participants // Prix de 50€ par personne
    });
  };

  // Highlight days with available slots
  const modifiers = {
    available: Object.keys(availableDays).map((date) => new Date(date)),
  };

  const modifiersStyles = {
    available: {
      backgroundColor: "#E0F2FE",
      color: "#0284C7",
      borderRadius: "50%",
    },
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Step 4: Choose a session
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            weekStartsOn={1}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            disabled={[
              { before: new Date() }, // Disable past dates
            ]}
            footer={
              <p className="mt-2 text-sm text-gray-600">
                Blue dates have available sessions for {booking.participants} {booking.participants === 1 ? 'person' : 'people'}.
              </p>
            }
          />
        </div>

        {/* Available slots */}
        <div>
          {selectedDay && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                Available sessions for {selectedDay.toLocaleDateString()}
              </h4>
              
              {slots.length > 0 ? (
                <div className="space-y-3">
                  {slots.map((slot) => {
                    const isSelected = booking.sessionId === slot.id;
                    
                    return (
                      <button
                        key={slot.id}
                        onClick={() => selectSlot(slot)}
                        className={`w-full p-3 border rounded-lg text-left transition-all duration-200 ${
                          isSelected
                            ? "border-gray-600 bg-gray-50"
                            : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-800">
                              {formatTime(slot.start_time)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {slot.free} spots available
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-800">
                              €50 per person
                            </div>
                            {isSelected && (
                              <div className="text-sm text-blue-600">
                                Total: €{50 * booking.participants}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No available sessions for {booking.participants} {booking.participants === 1 ? 'person' : 'people'} on this date.
                </p>
              )}
            </div>
          )}
          
          {!selectedDay && (
            <p className="text-gray-500 text-sm">
              Select a date from the calendar to view available sessions.
            </p>
          )}
        </div>
      </div>

      {booking.sessionId && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800 font-medium">
              Session selected: {booking.date && new Date(booking.date).toLocaleDateString()} at {booking.time}
            </span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Total: €{booking.price} for {booking.participants} {booking.participants === 1 ? 'person' : 'people'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StepCalendarRegular;
