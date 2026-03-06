"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SubmitPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    title: "",
    articleType: "Original Research",
    keywords: "",
    abstract: "",
    introduction: "",
    methods: "",
    results: "",
    discussion: "",
    conclusion: "",
    references: "",
    pdf: null,
    declaration: false,
  });

  // ✅ PROTECT PAGE
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login"); // redirect if not logged in
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.declaration) {
      alert("Please confirm declaration before submission.");
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Article submitted successfully 🎉");
        router.push("/");
      } else {
        alert(data.error || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // Optional loading state
  if (status === "loading") {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!session) {
    return null; // prevent flash before redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-sm">
        <h1 className="text-3xl font-semibold mb-8">Manuscript Submission</h1>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-10 text-sm font-medium">
          {["Basic Info", "Content", "Upload", "Review"].map((label, index) => (
            <div
              key={label}
              className={`flex-1 text-center ${
                step === index + 1
                  ? "text-blue-600 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <input
                type="text"
                name="title"
                placeholder="Article Title"
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <select
                name="articleType"
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option>Original Research</option>
                <option>Review Article</option>
                <option>Case Study</option>
              </select>

              <input
                type="text"
                name="keywords"
                placeholder="Keywords (comma separated)"
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <textarea
                name="abstract"
                placeholder="Abstract"
                rows="6"
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              {[
                "introduction",
                "methods",
                "results",
                "discussion",
                "conclusion",
                "references",
              ].map((section) => (
                <textarea
                  key={section}
                  name={section}
                  placeholder={
                    section.charAt(0).toUpperCase() + section.slice(1)
                  }
                  rows="5"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              ))}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <input
                type="file"
                name="pdf"
                accept=".pdf"
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                }}
                className="w-full border rounded-lg p-3"
                required
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="declaration"
                  onChange={handleChange}
                />
                I confirm that this manuscript is original and not submitted
                elsewhere.
              </label>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4 text-sm">
              <h2 className="text-lg font-semibold mb-4">Review Submission</h2>
              <p>
                <strong>Title:</strong> {form.title}
              </p>
              <p>
                <strong>Type:</strong> {form.articleType}
              </p>
              <p>
                <strong>Keywords:</strong> {form.keywords}
              </p>
              <p>
                <strong>Abstract:</strong> {form.abstract}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border rounded-lg"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
                className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Submit Article
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
