export default function IndexedDatabases() {
  const indexes = [
    "Google Scholar",
    "ResearchGate",
    "CrossRef",
    "Directory of Open Access Journals (DOAJ)",
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Indexed Databases
        </h1>

        <p className="text-center text-gray-600 mt-4">
          The journal aims to be indexed in internationally recognized academic
          databases.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {indexes.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow border text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
