"use client";
import { FileText, Shield, BookOpen, AlertCircle } from "lucide-react";

export default function AuthorGuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg space-y-10">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Author Guidelines
        </h1>

        {/* Manuscript Preparation */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" />
            <h2 className="text-2xl text-blue-600 font-semibold">
              Manuscript Preparation
            </h2>
          </div>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Manuscripts must be written in clear English.</li>
            <li>Use Times New Roman, 12pt font, double spacing.</li>
            <li>Word limit: 4000 words for original research.</li>
            <li>Include structured abstract (250 words max).</li>
          </ul>
        </section>

        {/* Article Types */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600" />
            <h2 className="text-2xl text-blue-600 font-semibold">
              Article Types
            </h2>
          </div>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Original Research</li>
            <li>Review Articles</li>
            <li>Case Reports</li>
            <li>Short Communications</li>
          </ul>
        </section>

        {/* Ethical Requirements */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-600" />
            <h2 className="text-2xl text-blue-600 font-semibold">
              Ethical Requirements
            </h2>
          </div>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Ethics committee approval required (if applicable).</li>
            <li>Patient consent must be obtained.</li>
            <li>Conflict of interest disclosure mandatory.</li>
          </ul>
        </section>

        {/* Plagiarism Policy */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-blue-600" />
            <h2 className="text-2xl text-blue-600 font-semibold">
              Plagiarism Policy
            </h2>
          </div>
          <p className="text-gray-700">
            All manuscripts will be screened for plagiarism. Similarity index
            must be below 15%. Submissions exceeding this limit will be
            rejected.
          </p>
        </section>
      </div>
    </div>
  );
}
