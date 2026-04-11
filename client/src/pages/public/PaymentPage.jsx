import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import http from "../../api/http";
import { useAuth } from "../../context/AuthContext";

export default function PaymentPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState(500);

  useEffect(() => {
    if (!user) {
      return;
    }

    const endpoint = user.role === "admin" ? "/bookings" : "/bookings/my";
    http.get(endpoint).then((response) => {
      setBookings(response.data.data);
      if (response.data.data[0]) {
        setSelected(response.data.data[0]._id);
        setEstimatedAmount(response.data.data[0].estimatedPayout || 500);
      }
    });
  }, [user]);

  const createOrder = async () => {
    if (!selected) {
      toast.error("Select a booking first");
      return;
    }

    try {
      const { data } = await http.post("/payments/create-order", { bookingId: selected, estimatedAmount: Number(estimatedAmount) });
      toast.success(data.data.order.simulated ? "Simulated Razorpay order created" : "Razorpay order created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment request failed");
    }
  };

  const confirmPayout = async () => {
    try {
      await http.post("/payments/confirm", { bookingId: selected, razorpayOrderId: `sim_order_${Date.now()}`, razorpayPaymentId: `sim_payment_${Date.now()}`, razorpaySignature: "simulated" });
      toast.success("Payout marked as completed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not confirm payout");
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Payout flow</p>
          <h1 className="mt-3 text-4xl font-bold text-brand-950">Payment Simulation</h1>
          <p className="mt-4 text-slate-600">Create a Razorpay order for the estimated payout and simulate payment completion after pickup confirmation.</p>
          <div className="mt-8 space-y-5">
            <select className="w-full rounded-2xl border border-brand-100 px-4 py-3" value={selected} onChange={(event) => setSelected(event.target.value)}>
              <option value="">Select booking</option>
              {bookings.map((booking) => <option key={booking._id} value={booking._id}>{(booking.scrapTypes?.join(", ") || booking.scrapType)} | {booking.status} | {booking.address}</option>)}
            </select>
            <input type="number" min="0" className="w-full rounded-2xl border border-brand-100 px-4 py-3" value={estimatedAmount} onChange={(event) => setEstimatedAmount(event.target.value)} />
            <div className="flex flex-wrap gap-4">
              <button onClick={createOrder} className="rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">Create order</button>
              <button onClick={confirmPayout} className="rounded-2xl border border-brand-200 px-6 py-3 font-semibold text-brand-700">Confirm payout</button>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] bg-brand-900 p-8 text-white">
          <h2 className="text-2xl font-bold">Razorpay Notes</h2>
          <ul className="mt-5 space-y-3 text-sm text-brand-100">
            <li>🔒 100% secure payments powered by Razorpay, your bank details are never stored.</li>
            <li>⚡ Instant payout directly to your UPI or bank account after pickup confirmation.</li>
            <li>🔄 Every transaction is traceable, contact us with your Razorpay reference ID for any issue.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
