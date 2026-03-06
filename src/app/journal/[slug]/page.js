"use client";

import { useParams } from "next/navigation";
import { articles } from "@/app/data/articles";
import { Eye, Download, FileText } from "lucide-react";
import { useState } from "react";

export default function ArticlePage() {
  const { slug } = useParams();
  const [showCitation, setShowCitation] = useState(false);
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-2xl font-semibold text-gray-800">
          Article Not Found
        </h1>
      </div>
    );
  }

  const sections = [
    "abstract",
    ...Object.keys(article.sections).filter((k) => k !== "references"),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <nav className="text-sm text-gray-500 mb-6">
            Journal / Vol {article.metadata.volume}, No {article.metadata.issue}
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
            {/* Main Content */}
            <div className="lg:flex-1">
              <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium rounded-full mb-4">
                {article.type}
              </span>

              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                {article.title}
              </h1>

              {/* Authors */}
              <div className="mb-8 text-lg text-gray-700">
                {article.authors.map((author, i) => (
                  <div key={i} className="mb-2 last:mb-0">
                    <span className="font-semibold">{author.name}</span>
                    {author.corresponding && (
                      <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        ∗
                      </span>
                    )}
                    <div className="text-sm text-gray-500 mt-1">
                      {author.affiliation}
                    </div>
                  </div>
                ))}
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-12">
                <span>Received: {article.metadata.received}</span>
                <span>Accepted: {article.metadata.accepted}</span>
                <span>Published: {article.metadata.published}</span>
                <span>
                  DOI:{" "}
                  <a
                    href={`https://doi.org/${article.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {article.doi}
                  </a>
                </span>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 lg:shrink-0 mt-8 lg:mt-0">
              <div className="bg-gray-50 border rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg">Metrics</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900 font-medium">
                      {article.metrics.views.toLocaleString()}
                    </span>{" "}
                    Views
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900 font-medium">
                      {article.metrics.downloads.toLocaleString()}
                    </span>{" "}
                    Downloads
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900 font-medium">
                      {article.metrics.citations}
                    </span>{" "}
                    Citations
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Download PDF
                  </button>
                  <button
                    onClick={() => setShowCitation(!showCitation)}
                    className="w-full border border-gray-200 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cite Article
                  </button>
                </div>

                {showCitation && (
                  <div className="text-xs text-gray-600 bg-gray-100 p-3 rounded-lg font-mono">
                    {article.authors[0].name} et al. ({article.metadata.year}).{" "}
                    {article.title}.<strong> J. Optom. Res.</strong>,{" "}
                    {article.metadata.volume}({article.metadata.issue}),{" "}
                    {article.metadata.pages}. https://doi.org/{article.doi}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Table of Contents */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">
                Contents
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    className="block py-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition capitalize"
                  >
                    {section.replace("_", " ")}
                  </a>
                ))}
                <a
                  href="#references"
                  className="block py-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition"
                >
                  References
                </a>
              </nav>
            </div>
          </div>

          {/* Main Article */}
          <div className="lg:col-span-9 prose prose-lg max-w-none">
            {/* Abstract */}
            <section id="abstract" className="mb-16">
              <h2 className="text-2xl font-black text-gray-900 mb-6 border-b border-gray-200 pb-4">
                Abstract
              </h2>
              <div className="text-lg text-gray-800 leading-relaxed mb-6">
                {article.abstract}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Keywords: </span>
                <span className="text-gray-700">
                  {article.keywords.join(", ")}
                </span>
              </div>
            </section>

            {/* Sections */}
            {Object.entries(article.sections).map(([key, content]) => {
              if (key === "references") return null;

              return (
                <section key={key} id={key} className="mb-16">
                  <h2 className="text-2xl font-black text-gray-900 mb-6 border-b border-gray-200 pb-4 capitalize">
                    {key.replace("_", " ")}
                  </h2>
                  <div className="text-lg text-gray-800 leading-relaxed prose prose-lg max-w-none">
                    {content}
                  </div>
                </section>
              );
            })}

            {/* References */}
            <section id="references" className="mb-16">
              <h2 className="text-2xl font-black text-gray-900 mb-6 border-b border-gray-200 pb-4">
                References
              </h2>
              <ol className="text-gray-800 text-base space-y-2 list-decimal pl-8">
                {article.sections.references.map((ref, i) => (
                  <li key={i} className="leading-relaxed">
                    {ref}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
