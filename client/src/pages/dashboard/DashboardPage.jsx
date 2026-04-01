import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import http from "../../api/http";
import { useAuth } from "../../context/AuthContext";

const cardClass = "rounded-3xl border border-brand-100 bg-white p-6 shadow-soft";
const initialRateForm = { category: "", item: "", pricePerKg: "", unit: "kg" };
const initialBlogForm = { title: "", excerpt: "", content: "", image: "" };

export default function DashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [rates, setRates] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [rateForm, setRateForm] = useState(initialRateForm);
  const [blogForm, setBlogForm] = useState(initialBlogForm);
  const [editingRateId, setEditingRateId] = useState("");
  const [editingBlogId, setEditingBlogId] = useState("");
  const [loadingAdminData, setLoadingAdminData] = useState(false);

  const loadCustomerData = async () => {
    const { data } = await http.get("/bookings/my");
    setBookings(data.data);
  };

  const loadAdminData = async () => {
    setLoadingAdminData(true);
    try {
      const [bookingsRes, usersRes, ratesRes, blogsRes, contactsRes, analyticsRes] = await Promise.all([
        http.get("/bookings"),
        http.get("/users"),
        http.get("/scrap-rates"),
        http.get("/blogs"),
        http.get("/contacts"),
        http.get("/analytics/overview")
      ]);

      setBookings(bookingsRes.data.data);
      setUsers(usersRes.data.data);
      setRates(ratesRes.data.data);
      setBlogs(blogsRes.data.data);
      setContacts(contactsRes.data.data);
      setAnalytics(analyticsRes.data.data);
    } finally {
      setLoadingAdminData(false);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role === "admin") {
      loadAdminData();
    } else {
      loadCustomerData();
    }
  }, [user]);

  const resetRateEditor = () => {
    setEditingRateId("");
    setRateForm(initialRateForm);
  };

  const resetBlogEditor = () => {
    setEditingBlogId("");
    setBlogForm(initialBlogForm);
  };

  const saveRate = async (event) => {
    event.preventDefault();
    try {
      const payload = { ...rateForm, pricePerKg: Number(rateForm.pricePerKg) };
      if (editingRateId) {
        await http.put(`/scrap-rates/${editingRateId}`, payload);
        toast.success("Rate updated");
      } else {
        await http.post("/scrap-rates", payload);
        toast.success("Rate added");
      }
      resetRateEditor();
      loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save rate");
    }
  };

  const startEditRate = (rate) => {
    setEditingRateId(rate._id);
    setRateForm({
      category: rate.category,
      item: rate.item,
      pricePerKg: String(rate.pricePerKg),
      unit: rate.unit
    });
  };

  const deleteRate = async (id) => {
    try {
      await http.delete(`/scrap-rates/${id}`);
      if (editingRateId === id) {
        resetRateEditor();
      }
      toast.success("Rate deleted");
      loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete rate");
    }
  };

  const saveBlog = async (event) => {
    event.preventDefault();
    try {
      if (editingBlogId) {
        await http.put(`/blogs/${editingBlogId}`, blogForm);
        toast.success("Blog updated");
      } else {
        await http.post("/blogs", blogForm);
        toast.success("Blog published");
      }
      resetBlogEditor();
      loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save blog");
    }
  };

  const startEditBlog = (blog) => {
    setEditingBlogId(blog._id);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content,
      image: blog.image || ""
    });
  };

  const deleteBlog = async (id) => {
    try {
      await http.delete(`/blogs/${id}`);
      if (editingBlogId === id) {
        resetBlogEditor();
      }
      toast.success("Blog deleted");
      loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete blog");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await http.patch(`/bookings/${id}/status`, { status });
      toast.success("Booking updated");
      loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update booking");
    }
  };

  if (!user) {
    return null;
  }

  if (user.role === "customer") {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-950">My Dashboard</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking._id} className={cardClass}>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">{booking.status}</div>
              <h2 className="mt-3 text-2xl font-bold text-brand-950">{booking.scrapTypes?.join(", ") || booking.scrapType}</h2>
              <p className="mt-2 text-slate-600">{booking.address}</p>
              <p className="mt-4 text-sm text-slate-500">
                {new Date(booking.date).toLocaleDateString()} | {booking.timeSlot}
              </p>
              <p className="mt-2 text-sm text-slate-500">Payout: {booking.payoutStatus}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Admin panel</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-950">Operations Dashboard</h1>
        <p className="mt-3 text-slate-600">
          Review bookings, tune pricing, publish blogs, and monitor user activity from one place.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3 xl:grid-cols-6">
        {analytics &&
          Object.entries(analytics.cards).map(([label, value]) => (
            <div key={label} className={cardClass}>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
              <p className="mt-3 text-3xl font-bold text-brand-900">{value}</p>
            </div>
          ))}
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <div className={cardClass}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-brand-950">Manage Bookings</h2>
            {loadingAdminData ? <span className="text-sm text-slate-500">Refreshing...</span> : null}
          </div>
          <div className="mt-6 space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-brand-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-brand-900">{booking.name} | {booking.scrapTypes?.join(", ") || booking.scrapType}</p>
                    <p className="text-sm text-slate-600">{booking.address}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(booking.date).toLocaleDateString()} | {booking.timeSlot}
                    </p>
                  </div>
                  <select
                    value={booking.status}
                    onChange={(event) => updateStatus(booking._id, event.target.value)}
                    className="rounded-xl border border-brand-100 px-3 py-2"
                  >
                    {["pending", "confirmed", "completed", "cancelled"].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-brand-950">Update Scrap Prices</h2>
            {editingRateId ? (
              <button onClick={resetRateEditor} className="text-sm font-semibold text-brand-700">
                Cancel edit
              </button>
            ) : null}
          </div>
          <form onSubmit={saveRate} className="mt-6 grid gap-4 sm:grid-cols-2">
            <input className="rounded-2xl border border-brand-100 px-4 py-3" placeholder="Category" value={rateForm.category} onChange={(event) => setRateForm({ ...rateForm, category: event.target.value })} />
            <input className="rounded-2xl border border-brand-100 px-4 py-3" placeholder="Item" value={rateForm.item} onChange={(event) => setRateForm({ ...rateForm, item: event.target.value })} />
            <input className="rounded-2xl border border-brand-100 px-4 py-3" placeholder="Price" value={rateForm.pricePerKg} onChange={(event) => setRateForm({ ...rateForm, pricePerKg: event.target.value })} />
            <input className="rounded-2xl border border-brand-100 px-4 py-3" placeholder="Unit" value={rateForm.unit} onChange={(event) => setRateForm({ ...rateForm, unit: event.target.value })} />
            <button className="sm:col-span-2 rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">
              {editingRateId ? "Update rate" : "Save rate"}
            </button>
          </form>
          <div className="mt-6 space-y-3">
            {rates.map((rate) => (
              <div key={rate._id} className="rounded-2xl bg-sand px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-brand-900">{rate.item} ({rate.category})</p>
                    <p className="text-sm text-slate-600">
                      Rs. {rate.pricePerKg}/{rate.unit} | Updated {new Date(rate.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => startEditRate(rate)} className="text-sm font-semibold text-brand-700">
                      Edit
                    </button>
                    <button onClick={() => deleteRate(rate._id)} className="text-sm font-semibold text-rose-600">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-brand-950">Manage Blogs</h2>
            {editingBlogId ? (
              <button onClick={resetBlogEditor} className="text-sm font-semibold text-brand-700">
                Cancel edit
              </button>
            ) : null}
          </div>
          <form onSubmit={saveBlog} className="mt-6 grid gap-4">
            <input className="rounded-2xl border border-brand-100 px-4 py-3" placeholder="Title" value={blogForm.title} onChange={(event) => setBlogForm({ ...blogForm, title: event.target.value })} />
            <input className="rounded-2xl border border-brand-100 px-4 py-3" placeholder="Excerpt" value={blogForm.excerpt} onChange={(event) => setBlogForm({ ...blogForm, excerpt: event.target.value })} />
            <input className="rounded-2xl border border-brand-100 px-4 py-3" placeholder="Image URL or Cloudinary path" value={blogForm.image} onChange={(event) => setBlogForm({ ...blogForm, image: event.target.value })} />
            <textarea className="min-h-32 rounded-2xl border border-brand-100 px-4 py-3" placeholder="Content" value={blogForm.content} onChange={(event) => setBlogForm({ ...blogForm, content: event.target.value })} />
            <button className="rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">
              {editingBlogId ? "Update blog" : "Publish blog"}
            </button>
          </form>
          <div className="mt-6 space-y-3">
            {blogs.map((blog) => (
              <div key={blog._id} className="rounded-2xl bg-sand px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-brand-900">{blog.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{blog.excerpt || "No excerpt added yet."}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => startEditBlog(blog)} className="text-sm font-semibold text-brand-700">
                      Edit
                    </button>
                    <button onClick={() => deleteBlog(blog._id)} className="text-sm font-semibold text-rose-600">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <h2 className="text-2xl font-bold text-brand-950">Users & Queries</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-brand-800">Recent Users</h3>
              <div className="mt-3 space-y-3">
                {users.slice(0, 6).map((entry) => (
                  <div key={entry._id} className="rounded-2xl bg-sand px-4 py-3 text-sm">
                    {entry.name} | {entry.role} | {entry.email}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-brand-800">Contact Queries</h3>
              <div className="mt-3 space-y-3">
                {contacts.slice(0, 6).map((entry) => (
                  <div key={entry._id} className="rounded-2xl bg-sand px-4 py-3 text-sm">
                    {entry.name}: {entry.message.slice(0, 55)}...
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}