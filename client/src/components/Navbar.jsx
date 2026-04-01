import { Link, NavLink } from "react-router-dom";
import { Recycle, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/rates", label: "Rates" },
  { to: "/schedule", label: "Schedule Pickup" },
  { to: "/payment", label: "Payment" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-800">
          <Recycle className="h-7 w-7" />
          JunkLife
        </Link>

        <button className="md:hidden" onClick={() => setOpen((value) => !value)}>
          <Menu />
        </button>

        <nav className={`${open ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-4 border-b border-brand-100 bg-white px-4 py-4 md:static md:flex md:w-auto md:flex-row md:items-center md:border-none md:bg-transparent md:p-0`}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-sm font-medium ${isActive ? "text-brand-700" : "text-slate-700"}`}>
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink to="/dashboard" className="text-sm font-medium text-slate-700">Dashboard</NavLink>
              <button onClick={logout} className="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700">Logout</button>
            </>
          ) : (
            <NavLink to="/login" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
