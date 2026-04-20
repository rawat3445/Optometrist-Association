"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Information", href: "/information" },
    { name: "Journal", href: "/journal" },
    { name: "Activity", href: "/#society-activity" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "Blog", href: "/blog" },
    { name: "Membership", href: "/register" },
  ];

  const informationLinks = [
    { name: "Aim & Scope", href: "/aim-and-scope" },
    { name: "Editorial Board", href: "/editorial-board" },
    { name: "Author Guidelines", href: "/author-guidelines" },
    { name: "Submission Policy", href: "/submission-policy" },
    { name: "Publication Ethics", href: "/publication-ethics" },
    { name: "Indexed Databases", href: "/indexed-databases" },
  ];

  const isInformationActive = informationLinks.some((link) => path === link.href);

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200/50 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-teal-50/50 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex justify-between items-center">
          {/* Logo - unchanged */}
          <Link href="/" className="flex min-w-0 items-center gap-3 group relative sm:gap-4">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300 shadow-lg group-hover:shadow-xl sm:h-16 sm:w-16">
              <Image
                src="/opto_LOGO.jpg"
                alt="Optometrists Association Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="max-w-[170px] truncate text-base font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-teal-600 transition-all duration-300 sm:max-w-none sm:text-xl">
                Optometrists Society
              </div>
              <div className="hidden text-xs text-gray-500 font-medium sm:block">
                Excellence in Eye Care
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {links.map((link, index) =>
              link.name === "Information" ? (
                <div
                  key={link.href}
                  className="relative group px-2 py-2 lg:px-4"
                  onMouseEnter={() => setInfoOpen(true)}
                  onMouseLeave={() => setInfoOpen(false)}
                >
                  {/* Parent glow unchanged */}
                  <div
                    className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      infoOpen
                        ? "bg-gradient-to-r from-blue-50/95 to-teal-50/95 shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-2 ring-blue-200/50"
                        : "bg-transparent opacity-0"
                    }`}
                  />

                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r from-teal-400/30 via-blue-400/30 to-teal-400/30 blur-xl transition-all duration-500 ${
                      infoOpen
                        ? "opacity-100 shadow-[0_0_30px_rgba(45,212,191,0.4)]"
                        : "opacity-0"
                    }`}
                  />

                  <span className="relative text-base font-semibold text-gray-700 group-hover:text-blue-600 cursor-pointer">
                    Information ▾
                  </span>

                  <span
                    className={`absolute left-0 -bottom-1 h-1.5 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 rounded-full transition-all duration-500 ease-out ${
                      infoOpen
                        ? "w-full shadow-[0_0_15px_rgba(45,212,191,0.7),0_0_25px_rgba(59,130,246,0.5)]"
                        : "w-0"
                    }`}
                  />

                  {/* SIMPLIFIED GLOWING BORDER DROPDOWN */}
                  {/* Replace ONLY the dropdown div with this SIMPLE version: */}

                  <div
                    className={`absolute left-0 z-5 top-12 w-64 py-2 bg-white shadow-xl rounded-2xl border-4 border-teal-400/70 ${
                      infoOpen
                        ? "opacity-100 translate-y-0 visible shadow-[0_0_20px_rgba(45,212,191,0.6)]"
                        : "opacity-0 -translate-y-2 invisible border-transparent shadow-lg"
                    }`}
                  >
                    {informationLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-5 py-3 hover:bg-blue-50/50 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group px-2 py-2 lg:px-4"
                >
                  <div className="absolute inset-0 rounded-lg bg-transparent group-hover:bg-gradient-to-r group-hover:from-blue-50/90 group-hover:to-teal-50/90 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-400/20 via-blue-400/20 to-teal-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <span
                    className={`relative text-base font-semibold transition-all duration-300 ${
                      path === link.href
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"
                        : "text-gray-700 group-hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-1.5 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 rounded-full group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(45,212,191,0.6)] group-hover:shadow-[0_0_20px_rgba(45,212,191,0.8)]"></span>
                </Link>
              ),
            )}

            <Link href="/register">
              <button className="ml-2 relative group overflow-hidden px-4 py-2.5 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 lg:ml-4 lg:px-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 group-hover:from-blue-700 group-hover:to-teal-700 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Join Now{" "}
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </button>
            </Link>
          </div>

          <button
            onClick={() => {
              setIsOpen((current) => !current);
              if (isOpen) setMobileInfoOpen(false);
            }}
            className="md:hidden relative p-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 transition-all duration-300 shadow-md"
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - unchanged */}
        {isOpen && (
          <div className="md:hidden mt-5 max-h-[calc(100vh-92px)] space-y-2 overflow-y-auto pb-6 animate-slideDown">
            {links.map((link, index) =>
              link.name === "Information" ? (
                <div key={link.href} style={{ animationDelay: `${index * 50}ms` }}>
                  <button
                    type="button"
                    onClick={() => setMobileInfoOpen((current) => !current)}
                    className={`flex w-full items-center justify-between rounded-xl px-6 py-3 text-left font-semibold transition-all duration-300 ${
                      path === link.href || isInformationActive
                        ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg"
                        : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-blue-50 hover:to-teal-50 hover:text-blue-600 hover:shadow-md"
                    }`}
                    aria-expanded={mobileInfoOpen}
                  >
                    <span>Information</span>
                    <span
                      className={`transition-transform duration-300 ${
                        mobileInfoOpen ? "rotate-180" : ""
                      }`}
                    >
                      v
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      mobileInfoOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-4 mt-2 space-y-2 rounded-2xl border border-blue-100 bg-white/90 p-2 shadow-inner">
                        <Link
                          href="/information"
                          onClick={() => {
                            setIsOpen(false);
                            setMobileInfoOpen(false);
                          }}
                          className={`block rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                            path === "/information"
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          }`}
                        >
                          Information Overview
                        </Link>
                        {informationLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setIsOpen(false);
                              setMobileInfoOpen(false);
                            }}
                            className={`block rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                              path === item.href
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    path === link.href
                      ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg transform scale-105"
                      : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-blue-50 hover:to-teal-50 hover:text-blue-600 hover:shadow-md"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{link.name}</span>
                  {path === link.href && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full"></span>
                  )}
                </Link>
              ),
            )}
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-4 relative group overflow-hidden px-6 py-3.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Join Now{" "}
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
    </nav>
  );
}
