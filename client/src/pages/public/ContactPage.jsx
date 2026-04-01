import { useState } from "react";
import toast from "react-hot-toast";
import http from "../../api/http";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await http.post("/contacts", form);
      toast.success("Your message has been sent");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send message");
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Contact JunkLife</p>
          <h1 className="mt-3 text-4xl font-bold text-brand-950">Let's make recycling easier</h1>
          <p className="mt-4 text-slate-600">Reach out for pickup support, bulk scrap partnerships, or city expansion queries.</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft">
          <div className="grid gap-4">
            <input className="rounded-2xl border border-brand-100 px-4 py-3" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            <input className="rounded-2xl border border-brand-100 px-4 py-3" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <textarea className="min-h-32 rounded-2xl border border-brand-100 px-4 py-3" placeholder="Message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
            <button className="rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">Send message</button>
          </div>
        </form>
      </div>
    </section>
  );
}
