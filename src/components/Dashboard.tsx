import { useState, useEffect } from "react";
import { supabaseClient as supabase } from "../lib/supabase-client";

export default function Dashboard() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSlot, setNewSlot] = useState({
    start_time: "",
    end_time: "",
    tour: "",
    total_capacity: 12,
  });

  useEffect(() => {
    const fetchSlots = async () => {
      const { data, error } = await supabase
        .from("time_slots")
        .select("id, start_time, end_time, tour, booked, total_capacity");
      if (error) {
        console.error("Error fetching slots:", error);
      } else {
        setSlots(data);
      }
      setLoading(false);
    };

    fetchSlots();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this slot?")) return;
    const { error } = await supabase.from("time_slots").delete().eq("id", id);
    if (error) {
      console.error("Error deleting slot:", error);
    } else {
      setSlots((prev) => prev.filter((slot) => slot.id !== id));
    }
  };

  const handleAddSlot = async () => {
    if (!newSlot.start_time || !newSlot.end_time || !newSlot.tour) {
      alert("Please fill in all fields.");
      return;
    }

    const { data, error } = await supabase
      .from("time_slots")
      .insert(newSlot)
      .select()
      .single();
    if (error) {
      console.error("Error adding slot:", error);
    } else {
      setSlots((prev) => [...prev, data]);
      setNewSlot({
        start_time: "",
        end_time: "",
        tour: "",
        total_capacity: 12,
      });
    }
  };

  if (loading) {
    return <p>Loading time slots...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Time Slots Management
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <div
          className="overflow-x-auto overflow-y-auto"
          style={{ maxHeight: "400px" }}
        >
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Start Time</th>
                <th className="border border-gray-300 px-4 py-2">End Time</th>
                <th className="border border-gray-300 px-4 py-2">Tour</th>
                <th className="border border-gray-300 px-4 py-2">Booked</th>
                <th className="border border-gray-300 px-4 py-2">Capacity</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(slot.start_time).toLocaleString("fr-FR")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(slot.end_time).toLocaleString("fr-FR")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {slot.tour}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {slot.booked}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {slot.total_capacity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(slot.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-600">
        Add New Slot
      </h2>
      <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
        <label className="block">
          Start Time
          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={newSlot.start_time}
            onChange={(e) =>
              setNewSlot({ ...newSlot, start_time: e.target.value })
            }
          />
        </label>
        <label className="block">
          End Time
          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={newSlot.end_time}
            onChange={(e) =>
              setNewSlot({ ...newSlot, end_time: e.target.value })
            }
          />
        </label>
        <label className="block">
          Tour
          <select
            className="w-full border rounded p-2"
            value={newSlot.tour}
            onChange={(e) => setNewSlot({ ...newSlot, tour: e.target.value })}
          >
            <option value="">Select a tour</option>
            <option value="left-bank">Left-Bank</option>
            <option value="right-bank">Right-Bank</option>
          </select>
        </label>
        <label className="block">
          Capacity
          <input
            type="number"
            className="w-full border rounded p-2"
            value={newSlot.total_capacity}
            onChange={(e) =>
              setNewSlot({ ...newSlot, total_capacity: +e.target.value })
            }
          />
        </label>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
          onClick={handleAddSlot}
        >
          ➕ Add Slot
        </button>
      </div>
    </div>
  );
}
