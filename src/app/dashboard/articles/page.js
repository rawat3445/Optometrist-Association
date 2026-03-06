"use client";

import { useEffect, useState } from "react";

export default function MyArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/articles/my")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Articles</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                No articles submitted yet
              </td>
            </tr>
          ) : (
            articles.map((article) => (
              <tr key={article.id} className="border-t">
                <td className="p-3">{article.title}</td>
                <td className="p-3">{article.status}</td>
                <td className="p-3">
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
