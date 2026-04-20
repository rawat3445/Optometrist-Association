import Image from "next/image";

const editorInChief = {
  name: "Dr. Gaurav Bhardwaj",
  designation: "Editor-in-Chief",
  specialization: "Clinical Optometry & Vision Science",
  institution: "Global Institute of Paramedical Sciences",
  image: "/board/anil-sharma.jpg",
};

const associateEditors = [
  {
    name: "Dr. Priya Mehta",
    designation: "Associate Editor",
    specialization: "Contact Lens & Ocular Surface",
    institution: "Delhi Optometry Institute",
    image: "/board/priya-mehta.jpg",
  },
  {
    name: "Dr. Rahul Verma",
    designation: "Associate Editor",
    specialization: "Pediatric Optometry",
    institution: "AIIMS Eye Centre",
    image: "/board/rahul-verma.jpg",
  },
];

const boardMembers = [
  {
    name: "Dr. Kavita Singh",
    designation: "Editorial Board Member",
    specialization: "Low Vision Rehabilitation",
    institution: "Mumbai Vision Research Center",
    image: "/board/kavita-singh.jpg",
  },
  {
    name: "Dr. Amit Gupta",
    designation: "Editorial Board Member",
    specialization: "Binocular Vision",
    institution: "Punjab Optometry College",
    image: "/board/amit-gupta.jpg",
  },
  {
    name: "Dr. Neha Kapoor",
    designation: "Editorial Board Member",
    specialization: "Ocular Disease",
    institution: "Chandigarh Eye Institute",
    image: "/board/neha-kapoor.jpg",
  },
  {
    name: "Dr. Vikram Patel",
    designation: "Editorial Board Member",
    specialization: "Vision Therapy",
    institution: "Ahmedabad Optometry Centre",
    image: "/board/vikram-patel.jpg",
  },
];

export default function EditorialBoard() {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* PAGE TITLE */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">Editorial Board</h1>
          <p className="text-gray-600 mt-4">
            Our editorial board consists of experienced researchers,
            academicians, and clinicians in the field of optometry and vision
            science. The board ensures the quality, integrity, and academic
            excellence of all published articles.
          </p>
        </div>

        {/* EDITOR IN CHIEF */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Editor-in-Chief
          </h2>

          <div className="bg-white shadow-lg rounded-xl p-8 max-w-md mx-auto">
            <Image
              src={editorInChief.image}
              alt={editorInChief.name}
              width={140}
              height={140}
              className="rounded-full mx-auto object-cover"
            />

            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {editorInChief.name}
            </h3>

            <p className="text-blue-600 font-medium">
              {editorInChief.designation}
            </p>

            <p className="text-gray-600 mt-2">{editorInChief.specialization}</p>

            <p className="text-gray-500 text-sm mt-1">
              {editorInChief.institution}
            </p>
          </div>
        </div>

        {/* ASSOCIATE EDITORS */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800">
            Associate Editors
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {associateEditors.map((editor, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition"
              >
                <Image
                  src={editor.image}
                  alt={editor.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto object-cover"
                />

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {editor.name}
                </h3>

                <p className="text-blue-600 font-medium">
                  {editor.designation}
                </p>

                <p className="text-gray-600 mt-2">{editor.specialization}</p>

                <p className="text-gray-500 text-sm mt-1">
                  {editor.institution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EDITORIAL BOARD MEMBERS */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800">
            Editorial Board Members
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={110}
                  height={110}
                  className="rounded-full mx-auto object-cover"
                />

                <h3 className="mt-3 font-semibold text-gray-900">
                  {member.name}
                </h3>

                <p className="text-blue-600 text-sm font-medium">
                  {member.designation}
                </p>

                <p className="text-gray-600 text-sm mt-2">
                  {member.specialization}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  {member.institution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
