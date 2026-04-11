import { useEffect, useState } from "react";
import {
  BatteryCharging,
  Cpu,
  GlassWater,
  Newspaper,
  Package,
  Recycle,
  ScanLine,
  Shield,
  Trash2,
  WashingMachine
} from "lucide-react";
import http from "../../api/http";

const categoryStyles = {
  Paper: {
    icon: Newspaper,
    accent: "from-lime-100 via-white to-emerald-50",
    badge: "bg-lime-100 text-lime-800",
    glow: "bg-lime-300/40"
  },
  Metal: {
    icon: Shield,
    accent: "from-slate-100 via-white to-zinc-100",
    badge: "bg-slate-200 text-slate-800",
    glow: "bg-slate-300/40"
  },
  Plastic: {
    icon: Recycle,
    accent: "from-sky-100 via-white to-cyan-50",
    badge: "bg-sky-100 text-sky-800",
    glow: "bg-sky-300/40"
  },
  Glass: {
    icon: GlassWater,
    accent: "from-teal-100 via-white to-emerald-50",
    badge: "bg-teal-100 text-teal-800",
    glow: "bg-teal-300/40"
  },
  "E-waste": {
    icon: Cpu,
    accent: "from-violet-100 via-white to-indigo-50",
    badge: "bg-violet-100 text-violet-800",
    glow: "bg-violet-300/40"
  },
  Appliances: {
    icon: WashingMachine,
    accent: "from-amber-100 via-white to-orange-50",
    badge: "bg-amber-100 text-amber-800",
    glow: "bg-amber-300/40"
  }
};

const fallbackStyle = {
  icon: Package,
  accent: "from-brand-50 via-white to-sand",
  badge: "bg-brand-100 text-brand-800",
  glow: "bg-brand-300/30"
};

export default function RatesPage() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    http.get("/scrap-rates").then((response) => setRates(response.data.data));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Live pricing</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-950">Scrap Rate Catalog</h1>
        <p className="mt-4 text-slate-600">
          Admin-managed rates are fetched from the backend and presented as easy-to-scan category cards.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {rates.map((rate, index) => {
          const style = categoryStyles[rate.category] || fallbackStyle;
          const Icon = style.icon;

          return (
            <article
              key={rate._id}
              className="rate-card group relative overflow-hidden rounded-[2rem] border border-brand-100 bg-white p-6 shadow-soft"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${style.accent} opacity-90`} />
              <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl ${style.glow}`} />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${style.badge}`}>
                      {rate.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-bold text-brand-950">{rate.item}</h2>
                  </div>
                  <div className="rate-icon-wrap flex h-16 w-16 items-center justify-center rounded-2xl border border-white/70 bg-white/80 shadow-lg backdrop-blur">
                    <Icon className="h-8 w-8 text-brand-700" />
                  </div>
                </div>

                <div className="mt-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Latest payout rate</p>
                    <p className="mt-2 text-3xl font-black tracking-tight text-brand-900">
                      Rs. {rate.pricePerKg}
                      <span className="ml-1 text-base font-semibold text-slate-500">/{rate.unit}</span>
                    </p>
                  </div>
                  
                  
                  
                </div>

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/70 pt-5 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <ScanLine className="h-4 w-4 text-brand-700" />
                    <span>Updated {new Date(rate.lastUpdated).toLocaleDateString()}</span>
                  </div>
                  <span className="font-semibold text-brand-800">Current pricing</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


/* at line 114 (battery and dustbin icon hataya hai)
<div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-white shadow-lg">
  {rate.unit === "unit" ? <BatteryCharging className="h-5 w-5" /> : <Trash2 className="h-5 w-5" />}
</div> 
*/