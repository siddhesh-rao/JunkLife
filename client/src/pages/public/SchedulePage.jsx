import { useState } from "react";
import toast from "react-hot-toast";
import http from "../../api/http";
import { categories, timeSlots } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";

const initialForm = (user) => ({
  name: user?.name || "",
  phone: "",
  address: "",
  scrapTypes: ["Paper"],
  date: "",
  timeSlot: timeSlots[0]
});

export default function SchedulePage() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm(user));

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const toggleCategory = (category) => {
    setForm((current) => ({
      ...current,
      scrapTypes: current.scrapTypes.includes(category)
        ? current.scrapTypes.filter((item) => item !== category)
        : [...current.scrapTypes, category]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("Please login before scheduling a pickup.");
      return;
    }

    if (form.scrapTypes.length === 0) {
      toast.error("Select at least one scrap category.");
      return;
    }

    try {
      await http.post("/bookings", form);
      toast.success("Pickup scheduled successfully");
      setForm(initialForm(user));
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create booking");
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Pickup request</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-950">Schedule a Scrap Pickup</h1>
        <p className="mt-4 text-slate-600">Choose one or more scrap categories and book a single combined pickup.</p>
        <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <input className="rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-400" placeholder="Full name" name="name" value={form.name} onChange={handleChange} />
          <input className="rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-400" placeholder="Phone number" name="phone" value={form.phone} onChange={handleChange} />
          <textarea className="sm:col-span-2 min-h-28 rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-400" placeholder="Pickup address" name="address" value={form.address} onChange={handleChange} />

          <div className="sm:col-span-2 rounded-3xl border border-brand-100 bg-brand-50/60 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Scrap categories</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => {
                const checked = form.scrapTypes.includes(category);
                return (
                  <label
                    key={category}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${checked ? "border-brand-500 bg-white text-brand-900 shadow-sm" : "border-brand-100 bg-white/70 text-slate-700"}`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                      checked={checked}
                      onChange={() => toggleCategory(category)}
                    />
                    <span className="font-medium">{category}</span>
                  </label>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-slate-600">Selected: {form.scrapTypes.join(", ")}</p>
          </div>

          <input type="date" className="rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-400" name="date" value={form.date} onChange={handleChange} />
          <select className="rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-400" name="timeSlot" value={form.timeSlot} onChange={handleChange}>{timeSlots.map((slot) => <option key={slot}>{slot}</option>)}</select>
          <button className="sm:col-span-2 rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">Confirm pickup request</button>
        </form>
      </div>
    </section>
  );
}