export default  function Information() {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Journal of Optometry & Vision Science
        </h1>

        <p className="text-gray-600 text-center mt-4 max-w-3xl mx-auto">
          The Journal of Optometry & Vision Science is an academic platform
          dedicated to publishing high-quality research, review articles, and
          clinical studies related to optometry, vision care, and ocular
          science. The journal provides a space for students, researchers, and
          professionals to share knowledge and advancements in the field.
        </p>

        {/* About Section */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            About the Journal
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This journal aims to promote scientific research and academic
            discussion in the field of optometry. It encourages students and
            professionals to publish innovative research, clinical findings, and
            evidence-based studies that contribute to the advancement of eye
            care and vision science.
          </p>
        </div>

        {/* Aim & Scope */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Aim & Scope
          </h2>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>Clinical optometry and vision science</li>
            <li>Ocular diseases and diagnosis</li>
            <li>Contact lenses and vision correction</li>
            <li>Public health optometry</li>
            <li>Advancements in ophthalmic technology</li>
            <li>Eye care education and research</li>
          </ul>
        </div>

        {/* Article Types */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Types of Articles Accepted
          </h2>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li>Original Research Articles</li>
            <li>Review Articles</li>
            <li>Case Reports</li>
            <li>Clinical Studies</li>
            <li>Short Communications</li>
          </ul>
        </div>

        {/* Editorial Process */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Editorial & Review Process
          </h2>

          <p className="text-gray-600 leading-relaxed">
            All submitted manuscripts undergo an editorial screening followed by
            a peer-review process. Articles are evaluated by subject experts to
            ensure quality, originality, and academic integrity before
            publication.
          </p>

          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-100 p-4 rounded-lg">Submission</div>
            <div className="bg-gray-100 p-4 rounded-lg">Editorial Review</div>
            <div className="bg-gray-100 p-4 rounded-lg">Peer Review</div>
            <div className="bg-gray-100 p-4 rounded-lg">Revision</div>
            <div className="bg-gray-100 p-4 rounded-lg">Acceptance</div>
            <div className="bg-gray-100 p-4 rounded-lg">Publication</div>
          </div>
        </div>

        {/* Ethics */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Publication Ethics
          </h2>

          <p className="text-gray-600 leading-relaxed">
            The journal follows strict ethical guidelines for academic
            publishing. Plagiarism, duplicate submission, and unethical research
            practices are strictly prohibited. Authors must ensure that all
            submissions are original and properly referenced.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Contact Information
          </h2>

          <p className="text-gray-600">
            For queries related to submissions, editorial policies, or
            publication guidelines, please contact the editorial office.
          </p>

          <p className="text-gray-600 mt-3">Email: editorial@gipsjournal.com</p>
        </div>
      </div>
    </section>
  );
}
