export default function PublicationEthics() {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Publication Ethics
        </h1>

        <div className="mt-12 bg-white p-8 rounded-xl shadow border space-y-6">
          <p className="text-gray-600">
            The journal follows strict ethical standards in academic publishing.
            Authors, reviewers, and editors must adhere to the principles of
            honesty, transparency, and academic integrity.
          </p>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>No plagiarism or duplicate publication.</li>
            <li>Proper citation of all sources.</li>
            <li>Transparent peer review process.</li>
            <li>Disclosure of conflicts of interest.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
