import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import http from "../../api/http";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await http.post("/auth/register", form);
      login(data.data);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold text-brand-950">Create account</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className="w-full rounded-2xl border border-brand-100 px-4 py-3" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input className="w-full rounded-2xl border border-brand-100 px-4 py-3" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input type="password" className="w-full rounded-2xl border border-brand-100 px-4 py-3" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          <button className="w-full rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">Sign Up</button>
        </form>
        <p className="mt-5 text-sm text-slate-600">Already registered? <Link to="/login" className="font-semibold text-brand-700">Login</Link></p>
      </div>
    </section>
  );
}
