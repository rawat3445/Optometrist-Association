"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import EditorialBoardCarousel from "@/components/EditorialBoardCarousel";
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
  TrendingUp,
  Shield,
  Heart,
  Activity,
  BellRing,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Newspaper,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const societyActivities = [
  {
    label: "Academic Update",
    title: "Monthly clinical discussion forum",
    date: "Every month",
    summary:
      "Case discussions, journal club notes, clinical pearls, and member-led learning sessions for the society community.",
  },
  {
    label: "Research Desk",
    title: "Article submission support",
    date: "Open now",
    summary:
      "Authors can prepare manuscripts, submit research, and follow journal guidelines from the website.",
  },
  {
    label: "Member Notice",
    title: "Membership verification and digital records",
    date: "In progress",
    summary:
      "New applications collect qualification, proposer, seconder, document and payment details for smoother review.",
  },
];

const blogPosts = [
  {
    tag: "Vision Science",
    title: "Digital eye strain and the modern clinic",
    excerpt:
      "Practical screening points, patient counseling ideas, and when to consider referral for complex digital visual fatigue.",
  },
  {
    tag: "Clinical Optometry",
    title: "What to document in a contact lens follow-up",
    excerpt:
      "A quick checklist for fit, comfort, corneal health, hygiene, replacement schedule, and patient education.",
  },
  {
    tag: "Research",
    title: "How to turn a case into a publishable report",
    excerpt:
      "Structure the case history, imaging, diagnosis, management, discussion, ethics and learning points clearly.",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    color: "#1877F2",
    Icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    color: "#E1306C",
    Icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    color: "#0A66C2",
    Icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    color: "#FF0000",
    Icon: Youtube,
  },
  {
    name: "X / Twitter",
    href: "https://twitter.com/",
    color: "#14171A",
    Icon: Twitter,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/911234567890",
    color: "#25D366",
    Icon: MessageCircle,
  },
];

function StickySocialBar() {
  const [hovered, setHovered] = useState(null);

  return (
    <nav
      className="sticky-social-bar hidden lg:flex"
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
        flexDirection: "column",
      }}
      aria-label="Social media links"
    >
      {socialLinks.map((link, index) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          style={{
            backgroundColor: link.color,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            height: "44px",
            textDecoration: "none",
            borderRadius:
              index === 0
                ? "8px 0 0 0"
                : index === socialLinks.length - 1
                  ? "0 0 0 8px"
                  : "0",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              maxWidth: hovered === index ? "120px" : "0px",
              paddingLeft: hovered === index ? "16px" : "0px",
              overflow: "hidden",
              transition: "max-width 0.3s ease, padding-left 0.3s ease",
            }}
          >
            {link.name}
          </span>
          <span
            style={{
              width: "44px",
              minWidth: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <link.Icon size={20} />
          </span>
        </a>
      ))}
    </nav>
  );
}

export default function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <main className="overflow-hidden">
      <StickySocialBar />
      <HeroSection y1={y1} y2={y2} />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <EditorialBoardCarousel />
      <SocietyActivitySection />
      <BlogNewsletterSection />
      <MembershipBenefits />
      <TeamSection />
      <CTASection />
    </main>
  );
}

function HeroSection({ y1, y2 }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute left-0 top-20 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl sm:left-10 sm:h-72 sm:w-72"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-0 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl sm:right-10 sm:h-96 sm:w-96"
      />

      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-6 top-1/4 text-white/10 sm:left-1/4"
      >
        <Eye size={80} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-6 text-white/10 sm:right-1/4"
      >
        <Eye size={100} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-5 sm:mb-6"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-xs font-medium sm:px-6 sm:text-sm">
              <Star className="inline mr-2" size={16} />
              India&apos;s Leading Optometry Association
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl mb-6"
          >
            Advancing Excellence in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">
              Eye Care
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-blue-100 sm:text-xl md:text-2xl"
          >
            Join a community of dedicated optometry professionals committed to
            research, education, and advancing the field of vision science.
          </motion.p>

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
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-blue-900 shadow-xl transition hover:shadow-2xl sm:px-8 sm:py-4 sm:text-lg"
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
                className="rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:px-8 sm:py-4 sm:text-lg"
              >
                Explore Journal
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-white/80 sm:mt-16 sm:gap-8"
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
    <section ref={ref} className="bg-gray-50 py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
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
                className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl"
              >
                {isInView && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                  />
                )}
              </motion.div>
              <p className="text-sm font-medium text-gray-600 sm:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
              About Our Association
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              We are a dedicated community of optometry professionals committed
              to advancing the field of vision science through research,
              education, and professional development.
            </p>
            <p className="mb-8 text-base leading-relaxed text-gray-600 sm:text-lg">
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
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 sm:h-12 sm:w-12">
                    <item.icon size={24} />
                  </div>
                  <span className="text-base font-medium text-gray-700 sm:text-lg">
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
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Members_Pic.jpg"
                alt="Optometry Association Team Members"
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-stretch">
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg">
                <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
                  Our Team
                </h3>
                <p className="text-sm leading-6 text-gray-600 sm:text-base">
                  Dedicated professionals advancing eye care
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="rounded-2xl bg-white p-5 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 sm:h-16 sm:w-16">
                    <Award size={32} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold leading-none text-gray-800">
                      15+
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-600 sm:text-base">
                      Years of Impact
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
    <section ref={ref} className="bg-gray-50 py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center sm:mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            What We Offer
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
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
              className="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl sm:p-8"
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
                  Learn More <ArrowRight size={18} />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocietyActivitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="society-activity" ref={ref} className="bg-white py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
              <Activity size={18} />
              Society Activity
            </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              What is happening in our society
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
              A live-style activity column for announcements, academic updates,
              research support, member notices and upcoming society work.
            </p>
          </div>
          <Link href="/information">
            <button className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-6 py-3 font-semibold text-teal-700 transition hover:bg-teal-50">
              View Information <ArrowRight size={18} />
            </button>
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {societyActivities.map((activity, index) => (
            <motion.article
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative overflow-hidden rounded-[1.5rem] border border-gray-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl sm:rounded-[2rem] sm:p-6"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-teal-100/70" />
              <span className="relative inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                {activity.label}
              </span>
              <h3 className="relative mt-5 text-2xl font-bold text-gray-900">
                {activity.title}
              </h3>
              <p className="relative mt-2 text-sm font-semibold text-teal-700">
                {activity.date}
              </p>
              <p className="relative mt-4 leading-7 text-gray-600">
                {activity.summary}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogNewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    setMessage(
      email
        ? "Thank you. Newsletter subscription collection is ready for backend hookup."
        : "Please enter your email to subscribe.",
    );
  };

  return (
    <section
      id="blog-newsletter"
      ref={ref}
      className="bg-gradient-to-br from-slate-950 via-blue-950 to-teal-900 py-14 text-white sm:py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center sm:mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-teal-200">
            <Newspaper size={18} />
            Blog & Newsletter
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Knowledge updates for members
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
            Inspired by journal and vision-science portals, this block gives the
            website a place for clinical blogs, research notes and society
            newsletters.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur transition hover:bg-white/15 sm:rounded-[2rem] sm:p-6"
              >
                <span className="rounded-full bg-teal-300/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
                  {post.tag}
                </span>
                <h3 className="mt-4 text-xl font-bold sm:text-2xl">{post.title}</h3>
                <p className="mt-3 leading-7 text-blue-100">{post.excerpt}</p>
                <button className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-200">
                  Read preview <ExternalLink size={16} />
                </button>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-[1.75rem] border border-white/10 bg-white p-6 text-slate-900 shadow-2xl sm:rounded-[2.5rem] md:p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <BellRing size={26} />
            </div>
            <h3 className="mt-6 text-2xl font-black sm:text-3xl">
              Subscribe to society updates
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Members can receive journal alerts, event notices, clinical
              learning summaries, newsletter releases and website updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white transition hover:bg-blue-700"
              >
                Subscribe <Send size={18} />
              </button>
            </form>
            {message && (
              <p className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
                {message}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
      className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 py-14 text-white sm:py-20"
    >
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
          className="mb-10 text-center sm:mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Membership Benefits
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-blue-100 sm:text-xl">
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
              className="flex items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm sm:p-6"
            >
              <CheckCircle
                className="text-teal-300 flex-shrink-0 mt-1"
                size={24}
              />
              <span className="text-base sm:text-lg">{benefit}</span>
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
              className="rounded-full bg-white px-8 py-4 text-base font-bold text-blue-900 shadow-xl transition hover:shadow-2xl sm:px-10 sm:text-lg"
            >
              Join Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-white py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center sm:mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Our Leadership Team
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
            Dedicated professionals guiding the future of optometry
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-teal-100 shadow-2xl sm:h-96 md:h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Users size={120} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8 md:p-12">
              <h3 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
                Together for Better Vision
              </h3>
              <p className="max-w-2xl text-base text-gray-200 sm:text-lg md:text-xl">
                Our diverse team of optometrists, researchers, and educators
                working collaboratively to advance eye care standards across
                India.
              </p>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full blur-2xl opacity-30" />
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30" />
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 py-14 text-white sm:py-20">
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
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-6xl">
            Ready to Join Us?
          </h2>
          <p className="mb-10 text-lg text-blue-100 sm:text-xl md:text-2xl">
            Become part of India&apos;s premier optometry association and
            advance your career today
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-2xl transition hover:shadow-3xl sm:px-10 sm:py-5 sm:text-lg"
              >
                Become a Member
              </motion.button>
            </Link>
            <Link href="/information">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border-2 border-white px-8 py-4 text-base font-bold text-white transition hover:bg-white hover:text-blue-600 sm:px-10 sm:py-5 sm:text-lg"
              >
                Learn More
              </motion.button>
            </Link>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 break-all text-blue-100 sm:flex-row sm:gap-8 sm:break-normal">
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <span>optometrysociety@gmail.com</span>
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
