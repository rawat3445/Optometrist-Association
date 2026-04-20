import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  Eye,
  Microscope,
  Search,
  Sparkles,
  Stethoscope,
  TrendingUp,
} from "lucide-react";

const featuredPost = {
  tag: "Clinical Feature",
  title: "Digital eye strain is no longer a side complaint",
  excerpt:
    "How modern optometry clinics can build a complete digital visual fatigue workflow, from first symptom to follow-up counselling.",
  date: "April 2026",
  readTime: "6 min read",
};

const posts = [
  {
    tag: "Contact Lens",
    title: "What to document in a contact lens follow-up",
    excerpt:
      "Fit, comfort, corneal health, hygiene, replacement schedule, and patient education in one clean clinical note.",
    date: "April 2026",
    icon: Eye,
    color: "from-blue-600 to-cyan-500",
  },
  {
    tag: "Research Writing",
    title: "Turn a case into a publishable report",
    excerpt:
      "A practical article structure for case history, imaging, diagnosis, management, ethics, and learning points.",
    date: "March 2026",
    icon: BookOpen,
    color: "from-slate-900 to-blue-700",
  },
  {
    tag: "Vision Science",
    title: "Screening children for binocular vision concerns",
    excerpt:
      "Symptoms, chair-side checks, referral signals, and counselling points for school-age children.",
    date: "March 2026",
    icon: Microscope,
    color: "from-teal-600 to-emerald-500",
  },
  {
    tag: "Practice Growth",
    title: "Patient communication that improves compliance",
    excerpt:
      "Simple ways to explain findings, treatment steps, and follow-up importance without overwhelming patients.",
    date: "February 2026",
    icon: Stethoscope,
    color: "from-amber-600 to-orange-500",
  },
];

const trendItems = [
  "Dry eye counselling scripts",
  "Myopia control follow-up plans",
  "AI retinal screening workflows",
  "Case report writing checklist",
];

const categories = [
  "Clinical Optometry",
  "Research",
  "Vision Science",
  "Contact Lens",
  "Student Corner",
  "Practice Management",
];

export const metadata = {
  title: "Blog | Optometry Association of India",
  description:
    "Clinical optometry articles, research writing support, vision science updates, and professional blog posts.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#eef7f8]">
      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(20,184,166,0.28),transparent_28%),radial-gradient(circle_at_82%_5%,rgba(59,130,246,0.24),transparent_30%),linear-gradient(135deg,#071421,#0f2d3f_55%,#0d9488)]" />
        <div className="absolute left-4 top-20 h-24 w-24 rounded-full border border-white/20 sm:left-10 sm:h-36 sm:w-36" />
        <div className="absolute bottom-10 right-4 h-36 w-36 rounded-full border border-teal-200/20 sm:right-16 sm:h-52 sm:w-52" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-teal-100 backdrop-blur sm:px-5 sm:text-sm">
              <Sparkles size={18} />
              Association Blog
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl md:text-7xl">
              Ideas that sharpen modern eye care.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl sm:leading-9">
              Clinical thinking, research writing, patient communication, and
              practical workflows for optometry professionals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.slice(0, 4).map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/90 backdrop-blur"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <article className="relative rounded-[2rem] border border-white/20 bg-white p-3 shadow-2xl sm:rounded-[2.75rem] md:p-6">
            <div className="mb-3 inline-flex rounded-2xl bg-teal-400 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 shadow-xl sm:absolute sm:-right-5 sm:-top-5 sm:mb-0 sm:rounded-3xl sm:px-5 sm:py-4 sm:text-sm">
              Featured
            </div>
            <div className="rounded-[1.6rem] bg-slate-950 p-5 text-white sm:rounded-[2.2rem] sm:p-7 md:p-9">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-teal-300/15 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-teal-200">
                  {featuredPost.tag}
                </span>
                <Eye className="text-teal-200" size={34} />
              </div>
              <h2 className="mt-8 max-w-2xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                {featuredPost.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                {featuredPost.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap gap-4 text-sm font-bold text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={17} /> {featuredPost.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={17} /> {featuredPost.readTime}
                </span>
              </div>
              <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-black text-slate-950 transition hover:bg-teal-100">
                Read feature <ArrowRight size={18} />
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-xl sm:rounded-[2rem]">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-teal-700">
              Discover
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search className="text-slate-400" size={18} />
              <input
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="mt-7">
              <p className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                <TrendingUp size={18} className="text-teal-700" />
                Trending reads
              </p>
              <div className="space-y-3">
                {trendItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl bg-slate-50 p-3"
                  >
                    <span className="text-lg font-black text-teal-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-bold leading-6 text-slate-800">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/newsletter"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 font-black text-white transition hover:bg-teal-700"
            >
              Open newsletter <ArrowRight size={18} />
            </Link>
          </div>
        </aside>

        <div>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-teal-700">
                Latest Articles
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
                Field notes for sharper practice
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, index) => (
              <article
                key={post.title}
                className={`group relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${post.color} p-[1px] shadow-lg transition hover:-translate-y-2 hover:shadow-2xl sm:rounded-[2.25rem] ${
                  index === 0 ? "md:row-span-2" : ""
                }`}
              >
                <div className="relative h-full rounded-[1.7rem] bg-white p-5 sm:rounded-[2.2rem] sm:p-6">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-slate-100 transition group-hover:scale-125" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${post.color} text-white shadow-lg`}
                    >
                      <post.icon size={28} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                      {post.date}
                    </span>
                  </div>
                  <p className="relative mt-6 text-xs font-black uppercase tracking-[0.22em] text-teal-700">
                    {post.tag}
                  </p>
                  <h3
                    className={`relative mt-3 font-black leading-tight text-slate-950 ${
                      index === 0 ? "text-3xl sm:text-4xl" : "text-2xl"
                    }`}
                  >
                    {post.title}
                  </h3>
                  <p className="relative mt-4 text-base leading-8 text-slate-600">
                    {post.excerpt}
                  </p>
                  <button className="relative mt-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 font-black text-slate-900 transition hover:bg-slate-950 hover:text-white">
                    Read more{" "}
                    <ArrowRight
                      className="transition group-hover:translate-x-1"
                      size={18}
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
