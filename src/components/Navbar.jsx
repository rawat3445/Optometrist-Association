"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Information", href: "/information" },
    { name: "Journal", href: "/journal" },
    { name: "Membership", href: "/register" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200/50 shadow-lg">
      {/* Gradient Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-teal-50/50 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          {/* Logo Section with Beautiful Background */}
          <Link href="/" className="flex items-center gap-4 group relative">
            {/* Animated Background Circle */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            {/* Your Logo with Border */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <Image
                src="/opto_LOGO.jpg"
                alt="Optometrist Association Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>

            {/* Text beside logo with gradient on hover */}
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-teal-600 transition-all duration-300">
                Optometrist Association
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Excellence in Eye Care
              </div>
            </div>
          </Link>

          {/* Desktop Navigation with Beautiful Effects */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link, index) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="relative group px-4 py-2"
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span
                  className={`relative text-base font-semibold transition-all duration-300 ${
                    path === link.href
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"
                      : "text-gray-700 group-hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </span>

                {/* Active State - Gradient Bottom Line */}
                {path === link.href && (
                  <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full shadow-lg"></span>
                )}

                {/* Hover State - Animated Bottom Line (Myntra Style) */}
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full group-hover:w-full transition-all duration-500 ease-out shadow-lg"></span>
              </Link>
            ))}

            {/* CTA Button with Gradient */}
            <Link href="/register">
              <button className="ml-4 relative group overflow-hidden px-6 py-2.5 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 group-hover:from-blue-700 group-hover:to-teal-700 transition-all duration-300"></div>
                
                {/* Animated Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span className="relative z-10 flex items-center gap-2">
                  Join Now
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button with Beautiful Background */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 transition-all duration-300 shadow-md"
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation with Beautiful Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-6 space-y-2 animate-slideDown">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  path === link.href
                    ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg transform scale-105"
                    : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-blue-50 hover:to-teal-50 hover:text-blue-600 hover:shadow-md"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Active indicator */}
                {path === link.href && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full"></span>
                )}
              </Link>
            ))}

            {/* Mobile CTA Button */}
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-4 relative group overflow-hidden px-6 py-3.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Join Now
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
    </nav>
  );
}
