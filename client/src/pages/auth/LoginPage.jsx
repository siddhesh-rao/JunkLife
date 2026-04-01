import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import http from "../../api/http";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await http.post("/auth/login", form);
      login(data.data);
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold text-brand-950">Login</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className="w-full rounded-2xl border border-brand-100 px-4 py-3" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input type="password" className="w-full rounded-2xl border border-brand-100 px-4 py-3" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          <button className="w-full rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">Login</button>
        </form>
        <p className="mt-5 text-sm text-slate-600">New here? <Link to="/signup" className="font-semibold text-brand-700">Create an account</Link></p>
      </div>
    </section>
  );
}
