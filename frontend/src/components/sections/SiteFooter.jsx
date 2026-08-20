import { Twitter, Instagram, Dribbble } from "lucide-react";

// Small dark "app-icon" glyph shown before certain links (matches the reference)
const LinkGlyph = () => (
  <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-neutral-900">
    <span className="h-1.5 w-1.5 rounded-full bg-white" />
  </span>
);

// Status badges: New (red), Soon (light blue), New (light pink)
const Badge = ({ label, tone }) => {
  const tones = {
    red: "bg-[#f2555a] text-white",
    blue: "bg-sky-50 text-sky-500 border border-sky-200",
    pink: "bg-pink-50 text-pink-500 border border-pink-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-[3px] text-[10px] font-semibold leading-none ${tones[tone]}`}
    >
      {label}
    </span>
  );
};

const FooterLink = ({ children }) => (
  <a
    href="#"
    className="flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
  >
    {children}
  </a>
);

const SOCIALS = [
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Dribbble, label: "Dribbble" },
];

export const SiteFooter = () => {
  return (
    <footer
      data-testid="site-footer"
      className="w-full bg-[#f2f2f2] px-8 py-24 md:px-16"
    >
      <div className="mx-auto grid max-w-[1220px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        {/* Left column (spans 5) */}
        <div className="flex flex-col md:col-span-5">
          <div className="relative inline-block w-fit">
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900">
              Our platform, your art.
            </h2>
            {/* Floating UI icon (three dots) top-right */}
            <span className="absolute -right-9 -top-9 flex h-9 w-12 items-center justify-center gap-1.5 rounded-xl bg-white shadow-md shadow-neutral-200/60">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
            </span>
          </div>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-500">
            In the realm of Artnesia, creativity knows no bounds. This eternal
            marketplace celebrates the timeless nature of art.
          </p>

          {/* Social icons anchored to the bottom */}
          <div className="mt-auto flex items-center gap-3 pt-16">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-700 transition-colors hover:text-neutral-900"
              >
                <Icon size={16} />
              </a>
            ))}
            <a
              href="#"
              aria-label="Behance"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-neutral-700 transition-colors hover:text-neutral-900"
            >
              B&#275;
            </a>
          </div>
        </div>

        {/* Link Column 1 — Get Started (spans 2) */}
        <div className="flex flex-col space-y-4 md:col-span-2">
          <h3 className="text-sm font-semibold text-neutral-900">Get Started</h3>
          <FooterLink>
            <LinkGlyph />
            Create strategy
            <Badge label="New" tone="red" />
          </FooterLink>
          <FooterLink>Pricing</FooterLink>
          <FooterLink>Contact</FooterLink>
          <FooterLink>Solution</FooterLink>
          <FooterLink>E-Commerce</FooterLink>
        </div>

        {/* Link Column 2 — Your Story (spans 2) */}
        <div className="flex flex-col space-y-4 md:col-span-2">
          <h3 className="text-sm font-semibold text-neutral-900">Your Story</h3>
          <FooterLink>
            <LinkGlyph />
            Create Story
          </FooterLink>
          <FooterLink>
            Sell fast
            <Badge label="Soon" tone="blue" />
          </FooterLink>
        </div>

        {/* Link Column 3 — Privacy & Policy (spans 3) */}
        <div className="flex flex-col md:col-span-3">
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900">
              Privacy &amp; Policy
            </h3>
            <FooterLink>Contact Us</FooterLink>
            <FooterLink>
              Api
              <Badge label="New" tone="pink" />
            </FooterLink>
          </div>

          {/* Copyright anchored bottom-right, aligned with the social icons */}
          <p className="mt-auto pt-16 text-right text-sm text-neutral-500">
            &copy; 2024 . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
