import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../api/http";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    http.get(`/blogs/${slug}`).then((response) => setBlog(response.data.data));
  }, [slug]);

  if (!blog) {
    return <div className="p-12 text-center">Loading blog...</div>;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft sm:p-10">
        <p className="text-sm text-brand-600">{new Date(blog.createdAt).toLocaleDateString()}</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-950">{blog.title}</h1>
        <p className="mt-6 whitespace-pre-line text-lg leading-8 text-slate-700">{blog.content}</p>
      </article>
    </section>
  );
}
