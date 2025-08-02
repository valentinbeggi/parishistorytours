import { useState, useEffect } from "react";

export default function BookingModal({ slot, onClose }) {
  const [people, setPeople] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [price, setPrice] = useState<number | null>(null); // Track price dynamically

  useEffect(() => {
    // Fetch the price from Stripe
    async function fetchPrice() {
      try {
        const res = await fetch("/api/stripe-price");
        if (!res.ok) {
          throw new Error("Failed to fetch price from Stripe.");
        }
        const data = await res.json();
        setPrice(data.unit_amount / 100); // Convert cents to euros
      } catch (err) {
        console.error(err);
        setPrice(null); // Handle error by setting price to null
      }
    }
    fetchPrice();
  }, []);

  async function pay() {
    setErrors({}); // Reset error state

    // Validate form fields
    const name = (
      document.getElementById("name") as HTMLInputElement
    ).value.trim();
    const email = (
      document.getElementById("email") as HTMLInputElement
    ).value.trim();
    const phone = (
      document.getElementById("phone") as HTMLInputElement
    ).value.trim();

    const newErrors: Record<string, string> = {};

    if (!name) {
      newErrors.name = "Full name is required.";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "A valid email address is required.";
    }

    if (people < 1 || people > slot.free) {
      newErrors.people = "Please select a valid number of participants.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: slot.id,
          participants: people,
          email,
          name,
          phone,
        }),
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to create checkout session.");
      }

      const { url } = await res.json();
      if (!url) {
        throw new Error("No redirect URL provided.");
      }

      location.href = url; // Stripe Checkout redirect
    } catch (err: any) {
      setErrors({ general: err.message || "An unexpected error occurred." });
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
      <div className="bg-white p-6 rounded max-w-md w-full relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {new Date(slot.start_time).toLocaleString("fr-FR")}
        </h2>
        <label className="block mb-2">
          Full name <span className="text-red-500">*</span>
          <input id="name" className="w-full border rounded p-2" required />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </label>
        <label className="block mb-2">
          Email <span className="text-red-500">*</span>
          <input
            id="email"
            type="email"
            className="w-full border rounded p-2"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </label>
        <label className="block mb-2">
          Phone (optional)
          <input id="phone" className="w-full border rounded p-2" />
        </label>
        <label className="block mb-4">
          Participants <span className="text-red-500">*</span>
          <select
            className="w-full border rounded p-2"
            value={people}
            onChange={(e) => setPeople(+e.target.value)}
          >
            {Array.from({ length: slot.free }, (_, i) => i + 1).map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          {errors.people && (
            <p className="text-red-500 text-sm">{errors.people}</p>
          )}
        </label>
        {errors.general && (
          <p className="text-red-500 mb-4">{errors.general}</p>
        )}
        <button
          onClick={pay}
          className="w-full bg-indigo-600 text-white p-3 rounded"
          disabled={price === null} // Disable button if price is not loaded
        >
          {price !== null
            ? `Pay €${(people * price).toFixed(2)}`
            : "Loading price..."}
        </button>
      </div>
    </div>
  );
}
