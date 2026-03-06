"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch("/api/author/articles", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();

        if (res.ok && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadArticles();
  }, []);

  const getProgress = (status) => {
    const steps = [
      "submitted",
      "editor_check",
      "under_review",
      "revision_required",
      "accepted",
      "published",
    ];

    return ((steps.indexOf(status) + 1) / steps.length) * 100;
  };

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">My Articles</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Progress</th>
            <th className="p-3 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No articles submitted yet
              </td>
            </tr>
          ) : (
            articles.map((article) => (
              <tr key={article.id}>
                <td className="p-3 border">{article.title}</td>

                <td className="p-3 border capitalize">
                  {article.status.replace("_", " ")}
                </td>

                <td className="p-3 border w-64">
                  <div className="w-full bg-gray-200 h-3 rounded">
                    <div
                      className="bg-blue-600 h-3 rounded"
                      style={{ width: `${getProgress(article.status)}%` }}
                    ></div>
                  </div>
                </td>

                <td className="p-3 border">
                  {new Date(article.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
