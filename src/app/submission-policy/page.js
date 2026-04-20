export default function SubmissionPolicy() {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Submission Policy
        </h1>

        <div className="mt-12 bg-white p-8 rounded-xl shadow border">
          <p className="text-gray-600 leading-relaxed">
            Authors must submit their manuscripts through the journal&apos;s online
            submission system. Each submission will undergo an editorial
            screening before being sent for peer review.
          </p>

          <ul className="list-disc ml-6 text-gray-600 mt-6 space-y-2">
            <li>All submissions must be original work.</li>
            <li>Articles must not be under review elsewhere.</li>
            <li>Authors must disclose conflicts of interest.</li>
            <li>
              Manuscripts should follow the journal formatting guidelines.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
