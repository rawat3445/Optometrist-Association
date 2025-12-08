export default function Information() {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Optometry Information & Articles
        </h1>
        <p className="text-gray-600 text-center mt-3 max-w-2xl mx-auto">
          Students submit articles → Faculty reviews → Approved articles get
          published here.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                Understanding Visual Optics {item}
              </h3>
              <p className="text-gray-600 mt-2">
                Short summary of the student-submitted and faculty-approved
                article.
              </p>

              <button className="mt-4 text-blue-600 hover:underline font-medium">
                Read Article →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
