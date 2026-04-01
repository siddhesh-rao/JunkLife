import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../api/http";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    http.get("/blogs").then((response) => setBlogs(response.data.data));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Learning hub</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-950">Waste Management Blog</h1>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.slug}`} key={blog._id} className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft">
            <div className="h-48 rounded-2xl bg-sand">{blog.image ? <img src={blog.image} alt={blog.title} className="h-full w-full rounded-2xl object-cover" /> : null}</div>
            <h2 className="mt-5 text-2xl font-bold text-brand-950">{blog.title}</h2>
            <p className="mt-3 text-slate-600">{blog.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
