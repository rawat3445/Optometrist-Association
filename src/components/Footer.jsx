export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-lg font-semibold">
          © {new Date().getFullYear()} Optometrist Association. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
