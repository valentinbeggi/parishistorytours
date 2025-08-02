import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import BookingModal from "./BookingModal.tsx";

export default function BookingCalendar({
  tour,
}: {
  tour: "left-bank" | "right-bank";
}) {
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [slots, setSlots] = useState<any[]>([]);
  const [availableDays, setAvailableDays] = useState<Record<string, number>>(
    {}
  );
  const [chosenSlot, setChosenSlot] = useState<any>(null);

  // Fetch all slots on component load
  useEffect(() => {
    const fetchAllSlots = async () => {
      try {
        console.log("here");
        const { data, error } = await supabase
          .from("v_available_slots")
          .select("start_time, free")
          .eq("tour", tour);

        if (error) {
          console.error("Error fetching all slots:", error);
          return;
        }

        // Group slots by date and count available slots
        const groupedSlots: Record<string, number> = {};
        data?.forEach((slot) => {
          const date = new Date(slot.start_time).toISOString().split("T")[0];
          groupedSlots[date] = (groupedSlots[date] || 0) + slot.free;
        });

        setAvailableDays(groupedSlots);
      } catch (err) {
        console.error("Unexpected error fetching all slots:", err);
      }
    };

    fetchAllSlots();
  }, [tour]);

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
          .eq("tour", tour)
          .gte("start_time", begin.toISOString())
          .lte("start_time", end.toISOString());

        if (error) {
          console.error("Error fetching slots for selected day:", error);
          return;
        }

        setSlots(data || []);
      } catch (err) {
        console.error("Unexpected error fetching slots for selected day:", err);
      }
    };
    fetchSlots();
  }, [selectedDay]);

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

  return (
    <>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        weekStartsOn={1} // Start the week on Monday
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        footer={
          <p className="mt-2 text-sm">Select a day to view available slots.</p>
        }
      />

      {slots.length > 0 && (
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {slots.map((s) => {
            const time = new Date(s.start_time).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <button
                disabled={s.free === 0}
                key={s.id}
                onClick={() => setChosenSlot(s)}
                className={`border rounded p-3 hover:bg-indigo-50 disabled:opacity-30`}
              >
                {time} – {s.free} places
              </button>
            );
          })}
        </div>
      )}

      {chosenSlot && (
        <BookingModal slot={chosenSlot} onClose={() => setChosenSlot(null)} />
      )}
    </>
  );
}
