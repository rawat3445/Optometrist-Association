"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Search,
  FileText,
  Download,
  Calendar,
  Users,
  Eye,
  ChevronRight,
  Award,
  TrendingUp,
  Bell,
  Filter,
  ExternalLink,
  User,
  Shield,
} from "lucide-react";

export default function Journal() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Info Bar */}
      <TopInfoBar />

      {/* Secondary Navigation */}
      <SecondaryNav />

      {/* Hero Section */}
      <HeroSection />

      {/* Current Issue */}
      <CurrentIssue />

      {/* Featured Articles */}
      <FeaturedArticles />

      {/* Author Guidelines */}
      <AuthorGuidelines />

      {/* Editorial Board Preview */}
      <EditorialBoard />

      {/* Archives */}
      <ArchivesSection />
    </div>
  );
}

// Top Info Bar (Like IJO)
function TopInfoBar() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Award size={16} />
            <span>ISSN: 2456-XXXX (Print) | 2456-XXXX (Online)</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Impact Factor: 2.5</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/login"
            className="flex items-center gap-1 hover:text-blue-200 transition border-l border-blue-700 pl-4"
          >
            <Shield size={16} />
            Admin Login
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 hover:text-blue-200 transition border-l border-blue-700 pl-4"
          >
            <Shield size={16} />
            author dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

// Secondary Navigation
function SecondaryNav() {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Current Issue", href: "#current" },
    { name: "Archives", href: "#archives" },
    { name: "Submit Article", href: "#submit", highlight: true },
    { name: "Author Guidelines", href: "#guidelines" },
    { name: "Editorial Board", href: "#board" },
    { name: "Peer Review", href: "#review" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-[72px] z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors relative group ${
                  item.highlight
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Search Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition">
            <Search size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-br from-blue-50 to-white py-12 border-b"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Eye size={16} />
            Peer-Reviewed Open Access Journal
          </div>

          <h1 className="text-xl md:text-5xl font-bold text-gray-900 mb-2">
            Offical Journal of Optometry Research
          </h1>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            Dristi Mitigya
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Official publication of the Optometrists Association of India.
            Publishing high-quality research in clinical and experimental
            optometry, vision science, and eye care.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/submit">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center gap-2">
                <FileText size={20} />
                Submit Your Article
              </button>
            </Link>
            <Link href="#current">
              <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition flex items-center gap-2">
                <BookOpen size={20} />
                Browse Current Issue
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Current Issue Section
function CurrentIssue() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const articles = [
    {
      slug: "myopia-control-orthokeratology",
      title:
        "Myopia Control Using Orthokeratology Lenses: A 5-Year Longitudinal Study",
      authors: "Dr. Rajesh Kumar, Dr. Priya Sharma, Dr. Ankit Verma",
      type: "Original Research",
      pages: "Pages 1-12",
      doi: "10.1234/jor.2025.001",
      abstract:
        "This study evaluates the long-term efficacy of orthokeratology lenses in controlling myopia progression over five years.",
    },
    {
      slug: "digital-eye-strain-post-pandemic",
      title:
        "Digital Eye Strain in the Post-Pandemic Era: Prevalence and Risk Factors",
      authors: "Dr. Meera Patel, Dr. Suresh Reddy",
      type: "Clinical Study",
      pages: "Pages 13-24",
      doi: "10.1234/jor.2025.002",
      abstract:
        "A cross-sectional study examining the prevalence of digital eye strain following increased screen exposure post-pandemic.",
    },
  ];

  return (
    <section id="current" ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Current Issue
              </h2>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  Volume 15, Issue 4 - December 2025
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition">
              <Download size={18} />
              Download Issue PDF
            </button>
          </div>

          {/* Cover Image and TOC */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Cover */}
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl p-8 shadow-lg">
              <div className="bg-white rounded-lg p-6 text-center">
                <BookOpen size={64} className="mx-auto text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Volume 15</h3>
                <p className="text-sm text-gray-600">Issue 4</p>
                <p className="text-sm text-gray-600">December 2025</p>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="md:col-span-3 space-y-4">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition group border border-gray-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {article.type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {article.pages}
                        </span>
                      </div>

                      <Link href={`/journal/${article.slug}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition cursor-pointer">
                          {article.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Users size={16} />
                        <p>{article.authors}</p>
                      </div>

                      <p className="text-xs text-gray-500 mb-3">
                        DOI: {article.doi}
                      </p>

                      <div className="flex items-center gap-3">
                        <button className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
                          <FileText size={16} />
                          Abstract
                        </button>
                        <button className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
                          <Download size={16} />
                          PDF
                        </button>
                        <button className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
                          <ExternalLink size={16} />
                          Full Text
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Featured Articles
function FeaturedArticles() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const featured = [
    {
      category: "Most Viewed",
      title: "Artificial Intelligence in Optometry: Current Applications",
      views: "2,453",
      icon: TrendingUp,
    },
    {
      category: "Most Cited",
      title: "COVID-19 and Ocular Health: A Systematic Review",
      citations: "145",
      icon: Award,
    },
    {
      category: "Editor's Choice",
      title: "Pediatric Vision Screening: Updated Guidelines 2025",
      featured: true,
      icon: Eye,
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Articles
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition group border-t-4 border-blue-600"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 group-hover:text-blue-600 transition">
                      {item.title}
                    </h3>
                    {item.views && (
                      <p className="text-sm text-gray-600">
                        {item.views} views
                      </p>
                    )}
                    {item.citations && (
                      <p className="text-sm text-gray-600">
                        {item.citations} citations
                      </p>
                    )}
                    <button className="mt-4 text-blue-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Read Article
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Author Guidelines Section
function AuthorGuidelines() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const guidelines = [
    {
      step: "1",
      title: "Manuscript Preparation",
      description:
        "Follow our detailed author guidelines for manuscript formatting, structure, and citation style.",
      icon: FileText,
    },
    {
      step: "2",
      title: "Online Submission",
      description:
        "Submit your manuscript through our online portal. Track your submission status at any time.",
      icon: Upload,
    },
    {
      step: "3",
      title: "Peer Review",
      description:
        "Double-blind peer review by expert reviewers. Average review time: 4-6 weeks.",
      icon: Users,
    },
    {
      step: "4",
      title: "Publication & Indexing",
      description:
        "Accepted articles are published online and in print. Open access option available.",
      icon: BookOpen,
    },
  ];

  return (
    <section id="guidelines" ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Author Guidelines
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Submit your research to our peer-reviewed journal and reach
              thousands of optometry professionals worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {guidelines.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <div className="mb-4">
                    <item.icon size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                {index < guidelines.length - 1 && (
                  <ChevronRight
                    className="hidden md:block absolute top-1/2 -right-3 text-blue-300"
                    size={24}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <Link href="/author-guidelines">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-xl hover:shadow-2xl">
                View Full Author Guidelines
              </button>
            </Link>

            <a
              href="/author-guidelines.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              <Download size={18} />
              Download Author Guidelines (PDF)
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Editorial Board Preview
function EditorialBoard() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const editors = [
    {
      name: "Dr. Gaurav Bhardwaj",
      role: "Editor-in-Chief",
      affiliation: "AIIMS, New Delhi",
      specialty: "Clinical Optometry",
    },
    {
      name: "Dr. Animesh Mondal",
      role: "Associate Editor",
      affiliation: "LV Prasad Eye Institute",
      specialty: "Pediatric Vision",
    },
    {
      name: "Dr. Sunil kumar dixit",
      role: "Managing Editor",
      affiliation: "Sankara Nethralaya",
      specialty: "Contact Lens Research",
    },
  ];

  return (
    <section id="board" ref={ref} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Editorial Board
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {editors.map((editor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-gray-900">
                  {editor.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm mb-2">
                  {editor.role}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  {editor.affiliation}
                </p>
                <p className="text-gray-500 text-xs">{editor.specialty}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="#board-full">
              <button className="text-blue-600 font-semibold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
                View Full Editorial Board
                <ChevronRight size={20} />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Archives Section
function ArchivesSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const years = [2025, 2024, 2023, 2022, 2021, 2020];

  return (
    <section id="archives" ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Journal Archives
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition">
              <Filter size={18} />
              Filter by Topic
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {years.map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition group cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{year}</h3>
                    <p className="text-sm text-gray-600">
                      4 Issues, 48 Articles
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Browse Issues
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Upload Icon Component (missing from lucide-react)
function Upload({ size, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
