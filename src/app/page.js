"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Eye,
  Award,
  Users,
  BookOpen,
  Calendar,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Microscope,
  Star,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Shield,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <main className="overflow-hidden">
      <HeroSection y1={y1} y2={y2} />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <MembershipBenefits />
      <TeamSection />
      <CTASection />
    </main>
  );
}

// Hero Section with Parallax Effect
function HeroSection({ y1, y2 }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
      />

      {/* Floating Eye Icons */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 text-white/10"
      >
        <Eye size={80} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/4 text-white/10"
      >
        <Eye size={100} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-white text-sm font-medium">
              <Star className="inline mr-2" size={16} />
              India&apos;s Leading Optometry Association
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Advancing Excellence in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">
              Eye Care
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Join a community of dedicated optometry professionals committed to
            research, education, and advancing the field of vision science.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition flex items-center gap-2"
              >
                Become a Member
                <ArrowRight
                  className="group-hover:translate-x-1 transition"
                  size={20}
                />
              </motion.button>
            </Link>

            <Link href="/journal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition"
              >
                Explore Journal
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-teal-300" />
              <span>500+ Active Members</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-teal-300" />
              <span>50+ Research Publications</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-teal-300" />
              <span>Nationally Recognized</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}

// Simple CountUp Component - FIXED
function CountUp({ end, duration, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = end / (duration * 60);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

// Animated Stats Section - FIXED
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    {
      icon: Users,
      value: 500,
      suffix: "+",
      label: "Active Members",
      color: "text-blue-600",
    },
    {
      icon: BookOpen,
      value: 50,
      suffix: "+",
      label: "Research Papers",
      color: "text-teal-600",
    },
    {
      icon: Award,
      value: 15,
      suffix: "+",
      label: "Years of Excellence",
      color: "text-purple-600",
    },
    {
      icon: Calendar,
      value: 100,
      suffix: "+",
      label: "Annual Events",
      color: "text-orange-600",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`${stat.color} mb-4 flex justify-center`}>
                <stat.icon size={48} />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-2"
              >
                {isInView && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                  />
                )}
              </motion.div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About Our Association
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are a dedicated community of optometry professionals committed
              to advancing the field of vision science through research,
              education, and professional development.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our association brings together students, practitioners, and
              researchers to collaborate, share knowledge, and push the
              boundaries of eye care excellence.
            </p>

            <div className="space-y-4">
              {[
                { icon: Shield, text: "Committed to Professional Excellence" },
                { icon: Heart, text: "Patient-Centered Approach" },
                { icon: TrendingUp, text: "Continuous Learning & Growth" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <item.icon size={24} />
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-teal-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Members_Pic.jpg"
                alt="Optometry Association Team Members"
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent pointer-events-none" />

              {/* Optional Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Our Team</h3>
                <p className="text-blue-100">
                  Dedicated professionals advancing eye care
                </p>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-17 -left-10 bg-white rounded-xl shadow-xl p-1  z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                  <Award size={32} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">15+</p>
                  <p className="text-gray-600">Years of Impact</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: BookOpen,
      title: "Academic Journal",
      description:
        "Publish your research in our peer-reviewed journal and contribute to the field of optometry.",
      color: "from-blue-500 to-blue-600",
      link: "/journal",
    },
    {
      icon: GraduationCap,
      title: "Research Mentorship",
      description:
        "Get personalized guidance from experienced researchers for your academic projects.",
      color: "from-purple-500 to-purple-600",
      link: "/services",
    },
    {
      icon: Users,
      title: "Professional Network",
      description:
        "Connect with optometrists, researchers, and students across the country.",
      color: "from-teal-500 to-teal-600",
      link: "/register",
    },
    {
      icon: Calendar,
      title: "Events & Workshops",
      description:
        "Attend conferences, webinars, and workshops to stay updated with latest trends.",
      color: "from-orange-500 to-orange-600",
      link: "/events",
    },
    {
      icon: Microscope,
      title: "Clinical Resources",
      description:
        "Access evidence-based guidelines, case studies, and clinical protocols.",
      color: "from-green-500 to-green-600",
      link: "/information",
    },
    {
      icon: Award,
      title: "Certifications",
      description:
        "Earn recognized certifications and continuing education credits.",
      color: "from-red-500 to-red-600",
      link: "/dashboard",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive resources and opportunities for professional growth in
            optometry
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <Link href={service.link}>
                <button className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Membership Benefits Section
function MembershipBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const benefits = [
    "Access to peer-reviewed journal publications",
    "Discounted rates for conferences and workshops",
    "Networking opportunities with industry leaders",
    "Research mentorship program enrollment",
    "Continuing education credits",
    "Career development resources",
    "Member-only webinars and online courses",
    "Professional liability insurance discounts",
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Membership Benefits
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join us and unlock exclusive opportunities for professional growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <CheckCircle
                className="text-teal-300 flex-shrink-0 mt-1"
                size={24}
              />
              <span className="text-lg">{benefit}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition"
            >
              Join Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Team Section with Your Photo
function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated professionals guiding the future of optometry
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Team Photo - Replace with your actual image */}
          <div className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-teal-100">
            {/* Placeholder - Put your team photo here */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Users size={120} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Together for Better Vision
              </h3>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                Our diverse team of optometrists, researchers, and educators
                working collaboratively to advance eye care standards across
                India.
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full blur-2xl opacity-30" />
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30" />
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Eye className="absolute top-10 left-10 w-32 h-32" />
        <Eye className="absolute bottom-10 right-10 w-40 h-40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            Become part of India&apos;s premier optometry association and
            advance your career today
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition"
              >
                Become a Member
              </motion.button>
            </Link>
            <Link href="/information">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition"
              >
                Learn More
              </motion.button>
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <span> optometrysociety@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <span>+91 1234567890</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
