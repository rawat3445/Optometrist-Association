"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ArticleViewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      const res = await fetch(`/api/admin/articles/${id}`);
      const data = await res.json();

      setArticle(data.article);
    };

    if (id) loadArticle();
  }, [id]);

  if (!article) {
    return <div className="p-10 text-white">Loading article...</div>;
  }

  const updateStatus = async (status) => {
    const res = await fetch(`/api/admin/articles/${article.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (data.success) {
      alert(`Article ${status}`);
      router.refresh();
    }
  };

  return (
    <div className="p-10 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{article.title}</h1>

      <p>
        <strong>Type:</strong> {article.articleType}
      </p>
      <p>
        <strong>Keywords:</strong> {article.keywords}
      </p>
      <p>
        <strong>Status:</strong> {article.status}
      </p>

      <h2 className="text-xl font-bold mt-6">Abstract</h2>
      <p>{article.abstract}</p>

      <h2 className="text-xl font-bold mt-6">Introduction</h2>
      <p>{article.introduction}</p>

      <h2 className="text-xl font-bold mt-6">Methods</h2>
      <p>{article.methods}</p>

      <h2 className="text-xl font-bold mt-6">Results</h2>
      <p>{article.results}</p>

      <h2 className="text-xl font-bold mt-6">Discussion</h2>
      <p>{article.discussion}</p>

      <h2 className="text-xl font-bold mt-6">Conclusion</h2>
      <p>{article.conclusion}</p>

      <div className="flex flex-wrap gap-4 mt-10">
        <button
          onClick={() => updateStatus("editor_check")}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Editor Check
        </button>

        <button
          onClick={() => updateStatus("under_review")}
          className="bg-purple-600 px-4 py-2 rounded"
        >
          Send To Review
        </button>

        <button
          onClick={() => updateStatus("revision_required")}
          className="bg-orange-600 px-4 py-2 rounded"
        >
          Request Revision
        </button>

        <button
          onClick={() => updateStatus("accepted")}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Accept
        </button>

        <button
          onClick={() => updateStatus("rejected")}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Reject
        </button>

        <button
          onClick={() => updateStatus("published")}
          className="bg-emerald-700 px-4 py-2 rounded"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
