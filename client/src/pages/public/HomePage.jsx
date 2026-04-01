import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Truck } from "lucide-react";

const categories = [
  { title: "Paper", detail: "Newspapers, books, cartons" },
  { title: "Metal", detail: "Iron, steel, aluminum" },
  { title: "Plastic", detail: "Bottles, containers, packaging" },
  { title: "E-waste", detail: "Laptops, chargers, gadgets" }
];

const testimonials = [
  { name: "Rhea, Bengaluru", quote: "The pickup was on time, the rates were clear, and payment was smooth." },
  { name: "Manoj, Noida", quote: "JunkLife made it easy to clear old appliances without bargaining stress." }
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(63,204,114,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(19,137,68,0.12),_transparent_35%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="relative">
            <span className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">Give your junk a new life.</span>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">Turn household scrap into value with one smart pickup.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">JunkLife helps families schedule eco-friendly scrap pickups, track transparent rates, and receive hassle-free payouts.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/schedule" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-soft">Book a Pickup <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/rates" className="rounded-full border border-brand-200 px-6 py-3 font-semibold text-brand-700">View Scrap Rates</Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[["2,500+", "pickups managed"], ["98%", "on-time visits"], ["6+", "scrap categories"]].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-brand-100 bg-white p-4 shadow-soft">
                  <div className="text-2xl font-bold text-brand-800">{value}</div>
                  <div className="text-sm text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft">
              <div className="grid gap-5">
                {[[Truck, "Book instantly", "Choose your scrap type, address, and preferred time slot."], [CheckCircle2, "Pickup confirmed", "Track your booking from pending to completion."], [Leaf, "Get paid fairly & instantly ", "Transparent rates and digital payout tracking."], [ShieldCheck, "Trusted operations", "Admin-managed prices, blogs, and analytics."]].map(([Icon, title, detail]) => (
                  <div key={title} className="flex gap-4 rounded-2xl bg-sand p-4">
                    <Icon className="mt-1 h-5 w-5 text-brand-700" />
                    <div>
                      <h3 className="font-semibold text-brand-950">{title}</h3>
                      <p className="text-sm text-slate-600">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">How it works</p>
          <h2 className="mt-3 text-3xl font-bold text-brand-950">Book -&gt; Pickup -&gt; Get Paid</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[["1", "Book", "Select scrap type, schedule date, and confirm your address."], ["2", "Pickup", "Our collection partner visits during your chosen slot."], ["3", "Get Paid", "Finalize the estimated payout and track payment status digitally."]].map(([step, title, detail]) => (
            <div key={step} className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft">
              <div className="text-sm font-bold text-brand-500">STEP {step}</div>
              <h3 className="mt-4 text-2xl font-bold text-brand-900">{title}</h3>
              <p className="mt-3 text-slate-600">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/80 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Categories</p>
              <h2 className="mt-3 text-3xl font-bold text-brand-950">Popular scrap types we handle</h2>
            </div>
            <Link to="/rates" className="text-sm font-semibold text-brand-700">Explore full catalog</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <div key={item.title} className="rounded-3xl border border-brand-100 bg-sand p-6">
                <h3 className="text-xl font-bold text-brand-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-3xl border border-brand-100 bg-white p-8 shadow-soft">
              <p className="text-lg text-slate-700">"{testimonial.quote}"</p>
              <p className="mt-6 font-semibold text-brand-900">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-brand-700 px-8 py-12 text-white">
          <h2 className="text-3xl font-bold">Ready to clear clutter responsibly?</h2>
          <p className="mt-3 max-w-2xl text-brand-50">Schedule a pickup today and let JunkLife turn recyclable waste into a rewarding habit.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/schedule" className="rounded-full bg-white px-6 py-3 font-semibold text-brand-700">Schedule pickup</Link>
            <Link to="/signup" className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white">Create account</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
