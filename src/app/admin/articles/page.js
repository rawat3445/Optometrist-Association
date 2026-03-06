"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Download,
  Edit3,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  Search,
} from "lucide-react";

const statusConfig = {
  submitted: {
    color: "from-orange-400 to-orange-500",
    label: "Submitted",
    icon: Clock,
    bg: "bg-orange-500/10",
  },
  under_review: {
    color: "from-blue-500 to-blue-600",
    label: "Under Review",
    icon: Eye,
    bg: "bg-blue-500/10",
  },
  accepted: {
    color: "from-emerald-500 to-emerald-600",
    label: "Accepted",
    icon: CheckCircle,
    bg: "bg-emerald-500/10",
  },
  rejected: {
    color: "from-red-500 to-red-600",
    label: "Rejected",
    icon: XCircle,
    bg: "bg-red-500/10",
  },
  published: {
    color: "from-purple-500 to-purple-600",
    label: "Published",
    icon: Award,
    bg: "bg-purple-500/10",
  },
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(search.toLowerCase()) ||
      article.author?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="flex flex-col items-center space-y-6 bg-white/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30">
          <div className="w-20 h-20 border-4 border-white/30 border-t-indigo-400 rounded-full animate-spin shadow-xl"></div>
          <p className="text-2xl font-bold text-white drop-shadow-lg">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-white mb-2">
            Article Dashboard
          </h1>
          <p className="text-white/80 text-lg">Manage manuscript submissions</p>
        </div>

        {/* SEARCH */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-4 w-5 h-5 text-white/70" />
            <input
              type="text"
              placeholder="Search article or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/60"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/30">
          <table className="w-full">
            <thead className="bg-white/30">
              <tr>
                <th className="px-6 py-4 text-left text-white font-bold">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-white font-bold">
                  Author
                </th>

                <th className="px-6 py-4 text-center text-white font-bold">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-white font-bold">
                  Submitted
                </th>

                <th className="px-6 py-4 text-center text-white font-bold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredArticles.map((article) => {
                const statusInfo =
                  statusConfig[article.status] || statusConfig.submitted;

                const StatusIcon = statusInfo.icon;

                return (
                  <tr
                    key={article.id}
                    className="border-t border-white/10 hover:bg-white/10"
                  >
                    {/* TITLE */}
                    <td className="px-6 py-6 text-white font-semibold">
                      {article.title}
                    </td>

                    {/* AUTHOR */}
                    <td className="px-6 py-6 text-white">
                      {article.author?.name || "Unknown"}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-6 text-center">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold bg-gradient-to-r ${statusInfo.color}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {statusInfo.label}
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-6 text-center text-white">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-6 text-center">
                      <div className="flex justify-center gap-3">
                        {/* VIEW */}
                        <button
                          onClick={() =>
                            router.push(`/admin/articles/${article.id}`)
                          }
                          className="p-3 bg-white/20 rounded-xl hover:bg-blue-500/40"
                        >
                          <Eye className="w-5 h-5 text-blue-200" />
                        </button>

                        {/* DOWNLOAD */}
                        {article.pdfPath && (
                          <a
                            href={article.pdfPath}
                            target="_blank"
                            className="p-3 bg-white/20 rounded-xl hover:bg-green-500/40"
                          >
                            <Download className="w-5 h-5 text-green-200" />
                          </a>
                        )}

                        {/* DELETE */}
                        <button className="p-3 bg-white/20 rounded-xl hover:bg-red-500/40">
                          <Trash2 className="w-5 h-5 text-red-200" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
