"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";

const editorialBoardMembers = [
  {
    name: "Dr. Gaurav Bhardwaj",
    role: "Editor-in-Chief",
    specialty: "Clinical Optometry",
    image: "/Gaurav_Bhardwaj.jpeg",
    position: "center",
  },
  {
    name: "Dr. Animesh Mondal",
    role: "Associate Editor",
    specialty: "Pediatric Vision",
    image: "/Principal_Sir.jpg",
    position: "35% center",
  },
  {
    name: "Dr. Anantha Krishnan",
    role: "Assistnat Professor",
    specialty: "Contact Lens Research",
    image: "/Dr. Anantha_Krishna.jpeg",
    position: "65% center",
  },
  {
    name: "Shruti Dagar",
    role: "Assistant Professor-I",
    specialty: "Research and Peer Review",
    image: "/Shruti_dagar.jpeg",
    position: "center top",
  },
];

export default function EditorialBoardCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const carouselItems = [...editorialBoardMembers, ...editorialBoardMembers];

  return (
    <section
      id="editorial-board-members"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-teal-900 py-20 text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-blue-400 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-teal-300 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-teal-200 backdrop-blur">
            <Award size={18} />
            Editorial Leadership
          </div>
          <h2 className="text-4xl font-black md:text-5xl">
            Editorial Board Member
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-blue-100">
            Meet the editorial leadership guiding peer review, academic quality,
            clinical relevance, and publication standards for the society.
          </p>
        </motion.div>

        <div className="editorial-carousel-mask">
          <div className="editorial-carousel-track">
            {carouselItems.map((member, index) => (
              <article
                key={`${member.name}-${index}`}
                className="editorial-card group"
              >
                <div className="relative h-[260px] overflow-hidden rounded-[2.25rem] bg-slate-800 sm:h-[300px] md:h-[340px]">
                  <Image
                    src={member.image}
                    alt={`${member.name} editorial board member`}
                    fill
                    sizes="(max-width: 768px) 72vw, 260px"
                    className="object-cover transition duration-700 group-hover:scale-110"
                    style={{ objectPosition: member.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                </div>
                <div className="px-2 pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-200">
                    {member.role}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    {member.specialty}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .editorial-carousel-mask {
          overflow: hidden;
          padding: 0.5rem 0 1.5rem;
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent,
            #000 10%,
            #000 90%,
            transparent
          );
          mask-image: linear-gradient(
            90deg,
            transparent,
            #000 10%,
            #000 90%,
            transparent
          );
        }

        .editorial-carousel-track {
          display: flex;
          width: max-content;
          gap: 1rem;
          animation: editorialSlide 28s linear infinite;
        }

        .editorial-carousel-mask:hover .editorial-carousel-track {
          animation-play-state: paused;
        }

        .editorial-card {
          width: min(76vw, 320px);
          flex: 0 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 2.75rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.75rem;
          box-shadow: 0 30px 80px -45px rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(18px);
        }

        @keyframes editorialSlide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .editorial-carousel-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
