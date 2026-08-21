import { motion } from "framer-motion";
import { User, Sun } from "lucide-react";

const NAV_ITEMS = [
  "Get Started",
  "Create strategy",
  "Pricing",
  "Contact",
  "Solution",
  "E-Commerce",
];

const BrandMark = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M4 20 L28 4 L18 20 Z" fill="#2fb39a" />
    <path d="M18 20 L28 4 L24 26 Z" fill="#0f766e" />
    <path d="M4 20 L18 20 L11 27 Z" fill="#7fd8c6" />
  </svg>
);

export const HeroNavigation = () => {
  return (
    <motion.nav
      data-testid="hero-nav"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative z-50 flex items-center justify-between px-5 sm:px-8 lg:px-12 pt-6 sm:pt-7"
    >
      <a
        href="#"
        data-testid="brand-logo"
        className="flex items-center gap-2.5 group"
      >
        <span className="transition-transform duration-500 group-hover:rotate-[-8deg]">
          <BrandMark />
        </span>
        <span className="font-display text-[17px] font-semibold tracking-tight text-neutral-900">
          unoneo
        </span>
      </a>

      <div className="hidden lg:flex items-center gap-7">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item}
            href="#"
            data-testid={`nav-link-${i}`}
            className="relative text-[13.5px] text-neutral-500 hover:text-neutral-900 transition-colors duration-300 flex items-center gap-1.5"
          >
            {i === 1 && (
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-neutral-900" />
            )}
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <button
          data-testid="nav-profile-btn"
          aria-label="Profile"
          className="w-9 h-9 rounded-full border border-neutral-200 bg-white/70 backdrop-blur flex items-center justify-center text-neutral-700 hover:border-neutral-300 hover:text-neutral-900 transition-all duration-300 hover:-translate-y-0.5"
        >
          <User size={15} strokeWidth={1.75} />
        </button>
        <button
          data-testid="nav-theme-btn"
          aria-label="Theme"
          className="w-9 h-9 rounded-full border border-neutral-200 bg-white/70 backdrop-blur flex items-center justify-center text-neutral-700 hover:border-neutral-300 hover:text-neutral-900 transition-all duration-300 hover:-translate-y-0.5"
        >
          <Sun size={15} strokeWidth={1.75} />
        </button>
      </div>
    </motion.nav>
  );
};
